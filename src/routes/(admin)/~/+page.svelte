<script lang="ts">
	import {sheetNames } from '$lib/store';
	import FilePicker from '../home/FilePicker.svelte';
	import Tables from '../home/Tables.svelte';
</script>

{#if $sheetNames.length === 0}
	<FilePicker />
{:else}
	<Tables />
{/if}
