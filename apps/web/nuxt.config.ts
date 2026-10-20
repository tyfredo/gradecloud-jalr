import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    public: { apiBase: 'http://localhost:4000' },
  },
  app: {
    head: {
      title: 'GradeCloud | Gestión académica',
      meta: [{ name: 'description', content: 'Demo educativa de nube y PostgreSQL' }],
    },
  },
})