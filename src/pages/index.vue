<template>
  <main class="mx-auto max-w-2xl space-y-6 p-6">
    <header>
      <h1 class="text-3xl font-semibold">Posts</h1>
      <p class="text-sm text-gray-500">Browse every page sourced from Markdown files.</p>
    </header>

    <ul class="space-y-4">
      <li v-for="page in pages" :key="page.path" class="rounded border p-4 transition hover:border-gray-400">
        <RouterLink :to="page.path" class="text-xl font-medium text-blue-600 hover:underline">
          {{ page.title }}
        </RouterLink>
        <p v-if="page.description" class="mt-2 text-sm text-gray-500">
          {{ page.description }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { routes } from 'vue-router/auto-routes'

interface PageInfo {
  path: string
  title: string
  description?: string
}

const pages = computed<PageInfo[]>(() =>
  routes
    .filter(route => route.path !== '/')
    .map(route => {
      const frontmatter = route.meta?.frontmatter as Record<string, unknown> | undefined

      const title =
        typeof frontmatter?.title === 'string'
          ? frontmatter.title
          : route.path.replace(/^\//, '')

      const description =
        typeof frontmatter?.description === 'string' ? frontmatter.description : undefined

      return {
        path: route.path,
        title,
        description,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title)),
)
</script>
