<script lang="ts">
	import { workBook, sheetNames } from '$lib/store';
	import { Dropzone, Fileupload } from 'flowbite-svelte';
	import { utils, read } from 'xlsx';
	import * as Icons from 'svelte-awesome-icons';

	async function fileSelected(e: any) {
		const file = e.target.files[0];
		const text = await file.arrayBuffer();
		const wb = read(text);

		const sheets = Object.values(wb.Sheets).map((sheet) => {
			return utils.sheet_to_json(sheet);
		});

		workBook.set(sheets);

		sheetNames.set(wb.SheetNames);
	}
</script>

<div class="flex flex-col gap-8 place-content-center h-fit p-8 w-fit mx-auto">
	<h1 class="text-4xl font-bold underline" >Upload an Excel Sheet</h1>
	<Fileupload on:change={fileSelected} />
</div>
