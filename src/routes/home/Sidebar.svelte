<script>
	import { Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';
	import { page } from '$app/stores';
	import { workBook, sheetNames } from '$lib/store';

	const dashboardItems = [
		{
			label: 'Local Tables',
			href: '/',
			Icon: Icons.TableListSolid
		},
		{
			label: 'Consumption Data',
			href: '/consumption_data',
			Icon: Icons.UserTagSolid
		},
		{
			label: 'Supply Data',
			href: '/supply_data',
			Icon: Icons.BoxesStackedSolid
		},
		{
			label: 'Update DB',
			href: '/update_db',
			Icon: Icons.CloudArrowUpSolid
		}
	];
</script>

<Sidebar class="bg-green-600 p-2 flex flex-col gap-4 ">
	<SidebarWrapper>
		<SidebarGroup class="grid gap-2">
			{#each dashboardItems as { label, Icon, href }}
				<SidebarItem {label} {href} active={href === $page.url.pathname}>
					<Icon color="#0003" slot="icon" />
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
	<SidebarGroup>
		<button
			class="bg-orange-200 text-red-700 font-bold flex gap-4 justify-between px-2 py-3 rounded-lg  w-fit"
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
