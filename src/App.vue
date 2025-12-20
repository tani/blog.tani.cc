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
import { usePosts } from "./composables/usePosts";

const route = useRoute();
const { posts } = usePosts();

const currentPost = computed(() => posts.value.find((p) => p.path === route.path));
const date = computed(() => {
	const d = currentPost.value?.date;
	return d ? new Date(d).toISOString().slice(0, 10) : "";
});

useHead({
	title: computed(() => currentPost.value?.title || "My Blog"),
	meta: [
		{ name: "description", content: computed(() => currentPost.value?.description || "My personal blog") },
		{ property: "og:title", content: computed(() => currentPost.value?.title || "My Blog") },
		{ property: "og:description", content: computed(() => currentPost.value?.description || "My personal blog") },
		{ property: "og:type", content: "website" },
	],
});
</script>

<style>
mjx-container svg {
	display: inline-block;
}
</style>
