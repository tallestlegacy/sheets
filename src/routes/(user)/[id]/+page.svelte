<script lang="ts">
	import Summary from './Summary.svelte';
	import { userConsumptionData, userPaymentsData } from '$lib/store';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		Sidebar,
		SidebarBrand,
		SidebarGroup,
		SidebarItem
	} from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';
	import SideBar from './SideBar.svelte';

	$: facility = '';
</script>

{#if $userConsumptionData.length === 0}
	<p>Loading report ...</p>
{:else}
	<div class="flex text-black">
		<SideBar/>
		
		<main
			class="h-screen overflow-auto  bg-slate-200 w-screen flex flex-col relative p-4 justify-center align-middle"
		>
			<div class="max-w-[800px]">
				<Summary />
			</div>
		</main>
	</div>
{/if}

<style>
	main {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 4rem;
	}
</style>
