import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetWind4,
	presetWebFonts,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind4(), // required!
		presetAttributify({
			nonValuedAttribute: false,
		}),
		presetTypography({
			cssExtend: {
				"h1, h2, h3, h4, h5, h6": {
					"font-family": '"Shippori Mincho", "Noto Serif JP", serif',
				},
			},
		}),
		presetWebFonts({
			provider: "bunny",
			fonts: {
				sans: ["Inter", "Noto Sans JP"],
				serif: ["Shippori Mincho", "Noto Serif JP"],
				mono: ["Fira Code", "Fira Mono:400,700"],
				pretty: ["Shippori Mincho", "Noto Serif JP"],
			},
		}),
	],
});
