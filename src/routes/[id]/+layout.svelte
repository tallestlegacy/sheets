<script>

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
    import {userConsumptionData, userPaymentsData} from "$lib/store"

const fetchFacilityData = async () => {
    const res = await fetch(`/api${$page.url.pathname}`);
    const data = await res.json();

    userConsumptionData.set(data.consumption);
    userPaymentsData.set(data.payments);
    
};

onMount(() => {
    fetchFacilityData();
});
</script>

<slot/>