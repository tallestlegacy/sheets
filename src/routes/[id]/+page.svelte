<script lang="ts">
	import Summary from './Summary.svelte';
	import {userConsumptionData} from "$lib/store";
	
</script>

<main class="h-screen bg-green-100 w-screen">
	<div class="max-w-[600px] mx-auto">
		<h1 class="text-4xl font-bold my-8">Summary</h1>

		{#if $userConsumptionData.length === 0}
			<p>Loading report ...</p>
		{:else}
			<Summary/>
		{/if}
	</div>
</main>

<style>
	main {
		padding: 1rem;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 2rem;
	}
</style>
