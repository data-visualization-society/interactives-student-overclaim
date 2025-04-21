<script>
	export let colorScale;
	export let width = 400;
	export let height = 50;

	const values = [-15, -10, -5, 0, 5, 10, 15];
	$: rectWidth = width / values.length;
</script>

<g>
	<!-- Main scale -->
	<g>
		{#each values as value, i}
			<rect
				x={i * rectWidth}
				y={0}
				width={rectWidth}
				height={10}
				fill={colorScale(value)}
			/>
			<text
				x={i * rectWidth + rectWidth / 2}
				y={25}
				text-anchor="middle"
				font-size="12px"
				font-family="var(--sans)"
				fill="var(--color-gray-700)"
			>
				{value}
			</text>
		{/each}
	</g>

	<!-- No data category -->
	<g transform="translate(0, 30)">
		<rect width={rectWidth} height={10} fill="#ccc" />
		<text
			x={rectWidth / 2}
			y={25}
			text-anchor="middle"
			font-size="12px"
			font-family="var(--sans)"
			fill="var(--color-gray-700)"
		>
			No data
		</text>
	</g>
</g>
