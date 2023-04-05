import { API_URL } from '$lib/services/constants';

interface FetchLastPlayedTrackParams {
	fetch: typeof window.fetch;
	artist: string;
	track: string;
}

export async function fetchTrackDetails({ fetch, artist, track }: FetchLastPlayedTrackParams) {
	const trackDetailsQueryParams = {
		method: 'track.getInfo',
		api_key: import.meta.env.VITE_LASTFM_API_KEY,
		artist,
		track,
		format: 'json'
	};

	const trackDetailsUrl = new URL(API_URL);
	trackDetailsUrl.search = new URLSearchParams(trackDetailsQueryParams).toString();

	const trackDetailsResponse = await fetch(trackDetailsUrl);

	if (trackDetailsResponse.ok) {
		const json = await trackDetailsResponse.json();
		return json.track;
	}

	return {
		duration: '0'
	};
}
