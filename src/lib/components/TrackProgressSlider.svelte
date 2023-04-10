<script lang="ts">
	import { musicProgress } from '$lib/stores/musicProgress';

	export let duration: Date;

	function getDurationString(duration: Date) {
		if(duration.getMinutes() >= 59) return '00:00';
		
		return `${duration.getMinutes().toString().padStart(2, '0')}:${duration
			.getSeconds()
			.toString()
			.padStart(2, '0')}`;
	}

		$: currentDuration = $musicProgress.playedDuration;
		$: progress = (currentDuration.getTime() / duration.getTime()) * 100
</script>

<div class="track-time-wrapper">
	<div class="track-progress-slider">
		<div class="played-progress" style="width: {progress}%;" />
	</div>
	<div class="time">
		<span id="played-duration">{getDurationString(currentDuration)}</span>
		<span>{getDurationString(duration)}</span>
	</div>
</div>

<style lang="scss">
	.track-time-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		width: 100%;

		.track-progress-slider {
			width: 100%;
			height: 6px;
			border-radius: 6px;

			overflow: hidden;

			background-color: #d9d9d94d;

			.played-progress {
				height: 100%;
				border-radius: 6px;

				background-color: #d9d9d9cc;
			}
		}

		.time {
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				color: #c4c4cc;

				font-size: 0.875rem;
				font-weight: 400;
			}
		}
	}
</style>
