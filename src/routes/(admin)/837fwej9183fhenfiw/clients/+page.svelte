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
	<h1 class="p-4 text-4xl font-bold underline border-b-black/10 border-b-2">Clients</h1>
	<Table>
		<TableHead>
			<TableHeadCell>ID</TableHeadCell>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Url</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $serverClients as client}
				<TableBodyRow>
					<TableBodyCell>{client.name_1}</TableBodyCell>
					<TableBodyCell>{client.name}</TableBodyCell>
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
