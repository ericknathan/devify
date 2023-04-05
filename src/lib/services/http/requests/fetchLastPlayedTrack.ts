import type { TrackModel } from '$lib/models';
import { API_URL, DEFAULT_TRACK } from '$lib/services/constants';

interface FetchLastPlayedTrackParams {
	fetch: typeof window.fetch;
}

export async function fetchLastPlayedTrack({ fetch }: FetchLastPlayedTrackParams): Promise<TrackModel> {
	const userPlayingTrackQueryParams = {
		method: 'user.getrecenttracks',
		api_key: import.meta.env.VITE_LASTFM_API_KEY,
		user: import.meta.env.VITE_LASTFM_USERNAME,
		format: 'json',
		limit: '1'
	};

	const userPlayingTrackUrl = new URL(API_URL);
	userPlayingTrackUrl.search = new URLSearchParams(userPlayingTrackQueryParams).toString();

	const userPlayingTrackResponse = await fetch(userPlayingTrackUrl);

	if (userPlayingTrackResponse.ok) {
		const json = await userPlayingTrackResponse.json();
		const lastPlayedTrack = json.recenttracks.track[0];

		return lastPlayedTrack as TrackModel;
	}

	return DEFAULT_TRACK;
}
