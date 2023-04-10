export const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0';
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export const DEFAULT_TRACK = () => ({
	name: 'Acorda devinho',
	url: '#',
	artist: {
		'#text': 'Banda Rocketseat'
	},
	image: [
		{
			size: 'extralarge',
			'#text': 'https://source.unsplash.com/random/190x190/?abstract,fluid,purple'
		}
	],
	duration: Math.floor(Math.random() * (210000 - 60000 + 1) + 60000),
	playedDuration: 0
});
