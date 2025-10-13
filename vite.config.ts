import { defineConfig } from 'vite'
import Vue from 'unplugin-vue/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import Shiki from '@shikijs/markdown-it'
import mathjax3 from 'markdown-it-mathjax3'
import UnoCSS from 'unocss/vite'

const shiki = await Shiki({
    themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
    }
})

export default defineConfig({
  plugins: [
    UnoCSS(),
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'typed-router.d.ts',
    }),
    Markdown({
      headEnabled: true,
      markdownItSetup(md) {
          md.use(shiki)
          md.use(mathjax3)
      },
      wrapperClasses: 'prose prose-sm md:prose-base lg:prose-lg xl:prose-xl'
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
})
