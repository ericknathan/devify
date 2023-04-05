/** @type {import('./$types').PageLoad} */

import { fetchLastPlayedTrack, fetchTrackDetails } from '$lib/services/http/requests';

export async function load({ fetch }) {
	const lastPlayedTrack = await fetchLastPlayedTrack({ fetch });
	const trackDetails = await fetchTrackDetails({
		fetch,
		artist: lastPlayedTrack.artist['#text'],
		track: lastPlayedTrack.name
	});

	lastPlayedTrack.duration =
		trackDetails.duration === '0'
			? Math.floor(Math.random() * 1000) + 100000
			: parseInt(trackDetails.duration);
	lastPlayedTrack.playedDuration = Math.random() * lastPlayedTrack.duration;

	return {
		props: {
			lastPlayedTrack
		}
	};
}
