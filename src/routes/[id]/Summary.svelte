<script lang="ts">
	import { userConsumptionData } from '$lib/store';
	import { json } from '@sveltejs/kit';
	import Chart from 'svelte-frappe-charts';

	let total = 0;

	let data: any = {};
	$userConsumptionData.forEach((record) => {
		total += record['Price_Per_Product_UGX'];

		if (!data[record['Product Name']]) {
			data[record['Product Name']] = 0;
		}
		data[record['Product Name']] += record['Price_Per_Product_UGX'];
	});

	$: chartData1 = {
		labels: Object.keys(data),
		datasets: [
			{
                name: "Order list summary",
				values: Object.values(data)
			}
		]
	};
</script>

<div class="p-4 shadow-sm bg-white w-full flex flex-col gap-2">
    <p class="record">
        <span class="key"> Facility name </span>
		<span class="value">
            {$userConsumptionData[0]["Facility_Name"]}
		</span>
	</p>
    <p class="record">
        <span class="key"> Total consumption : </span>
		<span class="value">
            {$userConsumptionData.length} orders
		</span>
	</p>
    <p class="record">
        <span class="key"> Total consumption expenditure : </span>
		<span class="value">
            UGX {total.toLocaleString()}
		</span>
	</p>
</div>

<div class="p-4 shadow-sm bg-white max-w-[600px] flex-1  flex flex-col gap-2 mt-4 h-50">
	<Chart
		type="bar"
		data={chartData1}
	/>
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
</style>
