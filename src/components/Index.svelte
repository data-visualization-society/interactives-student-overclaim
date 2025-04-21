<script>
	import { setContext, getContext, onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import ScrollyA from "$components/demo/ScrollyA.svelte";
	import ScrollyB from "$components/demo/ScrollyB.svelte";
	import ScrollyC from "$components/demo/ScrollyC.svelte";
	import DemoSortTable from "$components/demo/Demo.SortTable.svelte";
	import LanguageTable from "$components/demo/LanguageTable.svelte";
	import PisaTables from "$components/demo/PisaTables.svelte";
	import OverclaimingTable from "$components/demo/OverclaimingTable.svelte";
	import ScrollyD from "$components/demo/ScrollyD.svelte";
	import Section from "./Section.svelte";
	import { convertFlagEmojis } from "../utils/flags";
	import Header from "./Header.svelte";

	// Import data "copy" and set context
	import copy from "$data/copy.json";

	// Process all copy content that contains flag emojis
	$: processedCopy = {
		...copy,
		title: convertFlagEmojis(copy.title),
		subtitle: convertFlagEmojis(copy.subtitle),
		a_intro_2_scroll: copy.a_intro_2_scroll?.map((item) => ({
			...item,
			step: convertFlagEmojis(item.step)
		})),
		b_section_2_scroll: copy.b_section_2_scroll?.map((item) => ({
			...item,
			step: convertFlagEmojis(item.step)
		})),
		c_section_3_scroll: copy.c_section_3_scroll?.map((item) => ({
			...item,
			step: convertFlagEmojis(item.step)
		})),
		d_section_2_scroll: copy.d_section_2_scroll?.map((item) => ({
			...item,
			step: convertFlagEmojis(item.step)
		}))
	};

	// Set the processed copy in context
	setContext("copy", processedCopy);

	// Get the data from the context
	let data = getContext("data");

	let viewportHeight;
	let mounted = false;

	onMount(() => {
		viewportHeight = $viewport.height;
		// console.log("Viewport height:", viewportHeight);
		mounted = true;
		// console.log("Component mounted:", mounted);
	});
</script>

{#if mounted}
	<Header />
	<div id="article">
		<div class="title-section">
			<h1 class="title title-large">{@html processedCopy.title}</h1>
			<h2 class="title dek" style="--delay:0.5s;">
				{@html processedCopy.subtitle}
			</h2>
			<p class="title byline">
				by <a href="https://www.yuqiliao.com/">Yuqi Liao</a>, March 20, 2025
			</p>
		</div>
		<div id="section section-a">
			<Section type="paragraph" content={processedCopy.a_intro} />
			<ScrollyA scrollContent={processedCopy.a_intro_2_scroll} />
			<Section type="paragraph" content={processedCopy.a_intro_3} />
		</div>
		<div id="section section-b">
			<Section type="title" content={processedCopy.b_section} />
			<ScrollyB scrollContent={processedCopy.b_section_2_scroll} />
			<Section type="paragraph" content={processedCopy.b_section_3} />
			<DemoSortTable />
		</div>
		<div id="section section-c">
			<Section type="title" content={processedCopy.c_section} />
			<Section type="paragraph" content={processedCopy.c_section_2} />
			<ScrollyC scrollContent={processedCopy.c_section_3_scroll} />
			<Section type="paragraph" content={processedCopy.c_section_4} />
			<LanguageTable />
			<Section type="paragraph" content={processedCopy.c_section_5} />
			<PisaTables />
			<Section type="paragraph" content={processedCopy.c_section_6} />
			<OverclaimingTable />
		</div>
		<div id="section section-d">
			<Section type="title" content={processedCopy.d_section} />
			<Section type="paragraph" content={processedCopy.d_section} />
			<ScrollyD scrollContent={processedCopy.d_section_2_scroll} />
			<Section type="paragraph" content={processedCopy.d_section_3} />
		</div>
		<div id="section section-e">
			<Section type="title" content={processedCopy.e_outro} />
			<Section type="paragraph" content={processedCopy.e_outro_2} />
		</div>
		<div id="section section-f" class="methodology-section">
			<Section type="title" content={processedCopy.f_methodology} />
			<Section type="paragraph" content={processedCopy.f_methodology_2} />
		</div>
	</div>
{/if}

<style>
	:root {
		--color-primary: #1a365d; /* Deep navy */
		--color-secondary: #2c5282; /* Medium blue */
		--color-accent: #4299e1; /* Light blue */
		--color-background: #f7fafc; /* Very light blue-gray */
		--color-text: #2d3748; /* Dark gray with slight blue tint */
		--color-light-text: #e2e8f0; /* Light gray for dark backgrounds */
		--color-neverheard-highlight: #666;
		--color-heardonce-highlight: #9db2be;
		--color-heardafewtimes-highlight: #7b96a6;
		--color-heardoften-highlight: #5a7a8e;
		--color-knowitwell-highlight: #395e76;
		--color-mathaveragescrollyD-highlight: #395e76;
		--color-knowitwellscrollyD-highlight: #6eb7a1;
		--color-neverheardscrollyD-highlight: #ff9b42;
	}

	/* Apply background color to the entire body */
	:global(body) {
		background-color: var(--color-background);
	}

	#article {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	/* Full-width container for scrolly sections */
	[id^="section"] {
		position: relative;
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
		padding: 2rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	/* Content container within sections */
	[id^="section"] > :global(:not(.scrolly-section)) {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	/* Allow scrolly sections to use full width */
	[id^="section"] > :global(.scrolly-section) {
		width: 100%;
	}

	.title-section {
		margin: 4rem 0 4rem;
		text-align: center;
		background: linear-gradient(
			180deg,
			var(--color-background) 0%,
			rgba(240, 255, 244, 0) 100%
		);
	}

	.title {
		margin: 0;
		transition: all 0.3s ease;
	}

	.title-large {
		font-size: 3.5rem;
		font-weight: 800;
		line-height: 1.2;
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	.dek {
		font-size: 1.8rem;
		color: var(--color-secondary);
		opacity: 0.8;
		font-weight: 400;
		max-width: 700px;
		margin: 1.5rem auto;
	}

	.byline {
		font-size: 1rem;
		color: var(--color-fg);
		opacity: 0.6;
		margin-top: 2rem;
	}

	.byline a {
		color: var(--color-accent);
		text-decoration: none;
		border-bottom: 1px solid currentColor;
		transition: color 0.3s ease;
	}

	.byline a:hover {
		color: var(--color-secondary);
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.title-large {
			font-size: 2.8rem;
		}

		.dek {
			font-size: 1.5rem;
		}

		#article {
			padding: 16px;
		}
	}

	@media (max-width: 480px) {
		.title-large {
			font-size: 2.2rem;
		}

		.dek {
			font-size: 1.3rem;
		}

		.title-section {
			margin: 3rem 0 3rem;
		}
	}

	.section-title {
		color: var(--color-primary);
	}

	/* Global text highlight */
	:global(.text-highlight) {
		border-radius: 3px;
		background: var(--color-light-text);
		color: var(--color-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.neverheard-highlight) {
		border-radius: 3px;
		background: var(--color-neverheard-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.heardonce-highlight) {
		border-radius: 3px;
		background: var(--color-heardonce-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.heardafewtimes-highlight) {
		border-radius: 3px;
		background: var(--color-heardafewtimes-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.heardoften-highlight) {
		border-radius: 3px;
		background: var(--color-heardoften-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.knowitwell-highlight) {
		border-radius: 3px;
		background: var(--color-knowitwell-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.mathaveragescrollyD-highlight) {
		border-radius: 3px;
		background: var(--color-mathaveragescrollyD-highlight);
		color: var(--color-light-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.knowitwellscrollyD-highlight) {
		border-radius: 3px;
		background: var(--color-knowitwellscrollyD-highlight);
		color: var(--color-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.neverheardscrollyD-highlight) {
		border-radius: 3px;
		background: var(--color-neverheardscrollyD-highlight);
		color: var(--color-text);
		padding: 1px 3px;
		font-weight: 600;
	}

	:global(.footnote) {
		color: var(--color-text);
		opacity: 0.8;
		font-style: italic;
		font-size: 0.8rem;
		font-weight: 400;
		margin-top: 1rem;
	}

	:global(.bold) {
		font-weight: 600;
	}

	:global(.subjunctive-highlight) {
		text-decoration: underline;
		color: var(--color-gray-700);
		font-style: italic;
		font-weight: bold;
	}

	:global(.declarative-highlight) {
		text-decoration: underline;
		color: var(--color-gray-700);
		font-style: italic;
		font-weight: bold;
	}

	.methodology-section :global(.section-divider) {
		display: none;
	}

	.methodology-section :global(.section-header::after) {
		display: none;
	}

	.methodology-section :global(h2) {
		font-size: 1.5rem; /* Smaller title size */
	}

	.methodology-section :global(p) {
		font-size: 0.9rem; /* Smaller paragraph size */
		opacity: 0.8; /* Slightly dimmed text */
	}

	:global(.flag-icon) {
		display: inline-block;
		vertical-align: middle;
		margin: 0 2px;
		border: 1px solid #eee;
	}
</style>
