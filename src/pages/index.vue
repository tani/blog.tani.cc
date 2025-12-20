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

interface PageInfo {
	path: string;
	title: string;
	description?: string;
}

// biome-ignore lint/correctness/noUnusedVariables: exposed to the template via <script setup>
const pages = computed<PageInfo[]>(() =>
	routes
		.filter((route) => route.path !== "/")
		.map((route) => {
			const frontmatter = route.meta?.frontmatter as
				| Record<string, unknown>
				| undefined;

			const title =
				typeof frontmatter?.title === "string"
					? frontmatter.title
					: route.path.replace(/^\//, "");

			const description =
				typeof frontmatter?.description === "string"
					? frontmatter.description
					: undefined;

			return {
				path: route.path,
				title,
				description,
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title)),
);
</script>
