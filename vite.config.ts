import Shiki from "@shikijs/markdown-it";
import mathjax3 from "markdown-it-mathjax3";
import UnoCSS from "unocss/vite";
import Vue from "unplugin-vue/vite";
import Markdown from "unplugin-vue-markdown/vite";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

const shiki = await Shiki({
	themes: {
		light: "vitesse-light",
		dark: "vitesse-dark",
	},
});

export default defineConfig(({ command }) => {
	const isBuild = command === "build";
	return {
		plugins: [
			UnoCSS(),
			VueRouter({
				extensions: [".vue", ".md"],
				dts: "typed-router.d.ts",
				watch: !isBuild,
			}),
			Markdown({
				headEnabled: true,
				markdownItSetup(md) {
					md.use(shiki);
					md.use(mathjax3);
					const origMathInline = md.renderer.rules.math_inline;
					md.renderer.rules.math_inline = function (...args) {
						const rendered =
							origMathInline?.apply(this, args) ?? "";
						return rendered
							.replace(/<mjx-container /, "<mjx-container v-pre ")
							.replace(
								/<mjx-assistive-mml /,
								"<mjx-assistive-mml v-pre ",
							);
					};
					const origMathBlock = md.renderer.rules.math_block;
					md.renderer.rules.math_block = function (...args) {
						const rendered = origMathBlock?.apply(this, args) ?? "";
						return rendered
							.replace(
								/<mjx-container /,
								'<mjx-container v-pre tabindex="0" ',
							)
							.replace(
								/<mjx-assistive-mml /,
								"<mjx-assistive-mml v-pre ",
							);
					};
				},
			}),
			Vue({
				include: [/\.vue$/, /\.md$/],
			}),
		],
	};
});
