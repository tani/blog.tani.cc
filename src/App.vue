<template>
	<div id="app" class="font-serif">
		<header class="mx-auto px-3 my-10 container">
			<nav class="flex gap-3">
				<RouterLink class="hover:border-b p-1" to="/"
					>ホーム</RouterLink
				>
			</nav>
		</header>

		<main class="mx-auto px-3 my-3 container">
			<article
				class="mx-auto prose prose-sm md:prose-base lg:prose-lg prose-h1:text-2xl prose-h1:md:text-3xl"
			>
				<p v-if="date" class="text-sm text-gray-500 mb-2">{{ date }}</p>
				<RouterView />
			</article>
		</main>

		<footer class="mx-auto px-3 my-3 container">
			<section class="mx-auto prose prose-sm md:prose-base lg:prose-lg">
				<p>&copy; 2025 My Blog</p>
			</section>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mods = import.meta.glob<any>("./pages/*.md", { eager: true });
const date = computed(() => {
	const m = mods[`./pages${route.path}.md`];
	const d = m?.date || m?.frontmatter?.date || (route.meta.frontmatter as any)?.date;
	return d ? new Date(d).toISOString().slice(0, 10) : "";
});
</script>

<style>
mjx-container svg {
	display: inline-block;
}
</style>
