<script>
	import { getContext } from "svelte";
	import { hoveredSegment } from "../../stores/legendStore";
	const { data, xScale, yScale, width } = getContext("LayerCake");
	export let step = 0;

	let tooltipData = null;
	let tooltipX = 0;
	let tooltipY = 0;
	const tooltipWidth = 200;

	// Map color to category name
	const categoryMap = {
		"#666": "Never heard of it",
		"#9DB2BE": "Heard of it once or twice",
		"#7B96A6": "Heard of it a few times",
		"#5A7A8E": "Heard of it often",
		"#395E76": "Know it well, understand the concept",
		"#ffffff": "Heard of it" // For step 1
	};

	$: opacity = (barColor) => {
		if (step < 2) return 1;
		return !$hoveredSegment || $hoveredSegment === barColor ? 1 : 0.3;
	};

	// Create a key for forcing re-render
	$: renderKey = `${step}-${$data?.length}`;

	function handleMouseMove(event, bar) {
		// Don't show tooltip for step 0 or white category in step 1
		if (step === 0 || (step === 1 && bar.color === "#ffffff")) {
			tooltipData = null;
			return;
		}

		// Calculate the center of the segment using the scales
		const segmentX = $xScale(bar.x0 + bar.value / 2);
		const segmentY = $yScale(bar.jurisdiction);

		const padding = 20;
		const isNearRightEdge = segmentX + tooltipWidth / 2 > $width - padding;

		tooltipData = {
			jurisdiction: bar.jurisdiction,
			category: categoryMap[bar.color],
			value: bar.value.toFixed(0),
			x: segmentX,
			y: segmentY,
			isNearRightEdge
		};
	}

	function handleMouseLeave() {
		tooltipData = null;
	}
</script>

<g class="bars-container">
	{#key renderKey}
		{#if $data && $data.length > 0}
			{#each $data as bar}
				<g>
					{#if !bar.x0}
						<text
							x={$xScale(0) - 10}
							y={$yScale(bar.jurisdiction) + $yScale.bandwidth() / 2}
							text-anchor="end"
							dominant-baseline="middle"
							font-size="12px"
						>
							{bar.jurisdiction}
						</text>
					{/if}
					<rect
						x={$xScale(bar.x0)}
						y={$yScale(bar.jurisdiction)}
						width={$xScale(bar.value + bar.x0) - $xScale(bar.x0)}
						height={$yScale.bandwidth()}
						fill={bar.color}
						opacity={opacity(bar.color)}
						on:mousemove={(e) => handleMouseMove(e, bar)}
						on:mouseleave={handleMouseLeave}
						on:mouseenter={(e) => handleMouseMove(e, bar)}
					/>
				</g>
			{/each}
		{:else}
			<text x="50%" y="50%" text-anchor="middle">No data available</text>
		{/if}
	{/key}
</g>

{#if tooltipData}
	<g>
		<foreignObject
			x={tooltipData.isNearRightEdge
				? tooltipData.x - tooltipWidth
				: tooltipData.x - tooltipWidth / 2}
			y={tooltipData.y - 100}
			width="200"
			height="100"
		>
			<div class="tooltip">
				<div class="tooltip-content">
					<p><strong>{tooltipData.jurisdiction}</strong></p>
					<p>{tooltipData.category}</p>
					<p>{tooltipData.value}%</p>
				</div>
				<div
					class="tooltip-arrow"
					style="left: {tooltipData.isNearRightEdge ? '95%' : '50%'}"
				/>
			</div>
		</foreignObject>
	</g>
{/if}

<style>
	rect {
		cursor: pointer;
	}

	.tooltip {
		position: relative;
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px;
		font-size: 12px;
		pointer-events: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 200px;
	}

	.tooltip-content {
		position: relative;
		z-index: 1;
	}

	.tooltip-arrow {
		position: absolute;
		bottom: -6px;
		transform: translateX(-50%) rotate(45deg);
		width: 10px;
		height: 10px;
		background: white;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}

	.tooltip p {
		margin: 0 0 4px 0;
		line-height: 1.4;
		white-space: nowrap;
	}

	.tooltip p:last-child {
		margin-bottom: 0;
	}
</style>
