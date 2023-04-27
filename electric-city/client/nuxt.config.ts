// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/image-edge", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
	plugins: [{ src: "~/plugins/pinia.client.js" }],
	head: {
		link: [
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
			},
		],
	},
});
