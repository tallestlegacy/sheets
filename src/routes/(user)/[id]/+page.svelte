<script lang="ts">
	import Summary from './Summary.svelte';
	import { userConsumptionData } from '$lib/store';

	import TopBar from './TopBar.svelte';
</script>

<main class="bg-slate-200 relative min-h-screen">
	{#if $userConsumptionData.length === 0}
		<p>Loading report ...</p>
	{:else}
		<TopBar />
		<div class="flex justify-center items-center">
			<div class="max-w-[800px]">
				<Summary />
			</div>
		</div>
	{/if}
</main>
