// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image-edge",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@vueuse/nuxt",
	],
	plugins: [{ src: "~/plugins/pinia.client.js" }],
	css: ["vuetify/lib/styles/main.sass"],
	build: {
		transpile: ["vuetify"],
	},
	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
	tailwindcss: {
		configPath: "~/config/tailwind.config.js",
	},
});
