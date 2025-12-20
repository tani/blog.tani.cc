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
				class="mx-auto prose prose-sm md:prose-base lg:prose-lg xl:prose-xl"
			>
				<RouterView />
			</article>
		</main>

		<footer class="mx-auto px-3 my-3 container">
			<section
				class="mx-auto prose prose-sm md:prose-base lg:prose-lg xl:prose-xl"
			>
				<p>&copy; 2025 My Blog</p>
			</section>
		</footer>
	</div>
</template>

<script setup lang="ts"></script>

<style>
mjx-container svg {
	display: inline-block;
}
</style>
