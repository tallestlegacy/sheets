<script>
	import { serverConsumptionData } from '$lib/store';
	import { Skeleton, Table } from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';

	let loadingData = false;

	const fetchConsumptionData = async () => {
		loadingData = true;
		const res = await fetch('/api/data');
		const data = await res.json();
		serverConsumptionData.set(data);
		loadingData = false;
	};

	$: tableCols = $serverConsumptionData.length > 0 ? Object.keys($serverConsumptionData[0]) : [];
</script>

<div class="flex flex-col overflow-auto">
	<h1 class="p-4 text-4xl font-bold underline border-b-black/10 border-b-2">Consumption data</h1>

	{#if $serverConsumptionData.length == 0}
		<div class="p-8">
			<button
				class="bg-green-400 p-2 rounded-md flex justify-between gap-4 text-green-100 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-green-200 transition-all w-fit"
				on:click={fetchConsumptionData}
			>
				<Icons.CloudArrowDownSolid />
				Fetch Consumption data
			</button>
		</div>

		{#if loadingData}
			{#each ['', ''] as _}
				<Skeleton />
			{/each}
		{/if}
	{:else}
		<div class="table-grid p-4">
			{#each $serverConsumptionData as row, index}
				<div class="cell-grid bg-white p-2 rounded-sm shadow-sm shadow-black/5">
					<span class="text-gray-400">{index + 1}</span>
					<span>
						<a href="/{row['Facility_Name']}">
							{row['Facility_Name']}
						</a>
					</span>
					<span>{row['Product Name']}</span>
					<span class="text-right">{row['Price_Per_Product_UGX'].toLocaleString()}</span>
					<span class="text-gray-400">{row['Recognized']}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.table-grid {
		background-color: whitesmoke;
		overflow: auto;
		height: 100%;
		display: grid;
		gap: 0.2rem;
	}
	.cell-grid {
		display: grid;
		grid-template-columns: 2rem 1fr 2fr 1fr 1fr;
		align-items: flex-start;
		gap: 1rem;
	}
</style>
