<script>
	import { workBook, sheetNames } from '$lib/store';
	import { Button, ButtonGroup, TabItem, Tabs } from 'flowbite-svelte';

	let currentSheet = 0;
</script>

<div class="wrapper bg-green-50">
	<div class="bg-black/5 tabs  p-2 border-b-1 border-b-white">
		{#each $sheetNames as sheetName, index}
			<button
				class="w-fit hover:text-green-500 flex items-center p-2 h-fit border-1 {index ===
				currentSheet
					? 'underline underline-offset-4 text-black font-bold'
					: 'text-slate-700'}"
				on:click={() => (currentSheet = index)}>{sheetName}</button
			>
		{/each}
	</div>

	<div class="overflow-y-auto p-4 flex flex-col gap-5">
		<p class="text-bold bg-slate-300 w-fit py-2 px-4 rounded-full">
			{$workBook[currentSheet].length.toLocaleString()} Records
		</p>

		<pre class="bg-green-900 p-8 rounded-md text-green-100 overflow-auto">
{JSON.stringify($workBook[currentSheet][0], null, 2)}
			</pre>
	</div>
</div>

<style>
	.tabs {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>
