<script>
	import { serverClients } from '$lib/store';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<div>
	<h1 class="p-4 text-4xl font-bold underline border-b-black/10 border-b-2">Clients ({$serverClients.length})</h1>
	<Table>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Collateral</TableHeadCell>
			<TableHeadCell>Supplies</TableHeadCell>
			<TableHeadCell>Sales</TableHeadCell>
			<TableHeadCell>_id</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $serverClients as client}
				<TableBodyRow>
					<TableBodyCell>{client.facility}</TableBodyCell>
					<TableBodyCell>{client["Collateral Downpayment"]?.toLocaleString()}</TableBodyCell>
					<TableBodyCell>{client["Supplies"]?.toLocaleString()}</TableBodyCell>
					<TableBodyCell>{client["Sales"]?.toLocaleString()}</TableBodyCell>
					<TableBodyCell>
						<a href="/{client._id}">
							{client._id}
						</a>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
