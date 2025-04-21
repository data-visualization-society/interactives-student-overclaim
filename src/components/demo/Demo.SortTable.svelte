<script>
	import SortTable from "$components/helpers/SortTable.svelte";

	const columns = [
		{ label: "Education System", prop: "system", sort: true, type: "text" },
		{ label: "UN Region", prop: "region", sort: true, type: "text" },
		{
			label: "Subjunctive Scaling (%)",
			prop: "subjunctive",
			sort: true,
			type: "text"
		},
		{
			label: "Declarative Fraction (%)",
			prop: "declarative",
			sort: true,
			type: "text"
		},
		{ label: "Over 10% on Both", prop: "overTen", sort: true, type: "text" }
	];

	const rows = [
		{
			system: "Bulgaria",
			region: "Eastern Europe",
			subjunctive: "10",
			declarative: "14",
			overTen: "✓"
		},
		{
			system: "Serbia",
			region: "Southern Europe",
			subjunctive: "10",
			declarative: "16",
			overTen: "✓"
		},
		{
			system: "Jordan",
			region: "Western Asia",
			subjunctive: "11",
			declarative: "15",
			overTen: "✓"
		},
		{
			system: "Cyprus",
			region: "Western Asia",
			subjunctive: "11",
			declarative: "16",
			overTen: "✓"
		},
		{
			system: "Colombia",
			region: "South America",
			subjunctive: "12",
			declarative: "13",
			overTen: "✓"
		},
		{
			system: "United Arab Emirates",
			region: "Western Asia",
			subjunctive: "15",
			declarative: "21",
			overTen: "✓"
		},
		{
			system: "Indonesia",
			region: "South-Eastern Asia",
			subjunctive: "16",
			declarative: "less than 10%",
			overTen: ""
		},
		{
			system: "Montenegro, Republic of",
			region: "Southern Europe",
			subjunctive: "16",
			declarative: "17",
			overTen: "✓"
		},
		{
			system: "Albania",
			region: "Southern Europe",
			subjunctive: "18",
			declarative: "19",
			overTen: "✓"
		},
		{
			system: "Qatar",
			region: "Western Asia",
			subjunctive: "21",
			declarative: "31",
			overTen: "✓"
		},
		{
			system: "Kazakhstan",
			region: "Central Asia",
			subjunctive: "27",
			declarative: "24",
			overTen: "✓"
		},
		{
			system: "Poland",
			region: "Eastern Europe",
			subjunctive: "less than 10%",
			declarative: "10",
			overTen: ""
		},
		{
			system: "Macau (China)",
			region: "Eastern Asia",
			subjunctive: "less than 10%",
			declarative: "10",
			overTen: ""
		},
		{
			system: "Thailand",
			region: "South-Eastern Asia",
			subjunctive: "less than 10%",
			declarative: "11",
			overTen: ""
		},
		{
			system: "Romania",
			region: "Eastern Europe",
			subjunctive: "less than 10%",
			declarative: "13",
			overTen: ""
		},
		{
			system: "Peru",
			region: "South America",
			subjunctive: "less than 10%",
			declarative: "13",
			overTen: ""
		},
		{
			system: "Switzerland",
			region: "Western Europe",
			subjunctive: "less than 10%",
			declarative: "13",
			overTen: ""
		},
		{
			system: "Germany",
			region: "Western Europe",
			subjunctive: "less than 10%",
			declarative: "14",
			overTen: ""
		},
		{
			system: "Czech Republic",
			region: "Eastern Europe",
			subjunctive: "less than 10%",
			declarative: "16",
			overTen: ""
		}
	];

	// Add a function to determine if we're in mobile view
	let isMobile = false;

	// Function to update mobile status
	function updateMobileStatus() {
		isMobile = window.innerWidth <= 768;
	}

	// Filter columns for mobile view (remove UN Region)
	$: displayColumns = isMobile
		? columns.filter((col) => col.prop !== "region")
		: columns;
</script>

<svelte:window on:resize={updateMobileStatus} />

<section id="demo-table">
	<p class="table-title">
		PISA 2022 Math Concept Overclaiming by Education System
	</p>
	<SortTable {rows} columns={displayColumns} />
</section>

<style>
	.table-title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	:global(#demo-table table) {
		width: 100%;
		table-layout: fixed;
	}

	:global(#demo-table td, #demo-table th) {
		padding: 4px 8px !important;
		word-wrap: break-word;
		overflow-wrap: break-word;
		hyphens: none;
	}

	/* Desktop view column widths */
	@media (min-width: 769px) {
		:global(#demo-table th:nth-child(1)) {
			width: 25%;
		}
		:global(#demo-table th:nth-child(2)) {
			width: 20%;
		}
		:global(#demo-table th:nth-child(3), #demo-table th:nth-child(4)) {
			width: 18%;
		}
		:global(#demo-table th:nth-child(5)) {
			width: 15%;
		}
	}

	/* Mobile view styles */
	@media (max-width: 768px) {
		.table-title {
			font-size: 1rem;
		}

		:global(#demo-table table) {
			font-size: 0.85rem;
		}

		:global(#demo-table th:nth-child(1)) {
			width: 40%; /* Education System */
		}
		:global(#demo-table th:nth-child(2), #demo-table th:nth-child(3)) {
			width: 22%; /* Percentage columns */
		}
		:global(#demo-table th:nth-child(4)) {
			width: 16%; /* Over 10% column */
		}

		:global(#demo-table td, #demo-table th) {
			padding: 3px 4px !important;
		}
	}

	/* Even smaller screens */
	@media (max-width: 480px) {
		:global(#demo-table table) {
			font-size: 0.75rem;
		}

		:global(#demo-table td, #demo-table th) {
			padding: 2px 3px !important;
		}
	}
</style>
