<script>
	import '../app.scss';
</script>

<div class="layout-wrapper">
	<slot />

	<footer>
		<span>🎧 Created by: <a href="https://github.com/ericknathan" target="_blank">Erick Nathan</a></span>
	</footer>
</div>

<style lang="scss">
	.layout-wrapper {
		footer {
			position: fixed;
			bottom: 2rem;
			right: 2rem;

			span a {
				color: #ffffff77;
			}
		}
	}
</style>
