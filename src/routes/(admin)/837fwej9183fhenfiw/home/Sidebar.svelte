<script>
	import { CloseButton, Drawer, Sidebar, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';
	import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';
	import { drawerHidden } from './store';

	const dashboardItems = [
		{
			label: 'Data',
			href: '',
			Icon: Icons.TableListSolid
		},
		{
			label: 'Clients',
			href: 'clients',
			Icon: Icons.UserLargeSolid
		},
		{
			label: 'Update DB',
			href: 'update_db',
			Icon: Icons.CloudArrowUpSolid
		},
		{
			label: 'Debug',
			href: 'debug',
			Icon: Icons.CodeSolid
		}
	];

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={$drawerHidden} id="sidebar2">
	<div class="flex items-center">
		<!-- <h5
			id="drawer-navigation-label-3"
			class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
		/> -->
		<CloseButton on:click={() => drawerHidden.set(true)} class="mb-4 dark:text-white" />
	</div>

	<Sidebar class="px-2 py-4 flex flex-col gap-16">
		<SidebarGroup on:click={() => drawerHidden.set(true)}>
			{#each dashboardItems as { label, Icon, href }}
				<SidebarItem
					on:click={() => drawerHidden.set(true)}
					{label}
					href="/837fwej9183fhenfiw/{href}"
					class="{`"/837fwej9183fhenfiw/${href}` === $page.url.pathname
						? 'bg-white/50 text-green-900'
						: 'text-white hover:bg-white/10 hover:text-black'} rounded-md"
				>
					<Icon slot="icon" />
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</Sidebar>
</Drawer>
