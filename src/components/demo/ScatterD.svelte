<script>
	import { getContext } from "svelte";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import { fade, fly } from "svelte/transition";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let step = 0;
	let hoveredData = null;

	// Create a tweened value for the trend line animation
	const trendLineProgress = tweened(0, {
		duration: 800,
		easing: linear
	});

	function handleMouseOver(event, d) {
		hoveredData = d;
	}

	function handleMouseOut() {
		hoveredData = null;
	}

	// Update the reactive statements
	$: showUS =
		step === 1 ||
		step === 2 ||
		step === 3 ||
		step === 4 ||
		step === 5 ||
		step === 6 ||
		step === 7 ||
		step === 8 ||
		step === 9;
	$: showOthers =
		step === 2 ||
		step === 3 ||
		step === 4 ||
		step === 5 ||
		step === 6 ||
		step === 7 ||
		step === 8 ||
		step === 9;
	$: showSecondaryDots =
		step === 5 || step === 6 || step === 7 || step === 8 || step === 9;
	$: showLegend =
		step === 4 ||
		step === 5 ||
		step === 6 ||
		step === 7 ||
		step === 8 ||
		step === 9;

	// Update how we handle US dots
	$: usDots = $data
		? step === 5 || step === 6 || step === 7 || step === 8 || step === 9
			? $data.filter((d) => d?.jurisdiction === "United States")
			: [
					$data.find(
						(d) =>
							d?.jurisdiction === "United States" && d?.type === "mathAverage"
					)
				].filter(Boolean)
		: [];

	$: otherDots = $data
		? $data.filter((d) => d?.jurisdiction !== "United States")
		: [];

	// Update dot color based on type
	$: getDotColor = (d) => {
		if (d.type === "mathAverage") return "#395E76";
		if (d.type === "subjunctiveNever") return "#FF9B42";
		if (d.type === "subjunctiveKnowitwell") return "#6EB7A1";
		return "#395E76"; // default color
	};

	// Update dot size based on type
	$: getDotSize = (d) => {
		if (d.jurisdiction === "United States") return 8;
		return 5;
	};

	// Update legend items based on step
	$: legendItems =
		step === 5 || step === 6 || step === 7 || step === 8 || step === 9
			? [
					{ label: "Math average", color: "#395E76" },
					{ label: "Never heard of it", color: "#FF9B42" },
					{ label: "Know it well", color: "#6EB7A1" }
				]
			: [{ label: "Math Average", color: "#395E76" }];

	// Calculate trend line points (simple linear regression)
	$: trendLinePoints = (() => {
		if (!$data || !$data.length) return null;

		const points = $data;
		const n = points.length;

		const xValues = points.map((d) => $xGet(d));
		const yValues = points.map((d) => $yGet(d));

		// Get actual x-axis range from data
		const xMin = Math.min(...xValues);
		const xMax = Math.max(...xValues);

		const xMean = xValues.reduce((a, b) => a + b) / n;
		const yMean = yValues.reduce((a, b) => a + b) / n;

		const numerator = points.reduce((sum, point) => {
			return sum + ($xGet(point) - xMean) * ($yGet(point) - yMean);
		}, 0);

		const denominator = points.reduce((sum, point) => {
			return sum + Math.pow($xGet(point) - xMean, 2);
		}, 0);

		const slope = numerator / denominator;
		const intercept = yMean - slope * xMean;

		return {
			x1: xMin - 20, // Extend slightly beyond the minimum x value
			y1: intercept + slope * (xMin - 20),
			x2: xMax + 20, // Extend slightly beyond the maximum x value
			y2: intercept + slope * (xMax + 20)
		};
	})();
</script>

