<template>
	<div class="">
		<Hero />
		<section class="bg-black mx-auto">
			<h2 class="text-4xl text-white text-center">
				Enhance Your Audio with Our Range of Services: Mastering, Mixing, and
				Consultations
			</h2>
			<div
				class="mt-20 pb-20 flex space-y-6 flex-col w-full lg:flex-row items-center justify-center text-white lg:space-y-0 lg:space-x-[2vw]"
			>
				<div
					class="bg-zinc-900 hover:bg-zinc-800 w-96 text-center rounded-lg px-6 border-transparent hover:border-orange-900 border-2 duration-200 outline-none"
				>
					<h3 class="text-4xl mt-10">Mixing</h3>
					<p class="mt-10 text-xl">
						Creating balance, presence and clarity in music. Showcasing emotion
						and intent.
					</p>
					<p />
					<p class="mt-10 text-xl">
						Our approach is a combination of high-end analogue equipment with
						digital tools to give you the best of both worlds.
					</p>
					<button
						class="my-10 px-10 py-2 font-bold tracking-[0.5em] uppercase border-2 border-black rounded-md bg-black text-white hover:bg-white hover:text-black duration-200"
					>
						Learn More
					</button>
				</div>
				<div
					class="bg-zinc-900 hover:bg-zinc-800 w-96 text-center rounded-lg px-6 border-transparent hover:border-orange-900 border-2 duration-200 outline-none"
				>
					<h3 class="text-4xl mt-10">Mastering</h3>
					<p class="mt-10 text-xl">
						Creating balance, presence and clarity in music. Showcasing emotion
						and intent.
					</p>
					<p />
					<p class="mt-10 text-xl">
						Our approach is a combination of high-end analogue equipment with
						digital tools to give you the best of both worlds.
					</p>
					<button
						class="my-10 px-10 py-2 font-bold tracking-[0.5em] uppercase border-2 border-black rounded-md bg-black text-white hover:bg-white hover:text-black duration-200"
					>
						Learn More
					</button>
				</div>
				<div
					class="bg-zinc-900 hover:bg-zinc-800 w-96 text-center rounded-lg px-6 border-transparent hover:border-orange-900 border-2 duration-200 outline-none"
				>
					<h3 class="text-4xl mt-10">Consultations</h3>
					<p class="mt-10 text-xl">
						Creating balance, presence and clarity in music. Showcasing emotion
						and intent.
					</p>
					<p />
					<p class="mt-10 text-xl">
						Our approach is a combination of high-end analogue equipment with
						digital tools to give you the best of both worlds.
					</p>
					<button
						class="my-10 px-10 py-2 font-bold tracking-[0.5em] uppercase border-2 border-black rounded-md bg-black text-white hover:bg-white hover:text-black duration-200"
					>
						Learn More
					</button>
				</div>
			</div>
		</section>
		<section class="gradient py-32">
			<h2
				class="text-white font-sans tracking-widest text-5xl uppercase text-center font-semibold -mt-16"
			>
				Our Work
			</h2>
			<div
				class="flex flex-col items-center justify-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8 mt-10"
			>
				<title>Jazz</title>
				<iframe
					class="w-96 lg:w-1/5"
					style="border-radius: 12px"
					src="https://open.spotify.com/embed/album/6FCzvataOZh68j8OKzOt9a?utm_source=generator"
					width="20%"
					height="352"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>

				<title>Pop</title>
				<iframe
					class="w-96 lg:w-1/5"
					style="border-radius: 12px"
					src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7D8GQsPKGvy?utm_source=generator"
					width="20%"
					height="352"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>

				<title>Hip-Hop</title>
				<iframe
					class="w-96 lg:w-1/5"
					style="border-radius: 12px"
					src="https://open.spotify.com/embed/playlist/6ddS6zsEjzvf0NgPOzSrL1?utm_source=generator"
					width="20%"
					height="352"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>

				<title>Electro</title>
				<iframe
					class="w-96 lg:w-1/5"
					style="border-radius: 12px"
					src="https://open.spotify.com/embed/album/5wBz69rJgZF0s2y2KWQXfV?utm_source=generator"
					width="20%"
					height="352"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>
			</div>
		</section>
		<Footer />
	</div>
</template>

<style scoped>
	.gradient {
		background-image: linear-gradient(
			to bottom,
			#000000,
			#3b161c,
			#712225,
			#a53521,
			#d35400
		);
	}
</style>
