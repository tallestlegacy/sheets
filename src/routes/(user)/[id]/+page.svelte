<script lang="ts">
	import Summary from './Summary.svelte';
	import { userConsumptionData } from '$lib/store';

	import TopBar from './TopBar.svelte';
</script>

{#if $userConsumptionData.length === 0}
	<p>Loading report ...</p>
{:else}
	<main class="w-screen bg-slate-200 relative">
		<TopBar />
		<div class="flex justify-center items-center">
			<div class="max-w-[800px]">
				<Summary />
			</div>
		</div>
	</main>
{/if}

<style>
	main {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 4rem;
	}
</style>
