<script lang="ts">
	import { workBook, sheetNames } from '$lib/store';
	import { Fileupload } from 'flowbite-svelte';
	import { utils, read } from 'xlsx';

	let fileuploadprops = {
		id: 'user_avatar'
	};

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

<div class="flex place-content-center bg-red-300">
	<Fileupload {...fileuploadprops} on:change={fileSelected} />
</div>
