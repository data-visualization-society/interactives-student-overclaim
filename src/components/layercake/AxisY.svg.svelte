<script>
	import { getContext } from "svelte";

	const { padding, xRange, yScale, height } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = false;
	export let xTick = -8;
	export let yTick = 0;
	export let formatTick = (d) => d;
	export let ticks = undefined;
	export let label = "";

	// Define tickVals before using it
	$: tickVals = Array.isArray(ticks)
		? ticks
		: typeof ticks === "function"
			? ticks($yScale.ticks())
			: $yScale.ticks(ticks);
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
	{#each tickVals as tick}
		<g
			class="tick tick-{tick}"
			transform="translate({$xRange[0]}, {$yScale(tick)})"
		>
			{#if gridlines !== false}
				<line
					class="gridline"
					x1={$padding.left}
					x2="100%"
					y1={yTick}
					y2={yTick}
				/>
			{/if}
			<text x={110} y={yTick} text-anchor="end" dominant-baseline="middle"
				>{formatTick(tick)}</text
			>
		</g>
	{/each}

	<!-- Updated axis label position -->
	{#if label}
		<text
			class="axis-label"
			transform="rotate(-90)"
			x={-$height / 2}
			y={-$padding.left + 30}
			text-anchor="middle">{label}</text
		>
	{/if}
</g>

<style>
	.axis-label {
		font-size: 14px;
		fill: var(--color-gray-700);
	}

	.tick text {
		fill: var(--color-gray-700);
		font-size: 12px;
	}

	.tick line {
		stroke: var(--color-gray-300);
		stroke-dasharray: 2, 2;
	}
</style>
