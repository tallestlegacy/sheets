import { serverClients } from "$lib/store";

export const fetchClients = async () => {
    const response = await fetch('/api/data/clients');
    const data = await response.json();
    serverClients.set(data);
};
