<script>
	import { getContext } from "svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { LayerCake, Svg } from "layercake";
	import { scaleLinear } from "d3-scale";
	import Scatter from "./ScatterD.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";

	export let scrollContent;
	const data = getContext("data");
	const section4data = data?.section4data || [];
	// console.log("Initial section4data:", section4data);

	let value = undefined;
	$: step = value ?? 0;

	// Create a tweened store for the transition
	const progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

	// Update progress when step changes
	$: {
		progress.set(value ?? 0);
	}

	$: processedData =
		section4data?.flatMap((d) => {
			// console.log("Processing data point for step", step, ":", d);

			if (!d || !d.mathAverage || !d.jurisdiction) {
				console.warn("Invalid data point:", d);
				return [];
			}

			// get gap based on step
			const gap =
				step === 9
					? d.declarativeNeverKnowitwellAvggap
					: d.subjunctiveNeverKnowitwellAvggap;

			// get gapTtest based on step
			const gapTtest =
				step === 9
					? d.declarativeNeverKnowitwellAvggapTtest
					: d.subjunctiveNeverKnowitwellAvggapTtest;

			// console.log("Gap for", d.jurisdiction, ":", gap);

			const rankObj =
				step === 4 ||
				step === 5 ||
				step === 6 ||
				step === 7 ||
				step === 8 ||
				step === 9
					? (step === 7 || step === 8 || step === 9
							? rankedDataByGap
							: rankedData
						)?.find((r) => r?.jurisdiction === d.jurisdiction)
					: null;

			if (step === 5 || step === 6 || step === 7 || step === 8 || step === 9) {
				// Use declarative data for step 9, subjunctive for others
				const neverAvg =
					step === 9 ? d.declarativeNeverAvg : d.subjunctiveNeverAvg;
				const knowitwellAvg =
					step === 9 ? d.declarativeKnowitwellAvg : d.subjunctiveKnowitwellAvg;

				return [
					{
						jurisdiction: d.jurisdiction,
						x: d.mathAverage,
						y: rankObj?.rank || 0,
						type: "mathAverage",
						id: `${d.jurisdiction}-mathAverage`,
						mathAverage: d.mathAverage,
						neverKnowitwellAvggap: gap,
						neverKnowitwellAvggapTtest: gapTtest
					},
					{
						jurisdiction: d.jurisdiction,
						x: neverAvg,
						y: rankObj?.rank || 0,
						type: "subjunctiveNever",
						id: `${d.jurisdiction}-subjunctiveNever`,
						mathAverage: d.mathAverage,
						neverAvg,
						knowitwellAvg,
						neverKnowitwellAvggap: gap,
						neverKnowitwellAvggapTtest: gapTtest
					},
					{
						jurisdiction: d.jurisdiction,
						x: knowitwellAvg,
						y: rankObj?.rank || 0,
						type: "subjunctiveKnowitwell",
						id: `${d.jurisdiction}-subjunctiveKnowitwell`,
						mathAverage: d.mathAverage,
						neverKnowitwellAvggap: gap,
						neverKnowitwellAvggapTtest: gapTtest
					}
				];
			} else {
				return [
					{
						jurisdiction: d.jurisdiction,
						x: d.mathAverage,
						y:
							step === 4
								? rankObj?.rank || 0
								: step === 3
									? d.declarativeKnowitwellPct || 0
									: d.subjunctiveKnowitwellPct || 0,
						type: "mathAverage",
						id: d.jurisdiction
					}
				];
			}
		}) || [];
	// $: console.log(processedData);

	// Add this after the existing processedData computation
	$: rankedData = [...(section4data || [])]
		.filter((d) => d && d.mathAverage != null)
		.sort((a, b) => b.mathAverage - a.mathAverage)
		.map((d, i) => ({
			jurisdiction: d.jurisdiction,
			rank: i + 1,
			mathAverage: d.mathAverage
		}));

	// Update the rankedDataByGap computation
	$: rankedDataByGap =
		step === 7 || step === 8 || step === 9
			? [...(section4data || [])]
					.map((d) => ({
						jurisdiction: d.jurisdiction,
						gap: Math.abs(d.subjunctiveNeverKnowitwellAvggap), //always rank the plot by the gap between knowitwell and never for Subjunctive. No need to update the order for the declarative version.
						rank: 0
					}))
					.sort((a, b) => b.gap - a.gap)
					.map((d, i) => ({
						...d,
						rank: i + 1
					}))
			: rankedData;

	// Update yDomain based on step
	$: yDomain =
		step === 4 ||
		step === 5 ||
		step === 6 ||
		step === 7 ||
		step === 8 ||
		step === 9
			? [rankedData.length + 1, 1] // Use rank range for domain
			: [0, 35];

	// Update y-axis label based on step
	$: yAxisLabel =
		step === 4 ||
		step === 5 ||
		step === 6 ||
		step === 7 ||
		step === 8 ||
		step === 9
			? ""
			: "Percentage of students who overclaim";

	// Update the chart title based on step
	$: chartTitle = (() => {
		switch (step) {
			case 0:
			case 1:
			case 2:
				return 'Percentage of students who overclaim to "Subjunctive Scaling" vs average math score';
			case 3:
				return 'Percentage of students who overclaim to "Declarative Fraction" vs average math score';
			case 4:
				return "Average math score by education system";
			case 5:
			case 6:
			case 7:
			case 8:
				return 'Average math score by education system: "Subjunctive Scaling"';
			case 9:
				return 'Average math score by education system: "Declarative Fraction"';
			default:
				return 'Percentage of students who overclaim to "Subjunctive Scaling" vs average math score';
		}
	})();
</script>

<section class="scrolly-section">
	<div class="spacer" />

	<div class="sticky-wrapper">
		<div class="chart-container">
			<h3 class="chart-title">
				{chartTitle}
			</h3>
			<LayerCake
				data={processedData}
				x="x"
				y="y"
				xDomain={[300, 600]}
				{yDomain}
				padding={{
					top: 20,
					right: 20,
					bottom: 50,
					left: 120
				}}
			>
				<Svg>
					<AxisX
						gridlines={true}
						ticks={[300, 350, 400, 450, 500, 550, 600]}
						label="Average math score"
					/>
					<AxisY
						gridlines={false}
						ticks={step === 4 ||
						step === 5 ||
						step === 6 ||
						step === 7 ||
						step === 8 ||
						step === 9
							? Array.from({ length: rankedData.length }, (_, i) => i + 1)
							: [0, 5, 10, 15, 20, 25, 30, 35]}
						formatTick={step === 4 ||
						step === 5 ||
						step === 6 ||
						step === 7 ||
						step === 8 ||
						step === 9
							? (rank) =>
									step === 7 || step === 8 || step === 9
										? rankedDataByGap.find((d) => d.rank === rank)
												?.jurisdiction || ""
										: rankedData.find((d) => d.rank === rank)?.jurisdiction ||
											""
							: (d) => d}
						label={yAxisLabel}
					/>
					<Scatter {step} />
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
		height: 88vh;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 40px;
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

	.chart-title {
		text-align: center;
		margin-bottom: 20px;
		font-family: var(--sans);
		font-size: var(--20px);
		color: var(--color-gray-700);
		flex-shrink: 0;
	}

	:global(.y-axis .axis-label) {
		transform: translate(140px, 0) rotate(-90deg);
	}

	:global(.x-axis .gridline) {
		clip-path: inset(0% -100% 0% 0%);
	}

	.step-content p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 0;
	}
</style>
