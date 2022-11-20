import {writable, type Writable} from "svelte/store"


export const workBook: Writable<any[]> = writable([]);
export const sheetNames: Writable<string[]> = writable([]);