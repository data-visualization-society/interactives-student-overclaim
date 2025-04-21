<script>
	// shadow, plain, line, bubble
	import logo from "$logo/nightingale-logo.png";
</script>

<header>
	<div class="logo">
		<a href="https://nightingaledvs.com" target="_blank">
			<img src={logo} alt="Nightingale Data Visualization Society" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.logo {
		max-width: 14em;
		padding: 32px 0 0 0;
		/* transform: rotate(-4deg); */
		text-align: center;
	}

	.logo a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.logo a:hover {
		background-color: transparent;
	}

	img {
		height: auto;
		width: 200px; /* or whatever width you want */
	}
</style>
