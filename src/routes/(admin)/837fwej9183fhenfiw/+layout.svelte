<script>
	import { serverClients } from '$lib/store';
	import { onMount } from 'svelte';
	import Sidebar from './home/Sidebar.svelte';

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
	<Sidebar />
	<div class="max-w-screen page h-screen overflow-auto">
		<slot />
	</div>
</div>
