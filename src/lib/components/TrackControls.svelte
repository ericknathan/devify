<script lang="ts">
	export let trackUrl: string;

	const { VITE_API_PROVIDER } = import.meta.env;
</script>

<div class="controls-wrapper">
	<button><img src="/icons/prev.svg" alt="" /></button>
	<a href={trackUrl} title="View music details on {VITE_API_PROVIDER}"><img src="/icons/play.svg" alt="" /></a>
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

			display: flex;
			align-items: center;
			justify-content: center;

			width: 2rem;
			height: 2rem;
			padding: 2px;
			border-radius: 4px;

			&:focus {
				outline: 2px solid #fff5;
			}
		}
	}
</style>
