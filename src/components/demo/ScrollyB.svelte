<script>
	import { getContext } from "svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { LayerCake, Svg } from "layercake";
	import { scaleBand, scaleLinear } from "d3-scale";
	import StackedBar from "$components/layercake/StackedBar.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import BarLegend from "$components/layercake/BarLegend.svelte";

	export let scrollContent;
	const data = getContext("data");
	const section2data = data?.section2data || [];

	// $: {
	// 	console.log("Section2data:", section2data);
	// }
	let value = undefined;

	// Create a tweened store for the transition
	const progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

	// Update progress when step changes
	$: {
		progress.set(value);
	}

	// Process data based on current step
	$: processedData = section2data
		.map((d) => {
			const neverHeardPct = Number(d.never_pct_2022_s) || 0;
			const heardPct = 100 - neverHeardPct;

			// Default to step 0 when value is undefined or null
			const currentStep = value ?? 0;

			if (currentStep === 0) {
				// Step 1: Single bar
				return [
					{
						jurisdiction: d.Jurisdiction_s,
						value: 100,
						color: "#666",
						x0: 0
					}
				];
			} else if (currentStep === 1) {
				// Step 2: Split bars (2 levels)
				return [
					{
						jurisdiction: d.Jurisdiction_s,
						value: neverHeardPct,
						color: "#666",
						x0: 0
					},
					{
						jurisdiction: d.Jurisdiction_s,
						value: heardPct,
						color: "#ffffff",
						x0: neverHeardPct
					}
				];
			} else if (currentStep <= 4) {
				// Steps 3-5: Split bars (5 levels)
				return [
					{
						jurisdiction: d.Jurisdiction_s,
						value: Number(d.never_pct_s) || 0,
						color: "#666",
						x0: 0,
						knowitwell: Number(d.knowitwell_pct_s) || 0
					},
					{
						jurisdiction: d.Jurisdiction_s,
						value: Number(d.onceortwice_pct_s) || 0,
						color: "#9DB2BE",
						x0: Number(d.never_pct_s) || 0,
						knowitwell: Number(d.knowitwell_pct_s) || 0
					},
					{
						jurisdiction: d.Jurisdiction_s,
						value: Number(d.afewtimes_pct_s) || 0,
						color: "#7B96A6",
						x0:
							(Number(d.never_pct_s) || 0) + (Number(d.onceortwice_pct_s) || 0),
						knowitwell: Number(d.knowitwell_pct_s) || 0
					},
					{
						jurisdiction: d.Jurisdiction_s,
						value: Number(d.often_pct_s) || 0,
						color: "#5A7A8E",
						x0:
							(Number(d.never_pct_s) || 0) +
							(Number(d.onceortwice_pct_s) || 0) +
							(Number(d.afewtimes_pct_s) || 0),
						knowitwell: Number(d.knowitwell_pct_s) || 0
					},
					{
						jurisdiction: d.Jurisdiction_s,
						value: Number(d.knowitwell_pct_s) || 0,
						color: "#395E76",
						x0:
							(Number(d.never_pct_s) || 0) +
							(Number(d.onceortwice_pct_s) || 0) +
							(Number(d.afewtimes_pct_s) || 0) +
							(Number(d.often_pct_s) || 0),
						knowitwell: Number(d.knowitwell_pct_s) || 0
					}
				];
			} else {
				// Step 6: Split bars with _d series
				return [
					{
						jurisdiction: d.Jurisdiction_d,
						value: Number(d.never_pct_d) || 0,
						color: "#666",
						x0: 0,
						knowitwell: Number(d.knowitwell_pct_d) || 0
					},
					{
						jurisdiction: d.Jurisdiction_d,
						value: Number(d.onceortwice_pct_d) || 0,
						color: "#9DB2BE",
						x0: Number(d.never_pct_d) || 0,
						knowitwell: Number(d.knowitwell_pct_d) || 0
					},
					{
						jurisdiction: d.Jurisdiction_d,
						value: Number(d.afewtimes_pct_d) || 0,
						color: "#7B96A6",
						x0:
							(Number(d.never_pct_d) || 0) + (Number(d.onceortwice_pct_d) || 0),
						knowitwell: Number(d.knowitwell_pct_d) || 0
					},
					{
						jurisdiction: d.Jurisdiction_d,
						value: Number(d.often_pct_d) || 0,
						color: "#5A7A8E",
						x0:
							(Number(d.never_pct_d) || 0) +
							(Number(d.onceortwice_pct_d) || 0) +
							(Number(d.afewtimes_pct_d) || 0),
						knowitwell: Number(d.knowitwell_pct_d) || 0
					},
					{
						jurisdiction: d.Jurisdiction_d,
						value: Number(d.knowitwell_pct_d) || 0,
						color: "#395E76",
						x0:
							(Number(d.never_pct_d) || 0) +
							(Number(d.onceortwice_pct_d) || 0) +
							(Number(d.afewtimes_pct_d) || 0) +
							(Number(d.often_pct_d) || 0),
						knowitwell: Number(d.knowitwell_pct_d) || 0
					}
				];
			}
		})
		.flat();

	// Update the sorting logic to handle step 6
	$: {
		if (value === 4) {
			// Step 5: Sort by knowitwell_pct_s
			processedData.sort((a, b) => a.knowitwell - b.knowitwell);
		} else if (value === 5) {
			// Step 6: Sort by knowitwell_pct_d
			processedData.sort((a, b) => a.knowitwell - b.knowitwell);
		} else {
			// Steps 0-4: Sort by never_pct_s
			const jurisdictionOrder = [
				...new Set(processedData.map((d) => d.jurisdiction))
			].sort((a, b) => {
				const aData = section2data.find((d) => d.Jurisdiction_s === a);
				const bData = section2data.find((d) => d.Jurisdiction_s === b);
				return (
					(Number(aData?.never_pct_s) || 0) - (Number(bData?.never_pct_s) || 0)
				);
			});

			processedData.sort(
				(a, b) =>
					jurisdictionOrder.indexOf(a.jurisdiction) -
					jurisdictionOrder.indexOf(b.jurisdiction)
			);
		}
	}

	// Update the yDomain computation to use the sorted order
	$: yDomain = [...new Set(processedData.map((d) => d.jurisdiction))];

	$: chartTitle =
		value === 5
			? 'Students\' response to the fake concept "Declarative Fraction"'
			: 'Students\' response to the fake concept "Subjunctive Scaling"';
