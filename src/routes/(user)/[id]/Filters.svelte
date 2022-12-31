<script>
	import { endDateFilter, startDateFilter, userConsumptionData } from '$lib/store';

	import dayjs from 'dayjs';
	import { getJsDateFromExcel } from 'excel-date-to-js';

	let startDate = $userConsumptionData[0]['Trn_Date'];
	let endDate = $userConsumptionData[$userConsumptionData.length - 1]['Trn_Date'];
	let _startDate = dayjs(getJsDateFromExcel(startDate - 1));
	let _endDate = dayjs(getJsDateFromExcel(endDate - 1));
</script>

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
			class="text-sm"
			type="date"
			min={$startDateFilter}
			max={_endDate.format('YYYY-MM-DD')}
			bind:value={$endDateFilter}
		/>
	</div>
</div>
