<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { endDateFilter, startDateFilter, userConsumptionData, userId, userPaymentsData } from '$lib/store';

	import dayjs from 'dayjs';
	import { getJsDateFromExcel } from 'excel-date-to-js';

	userId.set($page.params.id);


	const fetchFacilityData = async () => {
		const res = await fetch(`/api/${$userId}`);
		const data = await res.json();

		userConsumptionData.set(
			data.consumption.sort(
				(/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) =>
					a['TRN_DATE'] > b['TRN_DATE']
			)
		);
		userPaymentsData.set(data.payments);

		let startDate = $userConsumptionData[0]['TRN_DATE'];
		let endDate = $userConsumptionData[$userConsumptionData.length - 1]['TRN_DATE'];
		let _startDate = dayjs(getJsDateFromExcel(startDate - 1));
		let _endDate = dayjs(getJsDateFromExcel(endDate - 1));

        startDateFilter.set(_startDate.format("YYYY-MM-DD"))
        endDateFilter.set(_endDate.format("YYYY-MM-DD"))
	};

	onMount(() => {
		fetchFacilityData();
	});
</script>

<slot />
