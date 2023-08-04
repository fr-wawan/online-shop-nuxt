// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
      script: [
        {
          src: "https://app.sandbox.midtrans.com/snap/snap.js",
          "data-client-key": "SB-Mid-client-Ia5phn59snRRaRyR",
        },
      ],
    },
  },
  css: ["@/assets/css/style.css"],
  modules: ["@pinia/nuxt", "nuxt-icon", "@vueuse/nuxt"],
  pinia: {
    autoImports: [
      "defineStore",
      "storeToRefs",
      ["defineStore", "definePiniaStore"],
    ],
  },
  imports: {
    dirs: ["./stores"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
