<template>
	<div mx="auto" my="6">
		<div>
			<h1 text="3xl">Posts</h1>
			<p>Browse every page sourced from Markdown files.</p>
		</div>

		<ul my="4">
			<li v-for="page in pages" :key="page.path" mb="4">
				<div flex="~" items="baseline" gap="3">
					<RouterLink
						:to="page.path"
						hover="underline"
						un-text="lg"
						font="bold"
					>
						{{ page.title }}
					</RouterLink>
					<span v-if="page.date" text="sm gray-500">{{
						new Date(page.date).toISOString().slice(0, 10)
					}}</span>
				</div>
				<p v-if="page.description" mt="1" text="gray-600">
					{{ page.description }}
				</p>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { usePosts } from "../composables/usePosts";

useHead({
	title: "Posts - My Blog",
	meta: [
		{ name: "description", content: "Browse all posts." },
		{ property: "og:title", content: "Posts - My Blog" },
		{ property: "og:description", content: "Browse all posts." },
	],
});

const { posts: pages } = usePosts();
</script>
