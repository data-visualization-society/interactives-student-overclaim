<script>
	import DemoLink from "$components/demo/Demo.Link.svelte";
	import DemoImg from "$components/demo/Demo.Img.svelte";
	import DemoButtonSet from "$components/demo/Demo.ButtonSet.svelte";
	import DemoRange from "$components/demo/Demo.Range.svelte";
	import DemoSelect from "$components/demo/Demo.Select.svelte";
	import DemoToggle from "$components/demo/Demo.Toggle.svelte";
	import DemoSortTable from "$components/demo/Demo.SortTable.svelte";
	import DemoSvelteElement from "$components/demo/Demo.SvelteElement.svelte";
	import DemoSvelteComponent from "$components/demo/Demo.SvelteComponent.svelte";
	import DemoMicroCMS from "$components/demo/Demo.MicroCMS.svelte";
	import DemoFigure from "$components/demo/Demo.Figure.svelte";
	import DemoTip from "$components/demo/Demo.Tip.svelte";
	// import DemoScrolly from "$components/demo/Demo.Scrolly.svelte";
</script>

<div id="demo">
	<h1>Demo</h1>
	<DemoLink />
	<DemoImg />
	<DemoSvelteElement />
	<DemoSvelteComponent />
	<DemoMicroCMS />
	<DemoTip />
	<DemoFigure />
	<DemoButtonSet />
	<DemoRange />
	<DemoSelect />
	<DemoToggle />
	<DemoSortTable />
	<!-- <DemoScrolly /> -->
</div>

<style>
	#demo {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#demo section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#demo section > section) {
		margin: 0 auto;
		padding-top: 0;
	}

	:global(#demo h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
