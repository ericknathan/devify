<script>
	import { invalidateAll } from '$app/navigation';
	import MusicPlayerCard from '$lib/components/MusicPlayerCard.svelte';
	import { musicProgress } from '$lib/stores/musicProgress';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	/** @type {import('./$types').PageData} */
	export let data;

	$: lastPlayedTrack = data.props?.lastPlayedTrack;
	$: duration = lastPlayedTrack.duration;

	onMount(() => {
		const defaultPlayedDuration = new Date(lastPlayedTrack.playedDuration);

		setInterval(() => {
			musicProgress.update((store) => {
				const playedDuration = new Date(store.getTime() + 1000);

				if (playedDuration.getTime() >= duration) {
					invalidateAll();
					return new Date(-2000);
				}

				return playedDuration;
			});
		}, 1000);

		musicProgress.set(defaultPlayedDuration);
	});
</script>

<svelte:head>
    <title>Music Player | {lastPlayedTrack.name}</title>
</svelte:head>

<div id="app">
	{#key lastPlayedTrack}
		<div id="player-1" in:fly={{ y: 50, duration: 2000 }} out:fade={{ duration: 200 }}>
			<MusicPlayerCard trackData={lastPlayedTrack} size="large" />
		</div>
		<div id="player-2" in:fly={{ y: 50, duration: 2000, delay: 200 }} out:fade={{ duration: 200 }}>
			<MusicPlayerCard trackData={lastPlayedTrack} />
		</div>
		<div id="player-3" in:fly={{ y: 50, duration: 2000, delay: 400 }} out:fade={{ duration: 200 }}>
			<MusicPlayerCard trackData={lastPlayedTrack} showProgress={false} />
		</div>
	{/key}
</div>

<style lang="scss">
	#app {
		display: grid;
		grid-template-columns: max-content;
		grid-template-areas:
			'A B'
			'A C';
		gap: 2rem;
		place-content: center;

		max-width: 90vw;
		height: 100vh;
		margin: 0 auto;

		#player-1 {
			grid-area: A;
		}

		#player-2,
		#player-3 {
			min-width: 22rem;
		}

		#player-2 {
			grid-area: B;
		}

		#player-3 {
			grid-area: C;
		}

		@media (max-width: 695px) {
			display: flex;
			flex-direction: column;

			width: 21rem;
			max-width: 90vw;
			margin: auto;
			height: auto;

			padding-block: 60px;
		}
	}
</style>
