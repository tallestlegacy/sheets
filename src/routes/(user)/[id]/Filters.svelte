<script>
	import { endDateFilter, startDateFilter, userConsumptionData } from '$lib/store';

	import dayjs from 'dayjs';
	import { getJsDateFromExcel } from 'excel-date-to-js';

	let startDate = $userConsumptionData[0]['TRN_DATE'];
	let endDate = $userConsumptionData[$userConsumptionData.length - 1]['TRN_DATE'];
	let _startDate = dayjs(getJsDateFromExcel(startDate - 1));
	let _endDate = dayjs(getJsDateFromExcel(endDate - 1));
</script>

<div
	class="bg-white shadow-md flex flex-wrap  justify-between items-center px-8 py-4 w-full sticky bottom-0 z-40 gap-4 border-t-2"
>
	<div class="flex justify-center px-4 ">
		<div class="flex gap-2 text-gray-600">
			<div class="grid">
				<label class="text-xs" for="">Start Date</label>
				<input
					class="text-sm"
					type="date"
					min={_startDate.format('YYYY-MM-DD')}
					max={$endDateFilter}
					bind:value={$startDateFilter}
				/>
			</div>
			<div class="grid">
				<label class="text-xs" for="">End Date</label>
				<input
					class="text-sm w-fit"
					type="date"
					min={$startDateFilter}
					max={_endDate.format('YYYY-MM-DD')}
					bind:value={$endDateFilter}
				/>
			</div>
		</div>
	</div>
</div>
