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
import { computed } from "vue";
import { useHead } from "@unhead/vue";
import { routes } from "vue-router/auto-routes";

useHead({
	title: "Posts - My Blog",
	meta: [
		{ name: "description", content: "Browse all posts." },
		{ property: "og:title", content: "Posts - My Blog" },
		{ property: "og:description", content: "Browse all posts." },
	],
});

const modules = import.meta.glob<any>("./*.md", { eager: true });
const pages = computed(() =>
	routes
		.filter((r) => r.path !== "/" && r.path !== "/index")
		.map((r) => {
			const slug = r.path.replace(/^\//, "");
			const fm = modules[`./${slug}.md`];
			return {
				path: r.path,
				title: fm?.title || (r.name as string) || slug,
				description: fm?.description,
				date: fm?.date,
			};
		})
		.sort((a, b) => {
			if (a.date && b.date)
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			return a.date
				? -1
				: b.date
					? 1
					: a.title.localeCompare(b.title);
		}),
);
</script>
