<script lang="ts">
	export let trackUrl: string;
</script>

<div class="controls-wrapper">
	<button><img src="/icons/prev.svg" alt="" /></button>
	<a href={trackUrl}><img src="/icons/play.svg" alt="" /></a>
	<button><img src="/icons/next.svg" alt="" /></button>
</div>

<style lang="scss">
	.controls-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		max-width: 11.75rem;
		margin: 0 auto;

		button, a {
			all: unset;
			cursor: pointer;
		}
	}
</style>
