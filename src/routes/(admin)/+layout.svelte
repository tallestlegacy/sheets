<script>
	import Sidebar from "./home/Sidebar.svelte";
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
