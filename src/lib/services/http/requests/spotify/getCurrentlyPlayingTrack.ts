import type { TrackModel } from '$lib/models';
import { DEFAULT_TRACK } from '$lib/services/constants';

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET, VITE_SPOTIFY_REFRESH_TOKEN } =
	import.meta.env;
const REFRESH_INTERVAL = 1000 * 60 * 60;

const config = {
	clientId: VITE_SPOTIFY_CLIENT_ID,
	clientSecret: VITE_SPOTIFY_CLIENT_SECRET,
	refreshToken: VITE_SPOTIFY_REFRESH_TOKEN,
	accessToken: null
};

let lastRefreshNative = new Date(0);

export async function refreshAccessToken() {
	const now = new Date();

	if (now.getTime() - lastRefreshNative.getTime() > REFRESH_INTERVAL) {
		const url = new URL('https://accounts.spotify.com/api/token');
		const params = new URLSearchParams();
		params.append('grant_type', 'refresh_token');
		params.append('refresh_token', config.refreshToken);
		params.append('client_id', config.clientId);
		params.append('client_secret', config.clientSecret);

		const response = await fetch(url, {
			method: 'POST',
			body: params
		});

		if (response.ok) {
			const data = await response.json();
			config.accessToken = data.access_token;
			lastRefreshNative = now;
		}
	}
}

export async function getCurrentlyPlayingTrack(fetch: typeof window.fetch): Promise<TrackModel> {
	const requestStartedAt = new Date();
	await refreshAccessToken();

	const url = new URL('https://api.spotify.com/v1/me/player/currently-playing');
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${config.accessToken}`
		}
	});

	if (response.ok) {
		try {
			const data = await response.json();
			const { item, progress_ms } = data;
			const { artists, name, duration_ms, external_urls, album } = item;

			return {
				name,
				artist: {
					'#text': artists[0].name
				},
				duration: duration_ms,
				playedDuration: progress_ms + (new Date().getTime() - requestStartedAt.getTime()) || 0,
				url: external_urls.spotify,
				image: [
					{
						'#text': album.images[0].url,
						size: 'extralarge'
					}
				]
			};
		} catch (error) {
			return DEFAULT_TRACK();
		}
	}

	return DEFAULT_TRACK();
}
