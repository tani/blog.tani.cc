import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetWind4,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind4(), // required!
		presetAttributify({
			nonValuedAttribute: false,
		}),
		presetTypography(),
	],
});
