<template>
	<header
		class="sticky top-0 z-50 flex justify-between items-center flex-wrap px-32"
	>
		<div>
			<NuxtLink to="/"
				><NuxtImg src="/logo-white.png" sizes="sm: md: lg:150px" alt="logo"
			/></NuxtLink>
		</div>
		<div class="flex items-center">
			<div class="rounded-md mr-4 px-10">
				<NuxtLink
					class="text-white no-underline text-3xl font-semibold px-6"
					to="/"
					>Home</NuxtLink
				>
				<NuxtLink
					class="text-white no-underline text-3xl font-semibold px-6"
					to="/about"
					>About</NuxtLink
				>
				<NuxtLink
					class="text-white no-underline text-3xl font-semibold pl-6"
					to="/contact"
					>Contact</NuxtLink
				>
			</div>
			<div>
				<button
					class="bg-white text-black rounded-md text-2xl font-semibold mx-2 p-2 px-5 mr-8"
				>
					Login
				</button>
				<button
					class="bg-white text-black rounded-md text-2xl font-semibold mx-2 p-2 px-5"
				>
					Sign Up
				</button>
			</div>
		</div>
	</header>
</template>
