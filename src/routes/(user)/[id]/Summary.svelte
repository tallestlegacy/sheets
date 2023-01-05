<script lang="ts">
	import {
		userConsumptionData,
		userPaymentsData,
		startDateFilter,
		endDateFilter
	} from '$lib/store';
	import { DropdownDivider } from 'flowbite-svelte';
	import { labelClass } from 'flowbite-svelte/forms/Radio.svelte';
	import Chart from 'svelte-frappe-charts';
	import { getExcelDateFromJs } from 'excel-date-to-js';
	import dayjs from 'dayjs';

	let total = 0;

	let data: any = {};
	let statuses: any = {};
	let recognized: any = {};
	let productCount: any = {};
	$: downpayment = $userPaymentsData[0]['Downpayment Amount (UGX)'] ?? 0;

	$: xlsxStartDate = getExcelDateFromJs(dayjs($startDateFilter, 'YYYY-MM-DD').toDate()) + 1;
	$: xlsxEndDate = getExcelDateFromJs(dayjs($endDateFilter, 'YYYY-MM-DD').toDate()) + 1;

	$: filteredConsumptionData = $userConsumptionData.filter((_data) => {
		return (
			_data['Trn_Date'] >= Math.round(xlsxStartDate) && _data['Trn_Date'] <= Math.round(xlsxEndDate)
		);
	});

	const updateData = (value: any[]) => {
		data = {};
		statuses = {};
		recognized = {};
		productCount = {};
		total = 0;

		value.forEach((record) => {
			total += record['Price_Per_Product_UGX'];

			if (!data[record['Product Name']]) {
				data[record['Product Name']] = 0;
			}
			data[record['Product Name']] += record['Price_Per_Product_UGX'];

			if (!productCount[record['Product Name']]) {
				productCount[record['Product Name']] = 0;
			}
			productCount[record['Product Name']] += 1;

			if (!statuses[record['Approval Status Name']]) {
				statuses[record['Approval Status Name']] = 0;
			}
			statuses[record['Approval Status Name']] += record['Price_Per_Product_UGX'];

			if (!recognized[record['Recognized']]) {
				recognized[record['Recognized']] = 0;
			}
			recognized[record['Recognized']] += 1; //record['Price_Per_Product_UGX'];
		});
	};

	$: updateData(filteredConsumptionData);

	$: chartData1 = {
		labels: Object.keys(data),
		datasets: [
			{
				name: 'Order list summary',
				values: Object.values(data)
			}
		]
	};
	$: chartData2 = {
		labels: Object.keys(statuses),
		datasets: [
			{
				name: 'Order list summary',
				values: Object.values(statuses)
			}
		]
	};
	$: chartData3 = {
		labels: Object.keys(recognized),
		datasets: [
			{
				name: 'Order list summary',
				values: Object.values(recognized)
			}
		]
	};
	$: chartData4 = {
		labels: Object.keys(productCount),
		datasets: [
			{
				name: 'Order list summary',
				values: Object.values(productCount)
			}
		]
	};

	const formatDate = (_date: string) => {
		return dayjs(_date, 'YYYY-MM-DD').add(1, 'day').format('dddd DD MMM YYYY');
	};
</script>

<div class="grid gap-2 py-8 px-4">

	<h1 class="text-2xl font-bold">{$userPaymentsData[0]['Facility Name']}</h1>

	<div class="p-4 shadow-sm bg-white flex flex-wrap gap-2 rounded-sm">
		<p class="record">
			<span class="key"> Downpayment : </span>
			<span class="value"> UGX {downpayment.toLocaleString()}</span>
		</p>
		<div class="divider">_</div>
		<p class="record">
			<span class="key"> Total consumption expenditure : </span>
			<span class="value"> UGX {total.toLocaleString()} </span>
		</p>

		{#each chartData2.labels as status, index}
			<p class="record">
				<span class="key"> {status} claims : </span>
				UGX {chartData2.datasets[0].values[index].toLocaleString()}
			</p>
		{/each}
		<div class="divider"></div>
		<p class="record">
			<span class="key"> Balance : </span>
			<span class="value">
				UGX {(downpayment - total).toLocaleString()}
			</span>
		</p>
	</div>
	<div class="p-4 shadow-sm bg-white flex flex-wrap gap-2 rounded-sm">
		<p class="record">
			<span class="key"> Total consumption : </span>
			<span class="value">
				{$userConsumptionData.length} orders
			</span>
		</p>
		{#each chartData3.labels as status, index}
			<p class="record">
				{#if status == 'reviewing'}
					<span class="key"> Claims under review : </span>
					{chartData3.datasets[0].values[index]}
				{:else if status == 'yes'}
					<span class="key"> Accepted claims : </span>
					{chartData3.datasets[0].values[index]}
				{/if}
				orders
			</p>
		{/each}
	</div>

	<!-- 	<div class="p-4 shadow-sm bg-white w-full flex flex-wrap gap-2">
		<p class="record text-slate-400">
			<span class="key "> Date : </span>

			<span class="text-sm">
				{#if $startDateFilter == $endDateFilter}
					<span class="rounded  px-2 py-1">
						{formatDate($endDateFilter)}
					</span>
				{:else}
					<span class="rounded  px-2 py-1">
						{formatDate($startDateFilter)}
					</span>
					to
					<span class="rounded  px-2 py-1">
						{formatDate($endDateFilter)}
					</span>
				{/if}
			</span>
		</p>
	</div> -->

	<div class="w-full overflow-auto">
		<div class="p-4 shadow-sm bg-white max-w-[800px] flex-1  flex flex-col gap-2 h-50 rounded-sm">
			<span class="key">Order List (By Value)</span>
			<Chart type="bar" data={chartData1} />
		</div>
	</div>

	<div class="w-full overflow-auto">
		<div class="p-4 shadow-sm bg-white max-w-[800px] flex-1  flex flex-col gap-2 h-50 rounded-sm">
			<span class="key">Order List (By Count)</span>
			<Chart type="bar" data={chartData4} />
		</div>
	</div>

	<div class="gap-2 template">
		<div class="p-4 shadow-sm bg-white h-50 rounded-sm">
			<span class="key">Order Approval Status</span>
			<Chart type="pie" data={chartData2} />
		</div>

		<div class="p-4 shadow-sm bg-white h-50 rounded-sm">
			<span class="key">Audited Transaction Summary</span>
			<Chart type="bar" data={chartData3} />
		</div>
	</div>
</div>

<style>
	.divider {
		height: 1px;
		background-color: gray;
		opacity: .2;
		width: 100%;
	}
	.key {
		font-weight: 600;
	}

	.value {
		text-align: right;
	}
	.record {
		font-size: 0.75rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 2rem;
	}

	.cell {
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
		gap: 2rem;
	}

	.template {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
