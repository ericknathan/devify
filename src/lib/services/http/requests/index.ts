import { getCurrentlyPlayingTrack as getCurrentlyPlayingTrackFromLastFm } from './lastfm';
import { getCurrentlyPlayingTrack as getCurrentlyPlayingTrackFromSpotify } from './spotify';

const { VITE_API_PROVIDER } = import.meta.env;

console.log({ VITE_API_PROVIDER })

export const getCurrentlyPlayingTrack =
	VITE_API_PROVIDER === 'lastfm'
		? getCurrentlyPlayingTrackFromLastFm
		: getCurrentlyPlayingTrackFromSpotify;
