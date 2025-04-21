<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let fill = "#ccc";
</script>

<g>
	{#each $data as d, i}
		{@const x = $xGet(d)}
		{@const y = $yGet(d)}
		{@const width = $xScale.bandwidth()}
		{@const height = $yScale.range()[0] - y}
		<rect data-id={i} {x} {y} {width} {height} {fill} />
	{/each}
</g>
