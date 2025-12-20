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
				<p v-if="date" class="text-sm text-gray-500 mb-2">
					{{ new Date(date).toISOString().split("T")[0] }}
				</p>
				<RouterView />
			</article>
		</main>

		<footer class="mx-auto px-3 my-3 container">
			<section
				class="mx-auto prose prose-sm md:prose-base lg:prose-lg"
			>
				<p>&copy; 2025 My Blog</p>
			</section>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const modules = import.meta.glob<any>("./pages/*.md", { eager: true });

const date = computed(() => {
	const path = route.path.replace(/\/$/, "");
	const m = modules[`./pages${path}.md`];
	const fm = (route.meta?.frontmatter || m?.frontmatter || m?.default?.frontmatter || m) as any;
	return fm?.date;
});
</script>

<style>
mjx-container svg {
	display: inline-block;
}
</style>
