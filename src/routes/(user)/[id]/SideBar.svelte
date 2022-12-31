<script>
	import { Datepicker, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import * as Icons from 'svelte-awesome-icons';
	import { userConsumptionData, startDateFilter, endDateFilter } from '$lib/store';
	import dayjs from 'dayjs';
	import { getJsDateFromExcel } from 'excel-date-to-js';

	let startDate = $userConsumptionData[0]['Trn_Date'];
	let endDate = $userConsumptionData[$userConsumptionData.length - 1]['Trn_Date'];
	let _startDate = dayjs(getJsDateFromExcel(startDate - 1));
	let _endDate = dayjs(getJsDateFromExcel(endDate - 1));
</script>

<Sidebar>
	<div class="flex flex-col justify-between h-full p-4">
		<div class="grid gap-2">
			<SidebarGroup>
				<div class="flex justify-center items-center px-4 py-10">
					<img
						src="https://maishameds.org/wp-content/uploads/2016/06/CMYK-1_web_200-1.png"
						class="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
				</div>
			</SidebarGroup>
			<SidebarGroup border>
				<SidebarItem label="Summary">
					<svelte:fragment slot="icon">
						<Icons.ChartColumnSolid class="text-blue-400" />
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</div>
		<SidebarGroup border>
			<div class="grid gap-2 text-gray-600">
				<label for="">Start Date</label>
				<input
					type="date"
					min={_startDate.format('YYYY-MM-DD')}
					max={$endDateFilter}
					bind:value={$startDateFilter}
					
				/>
				<label for="">End Date</label>
				<input
					type="date"
					min={$startDateFilter}
					max={_endDate.format('YYYY-MM-DD')}
					bind:value={$endDateFilter}
				/>
			</div>
		</SidebarGroup>
	</div>
</Sidebar>
