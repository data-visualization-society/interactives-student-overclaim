<script>
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";
	const { width, height } = getContext("LayerCake");

	export let projection;
	export let highlights = [];
	export let active = false;
	export let valueById;
	export let step = 0;

	// Function to get emoji flag
	function getCountryFlag(iso) {
		if (!iso) return "";
		return `<img 
			src="https://flagcdn.com/16x12/${iso.toLowerCase()}.png"
			srcset="https://flagcdn.com/32x24/${iso.toLowerCase()}.png 2x"
			width="16" 
			height="12"
			alt="${iso}"
			class="flag-icon">`;
	}

	// Define tooltip positions relative to circles
	const tooltipPositions = [
		{ dx: 50, dy: -0, linePoints: [50, 20] }, // Qatar
		{ dx: -250, dy: -50, linePoints: [-80, -50] }, // Jordan
		{ dx: -250, dy: -50, linePoints: [-80, -50] }, // Czech Republic - to the left
		{ dx: 50, dy: -50, linePoints: [50, 0] } // Albania - to the right
	];

	$: circles = highlights.map((h) => ({
		...h,
		coords: projection([h.lon, h.lat]),
		data: valueById?.get(h.iso3)
	}));
</script>

{#if active}
	<g>
		{#each circles.filter((_, i) => (step === 1 && i < 2) || (step === 3 && i >= 2)) as circle, i}
			<g
				transform="translate({circle.coords[0]}, {circle.coords[1]})"
				in:fade={{ duration: 500 }}
				out:fade={{ duration: 500 }}
			>
				<!-- Outer ring -->
				<circle
					r="30"
					fill="none"
					stroke="#FF9E00"
					stroke-width="2"
					opacity="0.6"
				/>
				<!-- Inner ring -->
				<circle r="10" fill="#FF9E00" opacity="0.3" />

				<!-- Connection line -->
				<line
					x1="0"
					y1="0"
					x2={tooltipPositions[step === 1 ? i : i + 2].linePoints[0]}
					y2={tooltipPositions[step === 1 ? i : i + 2].linePoints[1]}
					stroke="#666"
					stroke-width="1"
					stroke-dasharray="2,2"
					opacity="0.6"
				/>

				<!-- Permanent tooltip -->
				{#if circle.data}
					<foreignObject
						x={tooltipPositions[step === 1 ? i : i + 2].dx}
						y={tooltipPositions[step === 1 ? i : i + 2].dy}
						width="200"
						height="120"
					>
						<div class="permanent-tooltip">
							<div class="header">
								{@html getCountryFlag(circle.data.iso)}
								<span>{circle.country}</span>
							</div>
							<div class="content">
								<div class="row">
									<span>2012:</span>
									<span>{(circle.data.pct2012 ?? 0).toFixed(1)}%</span>
								</div>
								<div class="row">
									<span>2022:</span>
									<span>{(circle.data.pct2022 ?? 0).toFixed(1)}%</span>
								</div>
								<div class="row change">
									<span>Change:</span>
									<span
										style="color: {(circle.data.change ?? 0) > 0
											? '#1a9850'
											: '#d73027'}"
									>
										{(circle.data.change ?? 0).toFixed(1)}%
									</span>
								</div>
							</div>
						</div>
					</foreignObject>
				{/if}
			</g>
		{/each}
	</g>
{/if}

<style>
	.permanent-tooltip {
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px;
		font-size: 14px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		min-width: 200px;
		max-width: 200px;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
		font-weight: bold;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}

	.change {
		margin-top: 4px;
		padding-top: 4px;
		border-top: 1px solid #eee;
		font-weight: bold;
	}

	.flag {
		font-size: 1.2em;
		line-height: 1;
	}
</style>
