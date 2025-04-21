<script>
	import { getContext } from "svelte";
	const data = getContext("data");

	let selectedJurisdiction = "";
	let searchTerm = "";
	let isOpen = false;
	let dropdownRef;

	// Debug log
	// console.log("Component data:", data);

	// Get unique jurisdictions for dropdown
	$: jurisdictions = data?.languageData
		? [
				...new Set(
					data.languageData
						.filter((d) => d.jurisdiction)
						.map((d) => d.jurisdiction)
				)
			].sort()
		: [];

	// Filter jurisdictions based on search
	$: filteredJurisdictions = jurisdictions.filter((j) =>
		j.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Filter data for selected jurisdiction
	$: filteredData =
		data?.languageData?.filter(
			(d) => d.jurisdiction === selectedJurisdiction
		) || [];

	// Create summary text
	$: summaryText = selectedJurisdiction
		? `${selectedJurisdiction} administered the PISA 2022 student question in ${filteredData.length} ${filteredData.length === 1 ? "language" : "languages"}: ${filteredData.map((d) => d.language).join(", ")}.`
		: "Select a jurisdiction to see language details.";

	// Handle click outside to close dropdown
	function handleClickOutside(event) {
		if (dropdownRef && !dropdownRef.contains(event.target)) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-table-wrapper">
	<section class="language-section callout-box">
		<div class="section-intro">
			<p class="table-title">Language Variations Across Education Systems</p>
			<p class="instruction">
				Select an education system from the dropdown menu below to explore how
				the fake concepts "Subjunctive Scaling" and "Declarative Fraction" were
				translated in different languages for the PISA 2022 assessment.
			</p>
		</div>

		<div class="dropdown-wrapper">
			<label for="jurisdiction-select">
				Select an education system:
				<span class="bounce-arrow">⬇</span>
			</label>
			<div class="dropdown-container" bind:this={dropdownRef}>
				<div class="custom-select">
					<button
						id="jurisdiction-select"
						class="select-button"
						on:click={() => (isOpen = !isOpen)}
						aria-expanded={isOpen}
						aria-haspopup="listbox"
					>
						{selectedJurisdiction || "Select a jurisdiction..."}
						<span class="arrow">{isOpen ? "▲" : "▼"}</span>
					</button>

					{#if isOpen}
						<div class="dropdown-menu" role="listbox">
							<div class="search-wrapper">
								<input
									type="text"
									placeholder="Type to search jurisdictions..."
									bind:value={searchTerm}
									on:click={(e) => e.stopPropagation()}
									aria-label="Search jurisdictions"
								/>
							</div>
							<div class="options-container">
								{#each filteredJurisdictions as jurisdiction}
									<div
										class="option"
										class:selected={jurisdiction === selectedJurisdiction}
										role="option"
										aria-selected={jurisdiction === selectedJurisdiction}
										on:click={() => {
											selectedJurisdiction = jurisdiction;
											isOpen = false;
											searchTerm = "";
										}}
									>
										{jurisdiction}
									</div>
								{/each}
								{#if filteredJurisdictions.length === 0}
									<div class="no-results">No matching jurisdictions found</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		{#if selectedJurisdiction}
			<div class="content-wrapper">
				<p class="summary">{summaryText}</p>
				<div class="table-container">
					<table>
						<thead>
							<tr>
								<th>Language</th>
								<th>Language code</th>
								<th>Subjunctive Scaling</th>
								<th>Declarative fraction</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredData as row}
								<tr>
									<td data-label="Language">{row.language}</td>
									<td data-label="Language code">{row.languageCode}</td>
									<td data-label="Subjunctive Scaling"
										>{row.subjunctiveScaling}</td
									>
									<td data-label="Declarative fraction"
										>{row.declarativeFraction}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
					<div class="source-note">
						Sources: <a
							href="https://www.oecd.org/en/data/datasets/pisa-2022-database.html#questionnaires"
							target="_blank">OECD PISA 2022 Database</a
						>
					</div>
				</div>
			</div>
		{/if}
	</section>
</div>

<style>
	.language-table-wrapper {
		margin: 0;
		padding: 0;
	}

	.callout-box {
		background-color: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.language-section {
		margin: 0;
		max-width: 1200px;
	}

	.table-title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	.section-intro {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.instruction {
		color: #666;
		line-height: 1.5;
		margin-bottom: 1.5rem;
	}

	.dropdown-wrapper {
		margin-bottom: 2rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.dropdown-container {
		position: relative;
		width: 300px;
	}

	.custom-select {
		position: relative;
	}

	.select-button {
		width: 100%;
		padding: 0.75rem 1rem;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		text-align: left;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.arrow {
		margin-left: 10px;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		margin-top: 4px;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.search-wrapper {
		width: 100%;
		padding: 8px;
		border-bottom: 1px solid #ddd;
		background: #f5f5f5;
		box-sizing: border-box;
	}

	.search-wrapper input {
		width: 100%;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9rem;
		box-sizing: border-box;
	}

	.options-container {
		max-height: 250px;
		overflow-y: auto;
		scrollbar-width: thin;
		width: 100%;
		padding: 4px 0;
	}

	.options-container::-webkit-scrollbar {
		width: 6px;
	}

	.options-container::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 3px;
	}

	.no-results {
		padding: 1rem;
		text-align: center;
		color: #666;
	}

	.summary {
		margin: 1rem 0;
		font-size: 1.1rem;
		line-height: 1.4;
	}

	.table-container {
		overflow-x: auto;
		margin-top: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 0;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border: 1px solid #ddd;
	}

	th {
		background-color: #f5f5f5;
		font-weight: bold;
	}

	tr:nth-child(even) {
		background-color: #fafafa;
	}

	.option {
		padding: 8px 16px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.option:hover {
		background-color: #f0f0f0;
	}

	.option.selected {
		background-color: #e0e0e0;
	}

	.option.selected:hover {
		background-color: #d8d8d8;
	}

	.summary:last-child {
		margin-bottom: 0;
	}

	tr:last-child td {
		padding-bottom: 0.75rem;
	}

	.content-wrapper {
		margin-bottom: 0;
	}

	.table-container {
		overflow-x: auto;
		margin-top: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 0;
	}

	/* Remove bottom margin from the last element */
	.content-wrapper:last-child,
	.table-container:last-child,
	table:last-child,
	tr:last-child td {
		margin-bottom: 0;
	}

	/* Ensure no bottom margins on any last children */
	:global(.language-section > *:last-child) {
		margin-bottom: 0;
	}

	.bounce-arrow {
		display: inline-block;
		margin-left: 8px;
		font-size: 1.4em;
		animation: bounce 2s infinite;
		opacity: 0.8;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-8px);
		}
		60% {
			transform: translateY(-4px);
		}
	}

	.source-note {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: #666;
	}

	.source-note a {
		color: inherit;
		text-decoration: underline;
	}

	.source-note a:hover {
		text-decoration: none;
	}

	/* Add media query for mobile devices */
	@media (max-width: 768px) {
		table {
			/* Remove standard table display */
			display: block;
		}

		thead {
			display: none; /* Hide the header row */
		}

		tbody {
			display: block;
		}

		tr {
			display: block;
			margin-bottom: 1rem;
			border: 1px solid #ddd;
			background: white;
		}

		td {
			/* Make cells full width and stack them */
			display: block;
			text-align: left;
			padding: 0.5rem;
			border: none;
			border-bottom: 1px solid #eee;
		}

		/* Add labels before each cell */
		td:before {
			content: attr(data-label);
			font-weight: bold;
			display: block;
			margin-bottom: 0.3rem;
			color: #666;
		}

		/* Remove border from last cell in each row */
		td:last-child {
			border-bottom: none;
		}

		/* Adjust other mobile-specific styles */
		.dropdown-container {
			width: 100%;
		}

		.instruction {
			font-size: 0.9rem;
		}

		.summary {
			font-size: 1rem;
		}

		.callout-box {
			padding: 1rem;
			border-radius: 4px;
		}

		.table-title {
			font-size: 1.1rem;
		}

		.content-wrapper {
			margin: 0;
		}
	}
</style>
