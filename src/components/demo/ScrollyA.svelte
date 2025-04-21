<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// Accept scrollContent as a prop
	export let scrollContent;

	// Track which step is currently active
	let value;

	// Data for the math concepts table
	const concepts = [
		"Divisor",
		"Area of a circle",
		"Subjunctive scaling",
		"Congruent figures",
		"Linear equation",
		"Pythagorean theorem",
		"Linear inequalities",
		"Complex number",
		"Exponential function",
		"Probability",
		"Declarative fraction",
		"Three-dimensional geometry"
	];

	// Helper function to determine if a concept should be highlighted based on step
	const isHighlighted = (concept, step) => {
		// No highlight in step 0 (first step)
		if (step === undefined || step === 0) return false;

		// In step 1, highlight all real concepts
		if (step === 1) {
			return !(
				concept === "Subjunctive scaling" || concept === "Declarative fraction"
			);
		}

		// In step 2, highlight only fake concepts
		if (step === 2) {
			return (
				concept === "Subjunctive scaling" || concept === "Declarative fraction"
			);
		}

		return false;
	};
</script>

<section class="scrolly-section">
	<div class="spacer" />
	<div class="sticky-wrapper">
		<div class="table-container">
			<p class="table-title">
				Thinking about mathematical concepts: how familiar are you with the
				following terms?
			</p>
			<p class="table-subtitle">(Please select one response in each row.)</p>
			<table>
				<thead>
					<tr>
						<th class="concept">Concept</th>
						<th>Never heard of it</th>
						<th>Heard of it once or twice</th>
						<th>Heard of it a few times</th>
						<th>Heard of it often</th>
						<th>Know it well, understand the concept</th>
					</tr>
				</thead>
				<tbody>
					{#each concepts as concept}
						<tr class:highlighted={isHighlighted(concept, value)}>
							<td class="concept">{concept}</td>
							{#each Array(5) as _}
								<td class="radio">
									<input type="radio" disabled />
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Updated Scrolly text content to use scrollContent prop -->
	<Scrolly bind:value>
		{#each scrollContent as step, i}
			<div class="step" class:active={value === i}>
				<div class="step-content">
					<p>{@html step.step}</p>
				</div>
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
</section>

<style>
	.scrolly-section {
		position: relative;
		width: 100%;
		z-index: 0;
	}

	.spacer {
		height: 0vh;
	}

	.sticky-wrapper {
		position: sticky;
		top: 0;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.table-title {
		font-size: 1.3rem;
		font-weight: bold;
	}
	.table-subtitle {
		font-size: 1rem;
		font-style: italic;
	}
	.table-container {
		width: 65vw;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 1rem;
	}

	.step {
		margin: 0 auto;
		padding: 1rem;
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-content {
		position: relative;
		z-index: 2;
		background: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		max-width: 40rem;
		margin: 0 auto;
		opacity: 0.3;
		transition: opacity 250ms;
	}

	.step.active .step-content {
		opacity: 1;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
		font-size: 0.9rem;
		white-space: normal;
	}

	.concept {
		width: 25%;
	}

	.radio {
		width: 15%;
		text-align: center;
	}

	.highlighted {
		background-color: var(--color-light-text);
		color: var(--color-text);
		transition: background-color 0.3s ease;
	}

	p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.table-container {
			width: 95vw;
			padding: 0.5rem;
			margin: 0 auto;
		}

		table {
			font-size: 0.7rem;
		}

		th,
		td {
			padding: 0.25rem;
			white-space: normal;
			word-wrap: break-word;
			hyphens: none;
		}

		.concept {
			width: 30%;
		}

		.radio {
			width: 14%;
			padding: 0.25rem 0.1rem;
		}

		th {
			font-size: 0.65rem;
			line-height: 1.2;
		}

		.table-title {
			font-size: 1rem;
			margin-bottom: 0.5rem;
		}

		.table-subtitle {
			font-size: 0.8rem;
			margin-bottom: 0.5rem;
		}

		.sticky-wrapper {
			overflow-x: hidden;
			padding: 0.5rem 0;
		}
	}

	@media (max-width: 480px) {
		table {
			font-size: 0.65rem;
		}

		th {
			font-size: 0.6rem;
		}
	}
</style>
