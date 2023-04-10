import { getCurrentlyPlayingTrack } from '$lib/services/http/requests/';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const lastPlayedTrack = await getCurrentlyPlayingTrack(fetch);

	return {
		props: {
			lastPlayedTrack
		}
	};
}
