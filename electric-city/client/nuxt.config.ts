// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/image-edge", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
	plugins: [{ src: "~/plugins/pinia.client.js" }],
});
