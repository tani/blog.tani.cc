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
import { routes } from "vue-router/auto-routes";
import { useHead } from "@unhead/vue";

useHead({
	title: "Posts - My Blog",
	meta: [
		{ name: "description", content: "Browse all posts." },
		{ property: "og:title", content: "Posts - My Blog" },
		{ property: "og:description", content: "Browse all posts." },
	],
});

const modules = import.meta.glob<any>("./*.md", { eager: true });


const pages = computed(() => {
	return routes
		.filter((r) => r.path !== "/" && r.path !== "/index")
		.map((r) => {
			const m = modules[`.${r.path}.md`];
			const fm = (m?.frontmatter || m?.default?.frontmatter || m || r.meta?.frontmatter || r.meta) as any;
			const title = (r.meta?.frontmatter as any)?.title || fm?.title || r.path.slice(1);
			
			return {
				path: r.path,
				title,
				description: fm?.description,
				date: fm?.date,
			};
		})
		.sort((a, b) => {
			if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
			if (a.date) return -1;
			if (b.date) return 1;
			return a.title.localeCompare(b.title);
		});
});
</script>
