<script>
	export let x = 0;
	export let y = 0;
	export let visible = false;
	export let data = {};

	// Convert ISO code to emoji flag (now using 2-digit code directly)
	function getCountryFlag(iso) {
		if (!iso) return "";
		return `<img 
			src="https://flagcdn.com/16x12/${iso.toLowerCase()}.png"
			srcset="https://flagcdn.com/32x24/${iso.toLowerCase()}.png 2x"
			width="16" 
			height="12"
			alt="${iso}"
			class="flag-icon">`;
	}

	$: formattedChange =
		data?.change != null
			? data.change > 0
				? `+${data.change}`
				: `${data.change}`
			: "0";
</script>

{#if visible && data}
	<div
		class="tooltip"
		style="left: {x}px; top: {y}px; transform: translate(-50%, 20px);"
	>
		<div class="header">
			<span class="flag">{@html getCountryFlag(data.iso)}</span>
			<span>{data.country || "Unknown"}</span>
		</div>
		<div class="content">
			<div class="row">
				<span>2012:</span>
				<span>{(data.pct2012 ?? 0).toFixed(1)}%</span>
			</div>
			<div class="row">
				<span>2022:</span>
				<span>{(data.pct2022 ?? 0).toFixed(1)}%</span>
			</div>
			<div class="row change">
				<span>Change:</span>
				<span style="color: {(data.change ?? 0) > 0 ? '#1a9850' : '#d73027'}">
					{(data.change ?? 0).toFixed(1)}%
				</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px;
		pointer-events: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		font-size: 14px;
		min-width: 200px;
		max-width: 200px;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
		font-weight: bold;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.row {
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}
	.change {
		margin-top: 4px;
		padding-top: 4px;
		border-top: 1px solid #eee;
		font-weight: bold;
	}
	img {
		border: 1px solid #eee;
	}
	.flag {
		font-size: 1.2em;
		line-height: 1;
	}
	.flag-icon {
		display: inline-block;
		vertical-align: middle;
		margin-right: 4px;
	}
</style>
