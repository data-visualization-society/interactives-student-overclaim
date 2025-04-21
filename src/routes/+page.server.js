import mergedData from "$data/mergeddata.csv"
import languageTable from "$data/language-table.csv"

export async function load({fetch}) {
	console.log("Starting load function");
	
	try {
		
		let data = { 
			section2data: [],
			section3data: [],
			languageData: [],
			section4data: []
		};


		if (mergedData) {
			data.section2data = mergedData.map(d => {
				// additional processing code for country names
				const countryName = d.country === "United States of America" ? "United States" : d.country;
				return {
					Jurisdiction_s: countryName,
					Jurisdiction_iso_s: d.country_iso3,
					Jurisdiction_iso2_s: d.country_iso2,
					Jurisdiction_iso_d: d.country_iso3,
					Jurisdiction_iso2_d: d.country_iso2,
					knowitwell_pct_2012_s: +d.s_knowitwell_pct_2012,
					knowitwell_pct_2012_d: +d.d_knowitwell_pct_2012,
					knowitwell_pct_2022_2012_s: +d.s_knowitwell_pct_2022_2012,
					knowitwell_pct_2022_2012_d: +d.d_knowitwell_pct_2022_2012,
					pct100_s: +d.pct100, 
					never_pct_2022_s: +d.s_never_pct,
					never_pct_s: +d.s_never_pct, 
					onceortwice_pct_s: +d.s_onceortwice_pct,
					afewtimes_pct_s: +d.s_afewtimes_pct,
					often_pct_s: +d.s_often_pct,
					knowitwell_pct_s: +d.s_knowitwell_pct,
					Jurisdiction_d: countryName, //needs update later
					never_pct_2022_d: +d.d_never_pct,
					never_pct_d: +d.d_never_pct, //need to double check
					onceortwice_pct_d: +d.d_onceortwice_pct,
					afewtimes_pct_d: +d.d_afewtimes_pct,
					often_pct_d: +d.d_often_pct,
					knowitwell_pct_d: +d.d_knowitwell_pct

				}
			});
		}

		if (mergedData) {
			// Simplified section2data processing to match ScrollyC's needs
			data.section3data = mergedData.map(d => {
				// additional processing code for country names
				const countryName = d.country === "United States of America" ? "United States" : d.country;
				return {
					Jurisdiction_iso_s: d.country_iso3,
					Jurisdiction_iso_d: d.country_iso3,
					knowitwell_pct_2022_2012_s: +d.s_knowitwell_pct_2022_2012,
					knowitwell_pct_2022_2012_d: +d.d_knowitwell_pct_2022_2012,
					knowitwell_pct_2012_s: +d.s_knowitwell_pct_2012,
					knowitwell_pct_2012_d: +d.d_knowitwell_pct_2012,
					knowitwell_pct_s: +d.s_knowitwell_pct,
					knowitwell_pct_d: +d.d_knowitwell_pct,
					Jurisdiction_s: countryName,
					Jurisdiction_d: countryName,
					Jurisdiction_iso2_s: d.country_iso2,
					Jurisdiction_iso2_d: d.country_iso2
				}
			});
		}

		// Process language table with debugging
		if (languageTable) {
			console.log("Available columns:", Object.keys(languageTable[0]));
			
			data.languageData = languageTable.map((row, index) => {
				// Log each row for debugging
				console.log(`Processing row ${index}:`, row);
				
				const processed = {
					jurisdiction: row['jurisdiction'],  // Try direct column name
					language: row['language'],
					languageCode: row['languageCode'],
					subjunctiveScaling: row['subjunctiveScaling'],
					declarativeFraction: row['declarativeFraction']
				};
				
				// Log processed row
				console.log(`Processed row ${index}:`, processed);
				
				return processed;
			});
		}

		// Process section4data
		if (mergedData) {
			data.section4data = mergedData.map(d => {
				// additional processing code for country names
				const countryName = d.country === "United States of America" ? "United States" : d.country;
				return {
					jurisdiction: countryName,
					mathAverage: +d.mathavg,
					subjunctiveKnowitwellPct: +d.s_knowitwell_pct,
					subjunctiveNeverAvg: +d.s_never_avg,
					subjunctiveKnowitwellAvg: +d.s_knowitwell_avg,
					subjunctiveNeverKnowitwellAvggap: +d.s_never_knowitwell_gap,
					subjunctiveNeverKnowitwellAvggapTtest: d.s_never_knowitwell_gap_ttest,
					declarativeKnowitwellPct: +d.d_knowitwell_pct,
					declarativeNeverAvg: +d.d_never_avg,
					declarativeKnowitwellAvg: +d.d_knowitwell_avg,
					declarativeNeverKnowitwellAvggap: +d.d_never_knowitwell_gap,
					declarativeNeverKnowitwellAvggapTtest: d.d_never_knowitwell_gap_ttest
				}
			});
		}

		console.log("Processed languageData:", data.languageData);
		return { data };
	} catch (error) {
		console.error("Error in load function:", error);
		throw error;
	}
}

