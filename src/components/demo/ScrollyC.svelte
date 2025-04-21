<script>
	import { getContext } from "svelte";
	import { scaleLinear } from "d3-scale";
	import { LayerCake, Svg } from "layercake";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MapChart from "$components/layercake/MapChart.svelte";
	import Tooltip from "$components/layercake/Tooltip.svelte";
	import worldGeoJson from "$data/world.geo.json";

	export let scrollContent;
	const data = getContext("data");
	const section3data = data?.section3data || [];

	let value = 0;

	// Create color scale with extended range
	const colorScale = scaleLinear().domain([-15, -10, -5, 0, 5, 10, 15]).range([
		"#d73027", // dark red
		"#f46d43", // light red
		"#fdae61", // orange
		"#ffffbf", // yellow
		"#a6d96a", // light green
		"#66bd63", // medium green
		"#1a9850" // dark green
	]);

	// Add these variables to handle tooltip state
	let tooltipData = {};
	let tooltipX = 0;
	let tooltipY = 0;
	let tooltipVisible = false;

	// Add handler for the MapChart events
	function handleMapEvent(event) {
		try {
			if (
				event.type === "mousemove" &&
				event.detail?.e &&
				event.detail?.props
			) {
				const rect = event.detail.e.target
					.closest(".chart-container")
					.getBoundingClientRect();
				tooltipData = event.detail.props;
				tooltipX = event.detail.e.clientX - rect.left;
				tooltipY = event.detail.e.clientY - rect.top;
				tooltipVisible = true;
			} else if (event.type === "mouseout") {
				tooltipVisible = false;
			}
		} catch (error) {
			console.debug("Error in handleMapEvent:", error);
			tooltipVisible = false;
		}
	}
</script>

<section class="scrolly-section">
	<div class="spacer" />

	<div class="sticky-container">
		<div class="chart-container">
			<LayerCake
				data={section3data}
				padding={{ top: 60, right: 10, bottom: 20, left: 10 }}
			>
				<Svg>
					<MapChart
						world={worldGeoJson}
						{colorScale}
						step={value}
						on:mousemove={handleMapEvent}
						on:mouseout={handleMapEvent}
					/>
				</Svg>
			</LayerCake>

			<div class="tooltip-wrapper">
				<Tooltip
					x={tooltipX}
					y={tooltipY}
					visible={tooltipVisible}
					data={tooltipData}
				/>
			</div>
		</div>
	</div>

	<Scrolly bind:value>
		{#each scrollContent as step, i}
			<div class="step" class:active={value === i}>
				<div class="step-content">
					<p>{@html step.step}</p>
				</div>
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
</section>

<style>
	.scrolly-section {
		position: relative;
		width: 100%;
		z-index: 0;
	}

	.spacer {
		height: 0vh;
	}

	.sticky-container {
		position: sticky;
		top: 0;
		height: 100vh;
		width: 100%;
		z-index: 1;
	}

	.chart-container {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.tooltip-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.step {
		margin: 0 auto;
		padding: 1rem;
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-content {
		background: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		max-width: 40rem;
		margin: 0 auto;
		opacity: 0.3;
		transition: opacity 250ms;
		position: relative;
		z-index: 2;
	}

	.step.active .step-content {
		opacity: 1;
	}

	.step-content p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 0;
	}
</style>
