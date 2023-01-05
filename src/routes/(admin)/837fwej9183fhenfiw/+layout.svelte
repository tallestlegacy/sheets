<script>
	import { serverClients } from '$lib/store';
	import { onMount } from 'svelte';
	import Sidebar from './home/Sidebar.svelte';
	import * as Icons from 'svelte-awesome-icons';
	import { drawerHidden } from './home/store';

	const fetchClients = async () => {
		const response = await fetch('/api/data/clients');
		const data = await response.json();
		serverClients.set(data);
	};

	onMount(() => {
		fetchClients();
	});
</script>

<div class="h-screen relative flex">
	<div class="h-full w-full overflow-auto relative">
		<button class="absolute top-0 right-0 p-4 z-50" on:click={() => drawerHidden.set(false)}>
			<Icons.BarsSolid />
		</button>
		<div class="w-full">
			<slot />
		</div>
	</div>
	<Sidebar />
</div>
