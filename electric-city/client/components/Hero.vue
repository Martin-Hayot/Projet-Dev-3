<script>
	export default {
		setup() {
			const store = useAuthStore();
			onMounted(() => {
				store.loadDataFromLocalStorage();
			});
			const isLoggedIn = store.token;
		},
	};
</script>

<template>
	<section class="relative">
		<img
			src="StudioFond.jpg"
			class="absolute -z-20 top-0 left-0 h-full w-full object-cover brightness-75"
		/>
		<div
			class="absolute -z-10 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black"
		></div>
		<div class="container max-w-7xl mx-auto px-6 py-6 z-50">
			<nav class="flex items-center justify-between font-bold text-white z-50">
				<NuxtImg
					src="./logo-white-cropped.png"
					class="z-10 h-20 w-44 ml-2 -mt-4"
				></NuxtImg>
				<div class="hidden h-10 font-alata mt-2 md:flex md:space-x-6 z-10">
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/"
							>Home</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/about"
							>About</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/contact"
							>Contact</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div v-if="!isLoggedIn" class="group">
						<NuxtLink
							class="text-white pb-2 no-underline text-2xl font-semibold z-10 border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black duration-200"
							to="/login"
							>Login</NuxtLink
						>
					</div>
					<div v-if="!isLoggedIn" class="group">
						<NuxtLink
							class="text-white border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black duration-200 pb-2 no-underline text-2xl font-semibold z-10"
							to="/signup"
							>Sign Up</NuxtLink
						>
					</div>
					<div v-else>Profile</div>
				</div>
				<div class="md:hidden z-50 mt-6">
					<button
						id="menu-btn"
						type="button"
						class="z-50 hamburger md:hidden focus:outline-none"
					>
						<span class="hamburger-top z-40"></span>
						<span class="hamburger-middle z-40"></span>
						<span class="hamburger-bottom z-40"></span>
					</button>
				</div>
			</nav>
			<div class="text-white text-center m-auto my-40 z-40">
				<h1
					class="text-4xl font-bold tracking-wide leading-tight font-sans z-10"
				>
					<strong class="font-bold text-6xl z-10">Electric City</strong><br />
					Mastering Studio
				</h1>
				<p class="text-2xl font-semibold mt-5 font-sans z-10">
					Since 1985 <br />
					we have been serving the Belgian and international music scene
					<br />for analog mastering without compromise
				</p>
				<button
					class="font-sans p-3 bg-[#00000067] text-base text-white font-semibold mt-4 rounded-md border-2 border-white hover:bg-white hover:text-black hover: transition duration-500 ease-in-out"
				>
					Learn more ...
				</button>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.hamburger {
		cursor: pointer;
		width: 24px;
		height: 24px;
		transition: all 0.25s;
		position: relative;
	}

	.hamburger-top,
	.hamburger-middle,
	.hamburger-bottom {
		position: absolute;
		width: 24px;
		height: 2px;
		top: 0;
		left: 0;
		background-color: #fff;
		transform: rotate(0deg);
		transition: all 0.5s;
	}

	.hamburger-middle {
		transform: translateY(7px);
	}

	.hamburger-bottom {
		transform: translateY(14px);
	}
</style>
