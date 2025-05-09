<script>
	import { getContext } from "svelte";
	const { width, height, xScale, yScale } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = false;
	export let baseline = false;
	export let snapTicks = false;
	export let yTick = 16;
	export let formatTick = (d) => d;
	export let ticks = undefined;
	export let label = "";
	/** If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */

	$: tickVals = Array.isArray(ticks)
		? ticks
		: typeof ticks === "function"
			? ticks($xScale.ticks())
			: $xScale.ticks(ticks);

	$: yPosition = $height; // Position at the bottom of the chart

	const textAnchor = (i) => {
		if (snapTicks === true) {
			if (i === 0) {
				return "start";
			}
			if (i === tickVals.length - 1) {
				return "end";
			}
		}
		return "middle";
	};
</script>

<g class="axis x-axis" class:snapTicks>
	{#each tickVals as tick, i}
		<g class="tick tick-{i}" transform="translate({$xScale(tick)},{yPosition})">
			{#if gridlines !== false}
				<line class="gridline" y1={$height * -1} y2="0" x1="0" x2="0" />
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" y1={0} y2={6} x1={0} x2={0} />
			{/if}
			<text x={0} y={yTick} dx="" dy="" text-anchor={textAnchor(i)}
				>{formatTick(tick)}</text
			>
		</g>
	{/each}
	{#if baseline === true}
		<line class="baseline" y1={yPosition} y2={yPosition} x1="0" x2={$width} />
	{/if}
	{#if label}
		<text
			class="axis-label"
			x={$width / 2}
			y={$height + 45}
			text-anchor="middle">{label}</text
		>
	{/if}
</g>

<style>
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	line,
	.tick line {
		stroke: var(--color-gray-300);
		stroke-dasharray: 2;
	}

	.tick text {
		fill: var(--color-gray-600);
	}

	.tick .tick-mark,
	.baseline {
		stroke-dasharray: 0;
	}

	/* This looks slightly better */
	.axis.snapTicks .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapTicks .tick.tick-0 text {
		transform: translateX(-3px);
	}

	.axis-label {
		font-size: 14px;
		fill: var(--color-gray-700);
	}
</style>
