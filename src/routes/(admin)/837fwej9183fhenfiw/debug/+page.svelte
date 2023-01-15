<script>
	import { workBook } from '$lib/store';
	import Tables from '../home/Tables.svelte';
</script>

{#if $workBook.length > 0}
	<Tables />
{/if}
