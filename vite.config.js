import { readFileSync } from "fs";
import { sveltekit } from "@sveltejs/kit/vite";
import { timeFormat } from "d3";
import path from "path";
import svg from "vite-plugin-svgstring";
import dsv from "@rollup/plugin-dsv";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const timestamp = timeFormat("%Y-%m-%d-%H:%M")(new Date());

const config = {
	define: {
		__VERSION__: JSON.stringify(version),
		__TIMESTAMP__: JSON.stringify(timestamp)
	},
	plugins: [sveltekit(), dsv(), svg()],
	resolve: {
		alias: {
			$actions: path.resolve("./src/actions"),
			$components: path.resolve("./src/components"),
			$data: path.resolve("./src/data"),
			$routes: path.resolve("./src/routes"),
			$stores: path.resolve("./src/stores"),
			$styles: path.resolve("./src/styles"),
			$logo: path.resolve("./src/logo"),
			$utils: path.resolve("./src/utils")
		}
	}
};

export default config;
