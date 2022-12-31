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

	let statuses: any = {};
	let recognized: any = {};
	$: downpayment = $userPaymentsData[0]['Downpayment Amount (UGX)'] ?? 0;

	$: xlsxStartDate = getExcelDateFromJs(dayjs($startDateFilter, 'YYYY-MM-DD').toDate()) + 1;
	$: xlsxEndDate = getExcelDateFromJs(dayjs($endDateFilter, 'YYYY-MM-DD').toDate()) + 1;

	$: filteredConsumptionData = $userConsumptionData.filter((_data) => {
		return (
			_data['Trn_Date'] >= Math.round(xlsxStartDate) && _data['Trn_Date'] <= Math.round(xlsxEndDate)
		);
	});

	let data: any = {};

	const updateData = (value: any[]) => {
		console.log(value);
		let _data: any = {};
		value.forEach((record) => {
			total += record['Price_Per_Product_UGX'];

			if (!_data[record['Product Name']]) {
				_data[record['Product Name']] = 0;
			}
			_data[record['Product Name']] += record['Price_Per_Product_UGX'];

			if (!statuses[record['Approval Status Name']]) {
				statuses[record['Approval Status Name']] = 0;
			}
			statuses[record['Approval Status Name']] += record['Price_Per_Product_UGX'];

			if (!recognized[record['Recognized']]) {
				recognized[record['Recognized']] = 0;
			}
			recognized[record['Recognized']] += 1; //record['Price_Per_Product_UGX'];
		});

		data = _data;
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

	const formatDate = (_date: string) => {
		return dayjs(_date, 'YYYY-MM-DD').format('dddd DD MMM YYYY');
	};
</script>

<div class="flex flex-col gap-2">
	<div class="p-4 shadow-sm bg-white w-full flex flex-wrap gap-2 text-slate-700">
		<p class="record">
			<span class="key"> Total consumption : </span>
			<span class="value">
				{$userConsumptionData.length} orders
			</span>
		</p>
		<DropdownDivider />
		<p class="record">
			<span class="key"> Downpayment : </span>
			<span class="value">
				UGX {downpayment.toLocaleString()}
			</span>
		</p>
		<p class="record">
			<span class="key"> Total consumption expenditure : </span>
			<span class="value">
				UGX {total.toLocaleString()}
			</span>
		</p>
		<DropdownDivider />
		<p class="record">
			<span class="key"> Balance : </span>
			<span class="value">
				UGX {(downpayment - total).toLocaleString()}
			</span>
		</p>
		{#each chartData3.labels as status, index}
			<p class="text-right self-end w-fit ">
				{#if status == 'reviewing'}
					{chartData3.datasets[0].values[index]} claims under review
				{:else if status == 'yes'}
					{chartData3.datasets[0].values[index]} claims accepted
				{/if}
			</p>
		{/each}
	</div>

	<div class="p-4 shadow-sm bg-white w-full flex flex-wrap gap-2">
		<p class="record">
			<span class="key"> Date Filter : </span>
			<span class="text-slate-400 text-sm">
				<span class="rounded  px-2 py-1">
					{formatDate($startDateFilter)}
				</span>
				to
				<span class="rounded  px-2 py-1">
					{formatDate($endDateFilter)}
				</span>
			</span>
		</p>
	</div>

	<div class="w-full overflow-auto">
		<div class="p-4 shadow-sm bg-white max-w-[800px] flex-1  flex flex-col gap-2 h-50">
			<span class="key">Order List</span>
			<Chart type="bar" data={chartData1} />
		</div>
	</div>

	<div class="gap-2 template">
		<div class="p-4 shadow-sm bg-white h-50">
			<span class="key">Order Approval Status</span>
			<Chart type="pie" data={chartData2} />
		</div>

		<div class="p-4 shadow-sm bg-white h-50">
			<span class="key">Audited Transaction Summary</span>
			<Chart type="bar" data={chartData3} />
		</div>
	</div>
</div>

<style>
	.key {
		font-weight: 600;
	}

	.value {
		text-align: right;
	}
	.record {
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
