<template>
	<section class="tw-relative">
		<img
			src="StudioFond.jpg"
			class="tw-absolute -tw-z-20 tw-top-0 tw-left-0 tw-h-full tw-w-full tw-object-cover tw-brightness-75"
		/>
		<div
			class="tw-absolute -tw-z-10 tw-h-full tw-w-full tw-bg-gradient-to-b tw-from-transparent tw-via-transparent tw-to-black"
		></div>
		<div class="tw-container tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-6 tw-z-50">
			<nav
				class="tw-flex tw-items-center tw-justify-between tw-font-bold tw-text-white tw-z-50"
			>
				<NuxtImg
					src="./logo-white-cropped.png"
					class="tw-z-10 tw-h-20 tw-w-44 tw-ml-2 -tw-mt-4"
				></NuxtImg>
				<div
					class="tw-hidden tw-h-10 tw-font-alata tw-mt-2 md:tw-flex md:tw-space-x-6 tw-z-10"
				>
					<div class="tw-group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/"
							>Home</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="tw-group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/about"
							>About</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="tw-group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/contact"
							>Contact</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="tw-group">
						<NuxtLink
							class="tw-text-white tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10 tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200"
							to="/login"
							>Login</NuxtLink
						>
					</div>
					<div class="tw-group">
						<NuxtLink
							class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/signup"
							>Sign Up</NuxtLink
						>
					</div>
				</div>
				<div class="md:tw-hidden tw-z-50 tw-mt-6">
					<button
						id="menu-btn"
						type="button"
						class="tw-z-50 hamburger md:tw-hidden focus:tw-outline-none"
					>
						<span class="hamburger-top tw-z-40"></span>
						<span class="hamburger-middle tw-z-40"></span>
						<span class="hamburger-bottom tw-z-40"></span>
					</button>
				</div>
			</nav>
			<div class="tw-text-white tw-text-center tw-m-auto tw-my-40 tw-z-40">
				<h1
					class="tw-text-4xl tw-font-bold tw-tracking-wide tw-leading-tight tw-font-sans tw-z-10"
				>
					<strong class="tw-font-bold tw-text-6xl tw-z-10">Electric City</strong
					><br />
					Mastering Studio
				</h1>
				<p class="tw-text-2xl tw-font-semibold tw-mt-5 tw-font-sans tw-z-10">
					Since 1985 <br />
					we have been serving the Belgian and international music scene
					<br />for analog mastering without compromise
				</p>
				<button
					class="tw-font-sans tw-p-3 tw-bg-white tw-text-base tw-text-black tw-font-semibold tw-mt-4 tw-rounded-md hover:tw-bg-black hover:tw-text-white tw-transition tw-duration-500 tw-ease-in-out"
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
