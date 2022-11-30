<script lang="ts">
	import Summary from './Summary.svelte';
	import {userConsumptionData, userPaymentsData} from "$lib/store";
	
</script>

<main class="h-screen overflow-auto  bg-green-100 w-screen flex flex-col">
	<div class="max-w-[800px] w-full  mx-auto flex flex-col">
		{#if $userConsumptionData.length === 0}
		<p>Loading report ...</p>
		{:else}
		<h1 class="text-4xl font-bold my-8">{$userPaymentsData[0]["Facility Name"]}</h1>
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
