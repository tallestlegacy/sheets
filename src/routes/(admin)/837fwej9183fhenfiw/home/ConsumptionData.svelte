<script>
	import { serverConsumptionData } from '$lib/store';
	import dayjs from 'dayjs';
	import { getJsDateFromExcel } from 'excel-date-to-js';
	import {
		Skeleton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
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

<div class="flex flex-col">
	<h1 class="p-4 text-4xl font-bold underline border-b-black/10 border-b-2 sticky top-0 z-30 bg-white">Consumption data</h1>

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
			<div class="p-8">
				<Skeleton />
			</div>
			{/each}
		{/if}
	{:else}
		<div class="p-4 bg-green-50">
			<Table shadow striped>
				<TableHead>
					<TableHeadCell>idx</TableHeadCell>
					<TableHeadCell>ID</TableHeadCell>
					<TableHeadCell>Product</TableHeadCell>
					<TableHeadCell>Price (UGX)</TableHeadCell>
					<TableHeadCell>Date</TableHeadCell>
					<TableHeadCell>Approval</TableHeadCell>
				</TableHead>
				<TableBody >
					{#each $serverConsumptionData as row, index}
						<TableBodyRow>
							<TableBodyCell>{index + 1}</TableBodyCell>
							<TableBodyCell>{row.Facility_Name}</TableBodyCell>
							<TableBodyCell>{row["Product Name"]}</TableBodyCell>
							<TableBodyCell>{row.Price_Per_Product_UGX.toLocaleString()}</TableBodyCell>
							<TableBodyCell>{dayjs(getJsDateFromExcel(row.Trn_Date)).format("dd DD MMMM, YYYY")}</TableBodyCell>
							<TableBodyCell>{row.Recognized}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{/if}
</div>
