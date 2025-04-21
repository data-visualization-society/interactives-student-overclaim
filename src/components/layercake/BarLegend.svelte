<script>
	import { hoveredSegment } from "../../stores/legendStore";
	export let step = 0;

	const legendItems = [
		{ label: "Never heard of it", color: "#666" },
		{ label: "Heard of it once or twice", color: "#9DB2BE" },
		{ label: "Heard of it a few times", color: "#7B96A6" },
		{ label: "Heard of it often", color: "#5A7A8E" },
		{ label: "Know it well, understand the concept", color: "#395E76" }
	];

	$: visibleItems =
		step === 0
			? [legendItems[0]]
			: step === 1
				? legendItems.map((item, i) => ({
						...item,
						color: i === 0 ? "#666" : "#ffffff",
						needsBorder: i !== 0
					}))
				: legendItems;

	function handleMouseEnter(item) {
		if (step >= 2) {
			hoveredSegment.set(item.color);
		}
	}

	function handleMouseLeave() {
		if (step >= 2) {
			hoveredSegment.set(null);
		}
	}
</script>

<div class="legend">
	{#each visibleItems as item}
		<div
			class="legend-item"
			on:mouseenter={() => handleMouseEnter(item)}
			on:mouseleave={handleMouseLeave}
		>
			<div
				class="color-box"
				style:background-color={item.color}
				class:needs-border={item.needsBorder}
			/>
			<span class="label">{item.label}</span>
		</div>
	{/each}
</div>

<style>
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: pointer;
	}

	.color-box {
		width: 16px;
		height: 16px;
	}

	.color-box.needs-border {
		border: 1px solid #666;
	}

	.label {
		font-size: 12px;
		color: var(--color-gray-700);
	}
</style>
