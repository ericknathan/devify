import { writable } from 'svelte/store';

type MusicProgress = {
	startedAt: Date;
	playedDuration: Date;
	shouldInvalidate?: boolean;
};

const { set, subscribe, update } = writable<MusicProgress>({
	startedAt: new Date(),
	playedDuration: new Date(0),
	shouldInvalidate: false
});

function differenceInMilisseconds(date1: Date, date2: Date) {
	return date1.getTime() - date2.getTime();
}

export const musicProgress = {
	set,
	subscribe,
	update,
	updateDuration: (totalDuration: number, serverPlayedDuration: number) => {
		update((store) => {
			const playedDuration = new Date(differenceInMilisseconds(new Date(), store.startedAt));

			if (store.shouldInvalidate) {
				return {
					playedDuration: new Date(serverPlayedDuration),
					startedAt: new Date(new Date().getTime() - serverPlayedDuration),
					shouldInvalidate: false
				};
			} else if (differenceInMilisseconds(playedDuration, new Date(totalDuration)) >= 0) {
				return {
					...store,
					shouldInvalidate: true
				};
			}

			return {
				...store,
				playedDuration
			};
		});
	}
};
