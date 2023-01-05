<script>
	import { Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';
	import { page } from '$app/stores';
	import { workBook, sheetNames } from '$lib/store';

	const dashboardItems = [
		{
			label: 'Local Tables',
			href: '',
			Icon: Icons.TableListSolid
		},
		{
			label: 'Consumption Data',
			href: 'consumption_data',
			Icon: Icons.UserTagSolid
		},
		{
			label: 'Update DB',
			href: 'update_db',
			Icon: Icons.CloudArrowUpSolid
		}
	];
</script>

<Sidebar class="bg-green-600 px-2 py-4 flex flex-col gap-16">
	<SidebarGroup>
		{#each dashboardItems as { label, Icon, href }}
			<SidebarItem
				{label}
				href="/837fwej9183fhenfiw/{href}"
				active={`"/837fwej9183fhenfiw/${href}` === $page.url.pathname}
				class="{`"/837fwej9183fhenfiw/${href}` === $page.url.pathname ? 'bg-white/50 text-green-900' : 'text-white/50 hover:bg-white/10'} rounded-md"
			>
				<Icon slot="icon" />
			</SidebarItem>
		{/each}
	</SidebarGroup>
	<SidebarGroup>
		<button
			class="bg-red-50 text-red-800 font-bold flex gap-4 justify-between px-2 py-2 rounded-md w-fit"
			on:click={() => {
				workBook.set([]);
				sheetNames.set([]);
			}}
		>
			<Icons.TrashCanRegular />
			<span> Clear Local Table </span>
		</button>
	</SidebarGroup>
</Sidebar>
