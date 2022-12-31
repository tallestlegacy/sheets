<script>
	import { userPaymentsData } from '$lib/store';
	import Filters from './Filters.svelte';
</script>

<div class="bg-white shadow-md flex flex-wrap  justify-between items-center px-8 py-4 w-full sticky top-0 z-40 gap-4">
	<div class="flex justify-center px-4 ">
		<img
			src="https://maishameds.org/wp-content/uploads/2016/06/CMYK-1_web_200-1.png"
			class="h-8 sm:h-9"
			alt="logo"
		/>
	</div>
	<Filters />
</div>
