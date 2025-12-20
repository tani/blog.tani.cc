<template>
	<div id="app" font="serif">
		<header mx="auto" px="3" my="10" container="~">
			<nav flex="~" gap="3">
				<RouterLink border="b transparent hover:black" p="1" to="/"
					>ホーム</RouterLink
				>
			</nav>
		</header>

		<main mx="auto" px="3" my="3" container="~">
			<article
				mx="auto"
				prose="~ sm md:base lg:lg"
				prose-h1="text-2xl md:text-3xl"
			>
				<p v-if="date" text="sm gray-500" mb="2">{{ date }}</p>
				<RouterView />
			</article>
		</main>

		<footer mx="auto" px="3" my="3" container="~">
			<section mx="auto" prose="~ sm md:base lg:lg">
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
