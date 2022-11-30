import {writable, type Writable} from "svelte/store"


export const workBook: Writable<any[]> = writable([]);
export const sheetNames: Writable<string[]> = writable([]);


export const serverConsumptionData = writable([]);
export const serverPayments = writable([]);
export const userConsumptionData = writable([]);
export const userPaymentsData = writable([]);