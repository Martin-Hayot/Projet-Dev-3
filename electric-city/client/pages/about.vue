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
						>
							About</NuxtLink
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
					<div class="tw-group" v-show="!isLogged">
						<NuxtLink
							class="tw-text-white tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10 tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200"
							to="/login"
							>Login</NuxtLink
						>
					</div>
					<div class="tw-group" v-show="!isLogged">
						<NuxtLink
							class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/signup"
							>Sign Up</NuxtLink
						>
					</div>
					<div class="tw-group" v-show="isLogged">
						<a
							v-if="isAdmin"
							class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							href="/admin/orders"
							>Dashboard</a
						>
						<a
							v-else
							class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							href="/user/orders"
							>Dashboard</a
						>
					</div>
					<div class="tw-group" v-show="isLogged">
						<a
							class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							@click="logout"
							href="/"
						>
							Logout
						</a>
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
		</div>
	</section>

	<ColumnsBy2>
		<template v-slot:column1>
			<div
				class="tw-p-4 tw-text-left tw-overflow-hidden tw-border tw-rounded-2xl tw-bg-zinc-900 tw-border-transparent hover:tw-bg-zinc-800 hover:tw-border-orange-900 tw-duration-500"
			>
				<h2 class="tw-font-bold tw-text-lg">Our story</h2>
				<span class="tw-py-4 tw-block">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					viverra nisi eros, ac ultricies lacus finibus ut. Morbi eget
					scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel
					at.
				</span>
				<span class="tw-block">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					viverra nisi eros, ac ultricies lacus finibus ut. Morbi eget
					scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel
					at.
				</span>
			</div>
		</template>
		<template v-slot:column2>
			<div
				class="tw-overflow-hidden tw-border tw-rounded-2xl tw-border-transparent hover:tw-border-orange-900 tw-duration-500"
			>
				<img
					class="tw-w-full tw-h-60 lg:tw-h-80 tw-object-cover"
					src="studio.jpeg"
				/>
			</div>
		</template>
	</ColumnsBy2>

	<ColumnBy1>
		<div
			class="tw-p-4 tw-text-left tw-overflow-hidden tw-shadow tw-border tw-rounded-2xl tw-bg-zinc-900 hover:tw-bg-zinc-800 tw-border-orange-900 tw-duration-500"
		>
			<h2 class="tw-font-bold tw-text-lg">Our story</h2>
			<span class="tw-py-4 tw-block">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida
				mollis risus, sit amet dapibus magna. Proin ut facilisis sem. Sed
				efficitur, eros vel consequat vestibulum, risus libero ultricies felis,
				vitae pellentesque lectus lorem nec leo. Orci varius natoque penatibus
				et magnis dis parturient montes, nascetur ridiculus mus. In mattis
				efficitur eros, vel ornare dolor. Integer efficitur ex quis mi pharetra,
				ac blandit leo tristique. Aliquam facilisis nulla eget libero.
			</span>
		</div>
	</ColumnBy1>

	<ColumnsBy2 class="gradient">
		<template v-slot:column1>
			<div
				class="tw-overflow-hidden tw-border tw-rounded-2xl tw-border-transparent hover:tw-border-orange-900 tw-duration-500"
			>
				<img
					class="tw-w-full tw-h-60 lg:tw-h-80 tw-object-cover"
					src="studio.jpeg"
				/>
			</div>
		</template>
		<template v-slot:column2>
			<div
				class="tw-p-4 tw-text-left tw-overflow-hidden tw-border tw-rounded-2xl tw-bg-zinc-900 tw-border-transparent hover:tw-bg-zinc-800 hover:tw-border-orange-900 tw-duration-500"
			>
				<h2 class="tw-font-bold tw-text-lg">Our story</h2>
				<span class="tw-py-4 tw-block">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					viverra nisi eros, ac ultricies lacus finibus ut. Morbi eget
					scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel
					at.
				</span>
				<span class="tw-block">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					viverra nisi eros, ac ultricies lacus finibus ut. Morbi eget
					scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel
					at.
				</span>
			</div>
		</template>
	</ColumnsBy2>

	<Footer />
</template>
<script setup>
	let accessToken = "";
	let isLogged = ref(false);
	let isAdmin = ref(false);
	onMounted(() => {
		if (process.client) {
			accessToken = localStorage.getItem("accessToken");
		}
		if (accessToken) {
			isLogged.value = true;
			getRole();
		}
	});
	const getRole = () => {
		$fetch("http://localhost:3001/api/auth/role", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
		})
			.then((res) => {
				if (res.role === "ADMIN") isAdmin.value = true;
				else isAdmin.value = false;
			})
			.catch((err) => {
				console.log(err);
			});
	};
	function logout() {
		localStorage.removeItem("accessToken");
		isLogged.value = false;
	}
</script>
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
