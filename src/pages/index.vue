<template>
	<div class="mx-auto my-6">
		<div>
			<h1 class="text-3xl">Posts</h1>
			<p>Browse every page sourced from Markdown files.</p>
		</div>

		<ul class="my-4">
			<li v-for="page in pages" :key="page.path">
				<RouterLink :to="page.path" class="hover:underline">
					{{ page.title }}
				</RouterLink>
				<p v-if="page.description" class="mt-2">
					{{ page.description }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { routes } from "vue-router/auto-routes";

const modules = import.meta.glob<any>("./*.md", { eager: true });

const pages = computed(() =>
	routes
		.filter((r) => r.path !== "/" && r.path !== "/index")
		.map((r) => {
			const m = modules[`.${r.path}.md`];
			const fm = { ...m, ...m?.frontmatter, ...m?.default?.frontmatter };
			return {
				path: r.path,
				title: fm.title || r.path.slice(1),
				description: fm.description,
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title))
);
</script>
