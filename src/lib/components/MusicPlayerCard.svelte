<script lang="ts">
	import type { TrackModel } from '$lib/models';
	import TrackControls from './TrackControls.svelte';
	import TrackProgressSlider from './TrackProgressSlider.svelte';

	export let showProgress = true;
	export let size = 'small';
	export let trackData: TrackModel;

	const image = trackData.image.filter(({ size }) => size === 'extralarge')[0]['#text'];
	const duration = new Date(trackData.duration);
	const playedDuration = new Date(trackData.playedDuration);
</script>

<div class="player {size}" style="--image-url: url({image});">
	<div class="info-wrapper">
		<img src={image} alt="" />
		<div class="info">
			<h1 title={trackData.name}>{trackData.name}</h1>
			<span title={trackData.artist['#text']}>{trackData.artist['#text']}</span>
		</div>
	</div>
	<TrackControls trackUrl={trackData.url} />
	{#if showProgress}
		<TrackProgressSlider {duration} />
	{/if}
</div>

<style lang="scss">
	.player {
		position: relative;

		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1.75rem;

		max-width: 80vw;
		height: 100%;
		padding: 1.5rem;
		border-radius: 8px;

		background-color: #1d1d1d77;
		border: 1px solid rgba(59, 59, 59, 0.467);

		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;

			background: var(--image-url) no-repeat center center / cover;

			opacity: 0.2;

			filter: blur(2px);
		}

		&.large {
			justify-content: center;
			padding: 2.25rem;

			.info-wrapper {
				align-items: flex-start;
				flex-direction: column;
				gap: 1.5rem;

				img {
					width: 12rem;
					height: 12rem;
					margin: auto;
				}
			}
		}

		.info-wrapper {
			display: flex;
			align-items: center;
			gap: 1.75rem;

			width: 100%;

			img {
				width: 5.25rem;
				height: 5.25rem;
				border-radius: 6px;
			}

			.info {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				h1,
				span {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					max-width: 12rem;
				}

				h1 {
					font-size: 1.5rem;
					font-weight: 700;
				}

				span {
					opacity: 0.67;
					font-size: 1.125rem;
					font-weight: 400;
				}
			}
		}

		@media (max-width: 695px) {
			&.large .info-wrapper {
				img {
					aspect-ratio: 1 / 1;

					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
