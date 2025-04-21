<script>
	import SortTable from "$components/helpers/SortTable.svelte";

	const columns = [
		{ label: "Education System", prop: "system", sort: true, type: "text" },
		{
			label: 'Subjunctive Scaling (% change to "Know it Well")',
			prop: "subjunctive",
			sort: true,
			type: "number"
		},
		{
			label: 'Declarative Fraction (% change to "Know it Well")',
			prop: "declarative",
			sort: true,
			type: "number"
		}
	];

	const rows = [
		{
			system: "Australia",
			subjunctive: 1,
			declarative: 4
		},
		{
			system: "Ireland",
			subjunctive: 1,
			declarative: 0
		},
		{
			system: "New Zealand",
			subjunctive: 1,
			declarative: 2
		},
		{
			system: "Singapore",
			subjunctive: 2,
			declarative: 1
		},
		{
			system: "United Kingdom",
			subjunctive: 1,
			declarative: 1
		},
		{
			system: "United States",
			subjunctive: 1,
			declarative: 0
		}
	];
</script>

<section id="overclaiming-table">
	<p class="table-title">
		Changes in percentage of overclaimers from 2012 to 2022 among education
		systems that administered PISA in English
	</p>
	<SortTable {rows} {columns} />
</section>

<style>
	.table-title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	:global(#overclaiming-table table) {
		width: 100%;
		table-layout: fixed;
	}

	:global(#overclaiming-table td, #overclaiming-table th) {
		padding: 4px 8px !important;
	}

	/* Column width distribution */
	:global(#overclaiming-table th:nth-child(1)) {
		width: 25%; /* Education System */
	}
	:global(#overclaiming-table th:nth-child(2)) {
		width: 37.5%; /* Subjunctive Scaling */
	}
	:global(#overclaiming-table th:nth-child(3)) {
		width: 37.5%; /* Declarative Fraction */
	}
</style>
