<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { geoPath, geoNaturalEarth1 } from "d3-geo";
	import Legend from "./Legend.svelte";
	import Tooltip from "./Tooltip.svelte";
	import MapHighlight from "./MapHighlight.svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	const { data, width, height } = getContext("LayerCake");

	export let world;
	export let colorScale;
	export let step = 0;

	let tooltipData = {};
	let tooltipX = 0;
	let tooltipY = 0;
	let tooltipVisible = false;

	const dispatch = createEventDispatcher();

	// Define regions for different zoom levels
	const regions = {
		world: {
			scale: 1,
			center: [0, 0]
		},
		middleEast: {
			scale: 4,
			center: [51, 25]
		},
		eastEurope: {
			scale: 3,
			center: [20, 45]
		}
	};

	// Define highlights
	const highlights = [
		{ country: "Qatar", lat: 25.3548, lon: 51.1839, iso3: "QAT" },
		{ country: "Jordan", lat: 30.5852, lon: 36.2384, iso3: "JOR" },
		{ country: "Czech Republic", lat: 49.8175, lon: 15.473, iso3: "CZE" },
		{ country: "Albania", lat: 41.1533, lon: 20.1683, iso3: "ALB" }
	];

	$: currentRegion =
		step === 1
			? regions.middleEast
			: step === 3
				? regions.eastEurope
				: regions.world;

	// Calculate vertical offset based on width
	$: verticalOffset = Math.min(120, Math.max(40, $width * 0.1));

	$: baseProjection = geoNaturalEarth1()
		.fitSize([$width, $height - 80], world)
		.translate([$width / 2, ($height - 80) / 2 + verticalOffset]);

	// Create tweened values for zoom and center
	const zoomLevel = tweened(1, {
		duration: 1000,
		easing: cubicOut
	});
	const centerPoint = tweened([0, 0], {
		duration: 1000,
		easing: cubicOut
	});

	// Update tweened values when step changes
	$: {
		zoomLevel.set(currentRegion.scale);
		centerPoint.set(currentRegion.center);
	}

	// Use tweened values in projection
	$: projection = geoNaturalEarth1()
		.fitSize([$width, $height - 80], world)
		.translate([$width / 2, ($height - 80) / 2 + verticalOffset])
		.scale(baseProjection.scale() * $zoomLevel)
		.center($centerPoint);

	$: pathGenerator = geoPath().projection(projection);

	$: valueById = new Map(
		$data.map((d) => [
			step >= 2 ? d.Jurisdiction_iso_d : d.Jurisdiction_iso_s,
			{
				change:
					step >= 2
						? d.knowitwell_pct_2022_2012_d
						: d.knowitwell_pct_2022_2012_s,
				pct2012: step >= 2 ? d.knowitwell_pct_2012_d : d.knowitwell_pct_2012_s,
				pct2022: step >= 2 ? d.knowitwell_pct_d : d.knowitwell_pct_s,
				country: step >= 2 ? d.Jurisdiction_d : d.Jurisdiction_s,
				iso: step >= 2 ? d.Jurisdiction_iso2_d : d.Jurisdiction_iso2_s
			}
		])
	);

	function handleMouseover(event, feature) {
		const data = valueById.get(feature.properties.iso_a3);
		if (data) {
			tooltipData = {
				...data
			};
			tooltipX = event.clientX;
			tooltipY = event.clientY;
			tooltipVisible = true;

			dispatch("mousemove", {
				e: event,
				props: tooltipData
			});
		}
	}

	function handleMouseout() {
		tooltipVisible = false;
		dispatch("mouseout");
	}

	function handleMousemove(event) {
		if (!event?.target) return;

		try {
			const feature = event.target.__data__;
			if (!feature?.properties?.iso_a3) return;

			const data = valueById.get(feature.properties.iso_a3);
			if (data) {
				tooltipData = {
					...data
				};
				tooltipX = event.clientX;
				tooltipY = event.clientY;
				tooltipVisible = true;

				dispatch("mousemove", {
					e: event,
					props: tooltipData
				});
			}
		} catch (error) {
			console.debug("Error in handleMousemove:", error);
		}
	}
</script>

<!-- Title and Legend Container -->
<g
	transform="translate({Math.min(5, $width * 0.1)}, {Math.min(
		30,
		$width * 0.1
	)})"
>
	<!-- Simplified title -->
	<text
		font-family="var(--sans)"
		font-size="{Math.max(12, Math.min(16, $width * 0.02))}px"
		fill="var(--color-gray-700)"
		font-weight="bold"
	>
		<tspan x="0" y="0"
			>Changes in percentage of overclaimers from 2012 to 2022
		</tspan>
		<tspan
			x="0"
			y={Math.max(20, Math.min(30, $width * 0.04))}
			text-decoration="underline"
			font-style="italic"
		>
			{step <= 1 ? '"Subjunctive Scaling"' : '"Declarative Fraction"'}
		</tspan>
	</text>

	<!-- Legend with responsive positioning -->
	<g transform="translate(0, {Math.max(35, Math.min(50, $width * 0.06))})">
		<Legend {colorScale} width={Math.min(400, Math.max(150, $width * 0.4))} />
	</g>
</g>

<!-- Map -->
<g class="map-features">
	{#each world.features as feature}
		{@const value = valueById.get(feature.properties.iso_a3)?.change}
		<path
			d={pathGenerator(feature)}
			fill={value !== undefined ? colorScale(value) : "#ccc"}
			stroke="#fff"
			stroke-width="0.5"
			on:mouseover={(e) => handleMouseover(e, feature)}
			on:mouseout={handleMouseout}
			on:mousemove={handleMousemove}
		/>
	{/each}
</g>

<!-- Add highlights after the map features -->
{#if $width >= 480}
	<MapHighlight
		{projection}
		{highlights}
		{valueById}
		active={step === 1 || step === 3}
		{step}
	/>
{/if}

<!-- Tooltip -->
<Tooltip
	x={tooltipX}
	y={tooltipY}
	visible={tooltipVisible}
	data={tooltipData}
/>

<style>
	path {
		transition: fill 0.3s;
	}
	path:hover {
		opacity: 0.8;
	}
</style>
