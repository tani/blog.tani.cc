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
import { useHead } from "@unhead/vue";

const route = useRoute();
const frontmatter = computed(() => (route.meta?.frontmatter || {}) as any);

const date = computed(() => {
	const d = frontmatter.value?.date;
	return d ? new Date(d).toISOString().slice(0, 10) : "";
});

useHead({
	title: computed(() => frontmatter.value?.title || "Taniguchi's Blog"),
	meta: [
		{
			name: "description",
			content: computed(
				() => frontmatter.value?.description || "My personal blog",
			),
		},
		{
			property: "og:title",
			content: computed(() => frontmatter.value?.title || "Taniguchi's Blog"),
		},
		{
			property: "og:description",
			content: computed(
				() => frontmatter.value?.description || "My personal blog",
			),
		},
		{ property: "og:type", content: "website" },
		{
			property: "og:image",
			content: computed(() => {
				const slug = route.path.replace(/^\//, "");
				return slug ? `/og/${slug}.png` : "/og/default.png";
			}),
		},
	],
});
</script>

<style>
mjx-container svg {
	display: inline-block;
}
</style>
