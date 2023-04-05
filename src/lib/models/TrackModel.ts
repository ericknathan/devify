export type TrackModel = {
	name: string;
	url: string;
	artist: {
		'#text': string;
	};
	image: {
		size: string;
		'#text': string;
	}[];
	duration: number;
	playedDuration: number;
};
