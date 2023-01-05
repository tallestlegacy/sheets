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

<div class="page h-screen overflow-hidden">
	<Sidebar />
	<slot />
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: auto 1fr;
	}
</style>
