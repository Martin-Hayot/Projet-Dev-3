<template>
	<section class="relative">
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
					<div class="group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/"
							>Home</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/about"
							>About</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
							to="/contact"
							>Contact</NuxtLink
						>
						<div
							class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="tw-text-white tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10 tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200"
							to="/login"
							>Login</NuxtLink
						>
					</div>
					<div class="group">
						<NuxtLink
							class="tw-text-white border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
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
						class="tw-z-50 tw-hamburger md:tw-hidden focus:tw-outline-none"
					>
						<span class="hamburger-top tw-z-40"></span>
						<span class="hamburger-middle tw-z-40"></span>
						<span class="hamburger-bottom tw-z-40"></span>
					</button>
				</div>
			</nav>
			<div class="tw-text-white tw-text-center tw-my-10 tw-z-40">
				<div
					class="tw-text-4xl tw-font-bold tw-tracking-wide tw-leading-tight tw-font-sans tw-z-10 tw-columns-2"
				>
					<div class="tw-rounded-lg tw-ml-10">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.465309475045!2d4.352545375594045!3d50.82254456050399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4f5f0c498b9%3A0x752576890080cd48!2sElectric%20City!5e0!3m2!1sfr!2sbe!4v1682519969362!5m2!1sfr!2sbe"
							width="550"
							height="450"
							style="border: 0"
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
						>
						</iframe>
					</div>
					<div
						class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700 tw-float-right tw-mr-10"
					>
						<div class="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
							<h1
								class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white"
							>
								Contact us
							</h1>
							<iframe
								name="dummyframe"
								id="dummyframe"
								style="display: none"
							></iframe>
							<form
								class="tw-space-y-4 md:tw-space-y-6"
								id="form"
								action="http://localhost:3001/api/messages"
								method="POST"
								target="dummyframe"
							>
								<div>
									<label
										for="email"
										class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
										>Your email</label
									>
									<input
										type="email"
										name="email"
										id="email"
										class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500"
										required="true"
									/>
									<label
										for="message"
										class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
										>Your request</label
									>
									<input
										type="text"
										name="message"
										id="message"
										class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-20 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
										required="true"
									/>
								</div>
								<div class="tw-flex tw-items-center tw-justify-between"></div>
								<button
									type="submit"
									onclick="alert('the message was sent')"
									class="tw-w-full tw-text-white tw-bg-blue-600 hover:tw-bg-slate-900 tw-duration-200 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-slate-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center"
								>
									Send
								</button>
								<div id="confirmation" style="display: none">
									<p>Votre demande a bien été prise en compte.</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<Footer></Footer>
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
