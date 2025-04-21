<script>
	// Add any necessary imports or props here
</script>

<div class="scrolly-section">
	<div class="pisa-content callout-box">
		<h2 class="section-title">
			Comparing PISA questionnaires for the Czech Republic
		</h2>

		<div class="tables-grid">
			<div class="table-container">
				<div class="year-badge">2012</div>
				<p class="table-title">
					Přečti si následující seznam matematických pojmů a uveď, do jaké míry
					je znáš?
				</p>
				<p class="table-subtitle">
					(V každém řádku zaškrtni pouze jeden čtvereček.)
				</p>

				<!-- Desktop table (will be hidden on mobile) -->
				<table class="desktop-table">
					<thead>
						<tr>
							<th></th>
							<th>Nikdy jsem o tom neslyšel/a</th>
							<th>Slyšel/a jsem o tom jednou nebo dvakrát</th>
							<th>Slyšel/a jsem o tom několikrát</th>
							<th>Slyšel/a jsem o tom často</th>
							<th>Znám to dobře a rozumím tomu</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Konjunktivní měřítko</td>
							{#each Array(5) as _}
								<td class="radio"><input type="radio" disabled /></td>
							{/each}
						</tr>
						<tr>
							<td>Deklarativní zlomek</td>
							{#each Array(5) as _}
								<td class="radio"><input type="radio" disabled /></td>
							{/each}
						</tr>
					</tbody>
				</table>

				<!-- First table mobile version (complete response options) -->
				<table class="mobile-table">
					<thead>
						<tr>
							<th></th>
							<th>Konjunktivní měřítko</th>
							<th>Deklarativní zlomek</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="response-option">Nikdy jsem o tom neslyšel/a</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option"
								>Slyšel/a jsem o tom jednou nebo dvakrát</td
							>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option">Slyšel/a jsem o tom několikrát</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option">Slyšel/a jsem o tom často</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option">Znám to dobře a rozumím tomu</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="table-container">
				<div class="year-badge">2022</div>
				<p class="table-title">
					Zamysli se nad matematickými pojmy: jak dobře znáš následující
					termíny?
				</p>
				<p class="table-subtitle">(V každém řádku vyber jednu odpověď.)</p>

				<!-- Desktop table -->
				<table class="desktop-table">
					<thead>
						<tr>
							<th></th>
							<th>Nikdy jsem se s tím nesetkal/a</th>
							<th>Jednou nebo dvakrát jsem se s tím setkal/a</th>
							<th>Několikrát jsem se s tím setkal/a</th>
							<th>Setkávám se s tím často</th>
							<th>Tento pojem dobře znám a rozumím mu</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Konjunktivní měření</td>
							{#each Array(5) as _}
								<td class="radio"><input type="radio" disabled /></td>
							{/each}
						</tr>
						<tr>
							<td>Určovací zlomek</td>
							{#each Array(5) as _}
								<td class="radio"><input type="radio" disabled /></td>
							{/each}
						</tr>
					</tbody>
				</table>

				<!-- Mobile table -->
				<table class="mobile-table">
					<thead>
						<tr>
							<th></th>
							<th>Konjunktivní měření</th>
							<th>Určovací zlomek</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="response-option">Nikdy jsem se s tím nesetkal/a</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option"
								>Jednou nebo dvakrát jsem se s tím setkal/a</td
							>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option">Několikrát jsem se s tím setkal/a</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option">Setkávám se s tím často</td>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
						<tr>
							<td class="response-option"
								>Tento pojem dobře znám a rozumím mu</td
							>
							<td class="radio"><input type="radio" disabled /></td>
							<td class="radio"><input type="radio" disabled /></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<p class="source-note">
			Sources: PISA 2012 questionnaire from ČŠI (Czech School Inspectorate) at <a
				href="https://www.csicr.cz/cz/Mezinarodni-setreni/PISA/Datove-soubory-a-dotazniky/PISA-2012"
				target="_blank">csicr.cz</a
			>; PISA 2022 questionnaire from
			<a
				href="https://www.oecd.org/en/data/datasets/pisa-2022-database.html#questionnaires"
				target="_blank">OECD PISA 2022 Database</a
			>
		</p>
	</div>
</div>

<style>
	.scrolly-section {
		width: 100vw;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		padding: 2rem 0;
	}

	.pisa-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.callout-box {
		background-color: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.tables-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.table-container {
		background: white;
		border-radius: 6px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		position: relative;
	}

	.year-badge {
		position: absolute;
		top: -12px;
		left: 1.5rem;
		background: var(--color-primary);
		color: white;
		padding: 4px 12px;
		border-radius: 12px;
		font-weight: 900;
		font-size: 0.9rem;
	}

	.table-title {
		font-size: 1.1rem;
		font-weight: 900;
		margin: 1rem 0 0.5rem;
	}

	.table-subtitle {
		font-size: 0.9rem;
		font-style: italic;
		margin-bottom: 1rem;
		color: #666;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 0;
		font-size: 0.9rem;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 0.75rem;
		text-align: left;
		vertical-align: top;
	}

	th {
		background-color: #f5f5f5;
		font-weight: 600;
	}

	.radio {
		width: 15%;
		text-align: center;
	}

	/* Responsive layout */
	@media (max-width: 1024px) {
		.tables-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.pisa-content {
			padding: 0 1rem;
		}
	}

	/* Additional mobile optimizations */
	@media (max-width: 480px) {
		.table-container {
			padding: 1rem;
		}

		.table-title {
			font-size: 1rem;
		}

		.table-subtitle {
			font-size: 0.8rem;
		}
	}

	.section-title {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 1.2rem;
		font-weight: 900;
		color: var(--color-text);
	}

	.source-note {
		text-align: right;
		font-size: 0.8rem;
		color: #666;
		margin-top: 1rem;
		font-style: italic;
	}

	@media (max-width: 480px) {
		.section-title {
			font-size: 1.2rem;
			margin-bottom: 1.5rem;
		}
	}

	/* Update the styles */
	.desktop-table {
		width: 100%;
		border-collapse: collapse;
	}

	.mobile-table {
		display: none;
		width: 100%;
		border-collapse: collapse;
	}

	@media (max-width: 768px) {
		.desktop-table {
			display: none;
		}

		.mobile-table {
			display: table;
		}

		.tables-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.table-container {
			padding: 1rem;
			font-size: 0.85rem;
		}

		.table-title {
			font-size: 0.95rem;
			margin-top: 1.5rem;
		}

		.table-subtitle {
			font-size: 0.8rem;
		}

		th,
		td {
			padding: 0.5rem;
			font-size: 0.85rem;
			line-height: 1.3;
		}

		.response-option {
			font-size: 0.8rem;
			line-height: 1.2;
			padding: 0.5rem;
			background-color: #f8f9fa;
		}

		.radio {
			text-align: center;
			width: 25%;
		}

		/* Improve spacing between tables */
		.table-container + .table-container {
			margin-top: 2rem;
			padding-top: 2rem;
			border-top: 1px solid #eee;
		}

		/* Make the year badge stick to the container better */
		.year-badge {
			top: -10px;
			left: 50%;
			transform: translateX(-50%);
		}

		/* Add horizontal scroll indicator if needed */
		.table-container {
			position: relative;
		}

		/* Optional: Add subtle zebra striping for better readability */
		.mobile-table tbody tr:nth-child(odd) {
			background-color: #fafafa;
		}

		.mobile-table .response-option {
			padding: 0.6rem 0.5rem;
			line-height: 1.3;
		}

		/* Add more breathing room between rows */
		.mobile-table tr {
			border-bottom: 1px solid #eee;
		}

		.mobile-table tr:last-child {
			border-bottom: none;
		}
	}

	/* Even smaller screens */
	@media (max-width: 480px) {
		.table-container {
			padding: 0.75rem;
			font-size: 0.8rem;
		}

		th,
		td {
			padding: 0.4rem;
			font-size: 0.8rem;
		}

		.response-option {
			font-size: 0.75rem;
		}
	}
</style>
