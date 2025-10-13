<template>
    <div id="app">
        <header>
            <nav>
                <RouterLink to="/">ホーム</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/posts">記事一覧</RouterLink>
            </nav>
        </header>

        <main class="prose prose-sm md:prose-base lg:prose-lg xl:prose-xl">
            <RouterView />
        </main>

        <footer>
            <p>&copy; 2025 My Blog</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
 import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
 svg {
   display: inline-block;
 }
</style>

<style scoped>
 nav {
     display: flex;
     gap: 1rem;
     padding: 1rem;
     background: #f5f5f5;
 }

 nav a {
     text-decoration: none;
     color: #42b983;
 }

 nav a.router-link-active {
     font-weight: bold;
 }

 main {
     max-width: 800px;
     margin: 2rem auto;
     padding: 0 1rem;
 }
</style>