</script>

<section class="scrolly-section">
	<div class="spacer" />

	<div class="sticky-wrapper">
		<div class="chart-container">
			<div class="chart-header">
				<h3 class="chart-title">{chartTitle}</h3>
				<BarLegend step={value} />
			</div>
			<LayerCake
				data={processedData}
				x="value"
				y="jurisdiction"
				{yDomain}
				xDomain={[0, 100]}
				padding={{ top: 10, right: 20, bottom: 40, left: 200 }}
				yScale={scaleBand().padding(0.2)}
				xScale={scaleLinear()}
			>
				<Svg>
					<StackedBar step={value} />
					<AxisX
						gridlines={true}
						ticks={[0, 20, 40, 60, 80, 100]}
						formatTick={(d) => d + "%"}
						baseline={true}
					/>
				</Svg>
			</LayerCake>
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

	.sticky-wrapper {
		position: sticky;
		top: 0;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.chart-container {
		width: 90vw;
		height: 95vh;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
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
		z-index: 1;
	}

	.step.active .step-content {
		opacity: 1;
	}

	.chart-header {
		padding: 20px 20px 0 20px;
	}

	.chart-title {
		font-family: var(--sans);
		font-size: var(--20px);
		color: var(--color-gray-700);
		margin-bottom: 16px;
		text-align: center;
	}

	.step-content p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 0;
	}
</style>
