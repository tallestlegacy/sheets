import {writable, type Writable} from "svelte/store"


export const workBook: Writable<any[]> = writable([]);
export const sheetNames: Writable<string[]> = writable([]);


export const serverConsumptionData = writable([]);
export const serverPayments = writable([]);
export const serverClients = writable([]);
export const userConsumptionData = writable([]);
export const userPaymentsData = writable({});

export const startDateFilter = writable("")
export const endDateFilter = writable("")

export const userId = writable("");