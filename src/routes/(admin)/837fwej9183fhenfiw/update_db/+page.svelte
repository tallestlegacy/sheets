<script lang="ts">
	import { serverClients, sheetNames, workBook } from '$lib/store';
	import { onMount } from 'svelte';
	import * as Icons from 'svelte-awesome-icons';
	import FilePicker from '../home/FilePicker.svelte';
	import { fetchClients } from '../init';

	let data: any = {
		state: 'no upload started'
	};

	const updateConsumptionData = async () => {
		data = {
			state: 'uploading consumption data...'
		};

		const response = await fetch('/api/update/consumption', {
			method: 'POST',
			body: JSON.stringify(sales)
		});

		data.state = 'updated';

		data.res = await response.json();
	};

	const updatePayments = async () => {
		data = {
			state: 'uploading payments...'
		};

		const response = await fetch('/api/update/payments', {
			method: 'POST',
			body: JSON.stringify($workBook[1])
		});

		data.state = 'updated';

		data.res = await response.json();
	};

	/*?.map((record:any) => ({
		//facility_id : record["FACILITY_ID"],
		facility_name : record["FACILITY_ID"],
		care_pathway_type : record["CARE_PATHWAY_TYPE_NAME"],
		date_synced : record["DATE_SYNCED"],
		trn_date : record["TRN_DATE"],
		product_name : record["PRODUCT_NAME"],
		approval_status : record["APPROVAL_STATUS_NAME"],
		price : record["Standard Cost Prices"],
		recognized : record["Recognized"],
		
	}));*/
	//?.filter((record : any) => record["FACILITY_ID"] != "");
	
	$: sales = $workBook[6]

	$: clients = $workBook[0]
		?.filter((record: any) => record['Sales'] != '')
		.filter(
			(record: any) => !$serverClients.find((_record: any) => _record['name_1'] == record['name_1'])
		);

	const updateClients = async () => {
		data = {
			state: 'uploading clients...',
			clients
		};

		const response = await fetch('/api/update/clients', {
			method: 'POST',
			body: JSON.stringify(clients)
		});

		data.state = 'updated';
		data.res = await response.json();

		await fetchClients();
	};
</script>

<div class="p-4 h-screen">
	<h1 class="text-4xl underline">Update DB</h1>
	{#if $workBook.length == 0}
		<div class="px-4 py-12">
			<FilePicker />
		</div>
	{:else}
		<div class="flex flex-col justify-start w-[100%] gap-8 my-8 h-full overflow-auto">
			<div class="flex flex-wrap  gap-2">
				<button
					class="bg-green-400 p-2 rounded-md flex justify-between gap-4 text-green-100 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-green-200 transition-all w-fit"
					on:click={updateClients}
				>
					<Icons.CloudArrowUpSolid />
					{clients.length} new Client(s)
				</button>
				<button
					class="bg-green-400 p-2 rounded-md flex justify-between gap-4 text-green-100 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-green-200 transition-all w-fit"
					on:click={updateConsumptionData}
				>
					<Icons.CloudArrowUpSolid />
					{sales.length} Sales
				</button><!-- 
				<button
					class="bg-green-400 p-2 rounded-md flex justify-between gap-4 text-green-100 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-green-200 transition-all w-fit"
					on:click={updatePayments}
				>
					<Icons.CloudArrowUpSolid />
					Downpayments
				</button> -->

				<button
					class="bg-red-50 text-red-800 font-bold flex gap-4 justify-between px-2 py-2 rounded-md w-fit"
					on:click={() => {
						workBook.set([]);
						sheetNames.set([]);
					}}
				>
					<Icons.TrashCanRegular />
					<span> Clear Local Table </span>
				</button>
			</div>

			<pre class="bg-green-900  rounded-md p-4 text-green-100 overflow-auto flex-1">	
Response data : 


{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	{/if}
</div>
