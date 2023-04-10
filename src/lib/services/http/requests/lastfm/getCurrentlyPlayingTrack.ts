import type { TrackModel } from "$lib/models";
import { fetchLastPlayedTrack } from "./fetchLastPlayedTrack";
import { fetchTrackDetails } from "./fetchTrackDetails";

export async function getCurrentlyPlayingTrack(fetch: typeof window.fetch): Promise<TrackModel> {
  const lastPlayedTrack = await fetchLastPlayedTrack({ fetch });
	const trackDetails = await fetchTrackDetails({
		fetch,
		artist: lastPlayedTrack.artist['#text'],
		track: lastPlayedTrack.name
	});

	lastPlayedTrack.duration =
		trackDetails.duration === '0'
			? Math.floor(Math.random() * (210000 - 60000 + 1) + 60000)
			: parseInt(trackDetails.duration);
	lastPlayedTrack.playedDuration = Math.random() * lastPlayedTrack.duration;

  return lastPlayedTrack;
}