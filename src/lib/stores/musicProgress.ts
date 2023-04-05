import { writable } from 'svelte/store';

const { set, subscribe, update } = writable(new Date());

export const musicProgress = {
	set,
	subscribe,
	update
};
