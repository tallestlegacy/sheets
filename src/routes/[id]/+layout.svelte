<script>

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
    import {userConsumptionData} from "$lib/store"

const fetchFacilityData = async () => {
    const res = await fetch(`/api${$page.url.pathname}`);
    const data = await res.json();

    userConsumptionData.set(data);
    
};

onMount(() => {
    fetchFacilityData();
});
</script>

<slot/>