{#if showLegend}
	<g class="legend" transform="translate(50, -20)">
		{#each legendItems as item, i}
			<g transform="translate({i * 200}, 0)">
				<circle r="7" cx="0" cy="0" fill={item.color} opacity="1" />
				<text x="12" y="5" font-size="1rem" fill="#666">
					{item.label}
				</text>
			</g>
		{/each}
	</g>
{/if}

<g class="scatter-group">
	<!-- Draw row highlights FIRST (before rectangles and circles): highlight rows in each know it well outperforms never heard of-->
	{#if step === 8 || step === 9}
		{#each otherDots.filter((d) => d.type === "subjunctiveNever") as dot (dot.id)}
			{#if dot.knowitwellAvg > dot.neverAvg && dot.neverKnowitwellAvggapTtest === "TRUE"}
				<rect
					x={$xScale.range()[0]}
					y={$yGet(dot) - 6}
					width={$xScale.range()[1] - $xScale.range()[0]}
					height="12"
					fill="#fff5cc"
					opacity="0.5"
				/>
			{/if}
		{/each}
		{#each usDots.filter((d) => d.type === "subjunctiveNever") as dot (dot.id)}
			{#if dot.knowitwellAvg > dot.neverAvg && dot.neverKnowitwellAvggapTtest === "TRUE"}
				<rect
					x={$xScale.range()[0]}
					y={$yGet(dot) - 6}
					width={$xScale.range()[1] - $xScale.range()[0]}
					height="12"
					fill="#fff5cc"
					opacity="0.5"
				/>
			{/if}
		{/each}
	{/if}

	<!-- Then draw connecting rectangles -->
	{#if step === 6 || step === 7 || step === 8 || step === 9}
		<!-- US segments -->
		{#each usDots.filter((d) => d.type === "subjunctiveNever") as dot (dot.id)}
			{@const knowItWellDot = usDots.find(
				(d) =>
					d.jurisdiction === dot.jurisdiction &&
					d.type === "subjunctiveKnowitwell"
			)}
			{@const dx = $xGet(knowItWellDot) - $xGet(dot)}
			{@const dy = $yGet(knowItWellDot) - $yGet(dot)}
			{@const angle = (Math.atan2(dy, dx) * 180) / Math.PI}
			{@const length = Math.sqrt(dx * dx + dy * dy)}
			<rect
				x={$xGet(dot)}
				y={$yGet(dot) - 4}
				width={length}
				height="8"
				fill={dot.neverKnowitwellAvggapTtest === "TRUE" ? "#666" : "white"}
				stroke="#666"
				stroke-width="1"
				opacity="0.5"
				transform="rotate({angle} {$xGet(dot)} {$yGet(dot)})"
				transition:fade
			/>
		{/each}

		<!-- Other segments -->
		{#each otherDots.filter((d) => d.type === "subjunctiveNever") as dot (dot.id)}
			{@const knowItWellDot = otherDots.find(
				(d) =>
					d.jurisdiction === dot.jurisdiction &&
					d.type === "subjunctiveKnowitwell"
			)}
			{@const dx = $xGet(knowItWellDot) - $xGet(dot)}
			{@const dy = $yGet(knowItWellDot) - $yGet(dot)}
			{@const angle = (Math.atan2(dy, dx) * 180) / Math.PI}
			{@const length = Math.sqrt(dx * dx + dy * dy)}
			<rect
				x={$xGet(dot)}
				y={$yGet(dot) - 4}
				width={length}
				height="8"
				fill={dot.neverKnowitwellAvggapTtest === "TRUE" ? "#666" : "white"}
				stroke="#666"
				stroke-width="1"
				opacity="0.5"
				transform="rotate({angle} {$xGet(dot)} {$yGet(dot)})"
				transition:fade
			/>
		{/each}
	{/if}

	<!-- Finally draw circles -->
	{#if showUS && usDots}
		{#each usDots as dot (dot.id)}
			{#if ((step === 6 || step === 7 || step === 8 || step === 9) && dot.type !== "mathAverage") || (step !== 6 && step !== 7 && step !== 8 && step !== 9 && (dot.type === "mathAverage" || (showSecondaryDots && (dot.type === "subjunctiveNever" || dot.type === "subjunctiveKnowitwell"))))}
				<circle
					cx={$xGet(dot)}
					cy={$yGet(dot)}
					r="5"
					fill={dot.type === "subjunctiveNever"
						? "#FF9B42"
						: dot.type === "subjunctiveKnowitwell"
							? "#6EB7A1"
							: "#395E76"}
					opacity="1"
					on:mouseover={(e) => handleMouseOver(e, dot)}
					on:mouseout={handleMouseOut}
					transition:fade
				/>
			{/if}
		{/each}
	{/if}

	{#if showOthers}
		{#each otherDots as dot (dot.id)}
			{#if ((step === 6 || step === 7 || step === 8 || step === 9) && dot.type !== "mathAverage") || (step !== 6 && step !== 7 && step !== 8 && step !== 9 && (dot.type === "mathAverage" || (showSecondaryDots && (dot.type === "subjunctiveNever" || dot.type === "subjunctiveKnowitwell"))))}
				<circle
					cx={$xGet(dot)}
					cy={$yGet(dot)}
					r="5"
					fill={dot.type === "subjunctiveNever"
						? "#FF9B42"
						: dot.type === "subjunctiveKnowitwell"
							? "#6EB7A1"
							: "#395E76"}
					opacity="1"
					on:mouseover={(e) => handleMouseOver(e, dot)}
					on:mouseout={handleMouseOut}
					transition:fade
				/>
			{/if}
		{/each}
	{/if}
</g>

{#if (step === 2 || step === 3) && trendLinePoints}
	<line
		x1={trendLinePoints.x1}
		y1={trendLinePoints.y1}
		x2={trendLinePoints.x2}
		y2={trendLinePoints.y2}
		stroke="#FF9B42"
		stroke-width="2"
		stroke-dasharray="4,4"
		opacity="0.6"
	/>
	<rect
		x={trendLinePoints.x1 - 70}
		y={trendLinePoints.y1 - 35}
		width="72"
		height="22"
		fill="#FF9B42"
		opacity="0.8"
		rx="4"
	/>
	<text
		x={trendLinePoints.x1 - 60}
		y={trendLinePoints.y1 - 20}
		fill="#666"
		font-size="14px"
		font-weight="bold"
	>
		r = {step === 3 ? "-0.44" : "-0.47"}
	</text>
{/if}

{#if hoveredData}
	<g
		transform={`translate(${$xGet(hoveredData) + 15}, ${$yGet(hoveredData) - 15})`}
	>
		<foreignObject width="200" height="120">
			<div class="tooltip">
				<p><strong>{hoveredData.jurisdiction}</strong></p>
				<p>Math Score: {hoveredData.x.toFixed(0)}</p>
				<!-- {#if step !== 4 && step !== 5} -->
				<p>Overclaimers: {hoveredData.y.toFixed(1)}%</p>
				<!-- {/if} -->
			</div>
		</foreignObject>
	</g>
{/if}

<style>
	.scatter-group circle {
		transition: all 0.3s;
		cursor: pointer;
	}

	.scatter-group circle.hovered {
		transition: all 0.3s;
	}

	.tooltip {
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px;
		font-size: 12px;
		pointer-events: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: absolute;
		white-space: normal;
		width: 190px;
		min-height: 90px;
	}

	.tooltip p {
		margin: 0 0 6px 0;
		line-height: 1.4;
	}

	.tooltip p:last-child {
		margin-bottom: 0;
	}

	.legend text {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}
</style>
