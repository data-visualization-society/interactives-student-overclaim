<script>
	export let content = [];
	export let type = "paragraph";
	export let className = "";
</script>

<section class="content-section {className} {type}">
	{#if type === "title" && content[0]?.section_title}
		<div class="section-header">
			<h2 class="section-title">{@html content[0].section_title}</h2>
			{#if content[0]?.section_subtitle}
				<h3 class="section-subtitle">{@html content[0].section_subtitle}</h3>
			{/if}
			<div class="section-divider" />
		</div>
	{:else if type === "paragraph"}
		{#each content as { text }}
			<p class="paragraph">{@html text}</p>
		{/each}
	{/if}
</section>

<style>
	.content-section {
		margin: 4rem 0;
		position: relative;
	}

	.content-section.title {
		margin-top: 6rem;
	}

	.section-header {
		position: relative;
		margin-bottom: 3rem;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--color-primary);
		margin-bottom: 1rem;
		position: relative;
	}

	.paragraph {
		font-size: 1.2rem;
		line-height: 1.8;
		margin: 1.5rem 0;
		color: var(--color-text);
		opacity: 0.9;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.section-title {
			font-size: 2rem;
		}

		.paragraph {
			font-size: 1.1rem;
			line-height: 1.6;
		}
	}

	@media (max-width: 480px) {
		.content-section {
			margin: 3rem 0;
		}

		.content-section.title {
			margin-top: 4rem;
		}

		.section-title {
			font-size: 1.75rem;
		}

		.paragraph {
			font-size: 1rem;
		}
	}

	/* Section divider - creates the short horizontal segement underlying the section title */
	.section-divider {
		height: 4px;
		width: 60px;
		background: var(--color-accent);
		margin-top: 1rem;
	}

	/* Section divider - creates the short vertical segement to the left of the section title */
	.section-header::after {
		content: "";
		position: absolute;
		left: -2rem;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--color-accent);
		border-radius: 2px;
	}

	.section-subtitle {
		font-size: 1.4rem;
		font-weight: 400;
		line-height: 1.4;
		color: var(--color-secondary);
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		opacity: 0.8;
	}

	/* Update responsive styles for subtitle */
	@media (max-width: 768px) {
		.section-subtitle {
			font-size: 1.2rem;
		}
	}

	@media (max-width: 480px) {
		.section-subtitle {
			font-size: 1.1rem;
		}
	}
</style>
