<script lang="ts">
	import { userConsumptionData, userPaymentsData } from '$lib/store';
	import Chart from 'svelte-frappe-charts';

	let total = 0;

	let data: any = {};
	let statuses: any = {};
	let recognized: any = {};

	$userConsumptionData.forEach((record) => {
		total += record['Price_Per_Product_UGX'];

		if (!data[record['Product Name']]) {
			data[record['Product Name']] = 0;
		}
		data[record['Product Name']] += record['Price_Per_Product_UGX'];

		if (!statuses[record['Approval Status Name']]) {
			statuses[record['Approval Status Name']] = 0;
		}
		statuses[record['Approval Status Name']] += record['Price_Per_Product_UGX'];

		if (!recognized[record['Recognized']]) {
			recognized[record['Recognized']] = 0;
		}
		recognized[record['Recognized']] += record['Price_Per_Product_UGX'];
	});

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
</script>

<div class="flex flex-col gap-2">
	<div class="p-4 shadow-sm bg-white w-full flex flex-wrap gap-2">
		<p class="record">
			<span class="key"> Total consumption : </span>
			<span class="value">
				{$userConsumptionData.length} orders
			</span>
		</p>
		<p class="record">
			<span class="key"> Downpayment : </span>
			<span class="value">
				UGX {$userPaymentsData[0]['Downpayment Amount (UGX)'].toLocaleString()}
			</span>
		</p>
		<p class="record">
			<span class="key"> Total consumption expenditure : </span>
			<span class="value">
				UGX {total.toLocaleString()}
			</span>
		</p>
	</div>

	<div class="w-full overflow-auto">
		<div class="p-4 shadow-sm bg-white max-w-[800px] flex-1  flex flex-col gap-2 h-50">
			<Chart type="bar" data={chartData1} />
		</div>
	</div>

	<div class="gap-2 template">
		<div class="p-4 shadow-sm bg-white h-50">
			<Chart type="pie" data={chartData2} />
		</div>

		<div class="p-4 shadow-sm bg-white h-50">
			<Chart type="bar" data={chartData3} />
		</div>
	</div>

	<!-- <div class="p-4 shadow-sm bg-white w-full flex flex-wrap gap-2">
		<p class="record">
			<span class="key"> Collateral :</span>
			<span class="value">
				{$userConsumptionData.length} orders
			</span>
		</p>
		<p class="record">
			<span class="key"> Sales under review : </span>
			<span class="value">
				UGX {$userPaymentsData[0]['Downpayment Amount (UGX)'].toLocaleString()}
			</span>
		</p>
		<p class="record">
			<span class="key"> Sales approved : </span>
			<span class="value">
				UGX {total.toLocaleString()}
			</span>
		</p>
	</div> -->
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
