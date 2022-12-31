<script>
	import { userPaymentsData } from '$lib/store';
	import Filters from './Filters.svelte';
</script>

<div class="bg-white shadow-md flex flex-wrap  justify-between px-8 py-4 w-full sticky top-0 z-40">
	<div class="flex justify-center items-center px-4">
		<img
			src="https://maishameds.org/wp-content/uploads/2016/06/CMYK-1_web_200-1.png"
			class="mr-3 h-6 sm:h-9"
			alt="logo"
		/>
	</div>
	<!-- 
	<h1 class="text-2xl font-bold my-8">{$userPaymentsData[0]['Facility Name']}</h1> -->
	<Filters />
</div>
