<script setup>
	useSeoMeta({
		title: "Login",
		description: "Login",
	});
	let errorStatus = ref("success");
	let errorMessage = ref("");
	let toggleAlert = ref(false);
	const accessTokenLocal = useLocalStorage("accessToken", "");
	const handleSubmit = async (e) => {
		$fetch("http://localhost:3001/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value,
			}),
		})
			.then((data) => {
				if (data.errors) {
					errorStatus.value = "error";
					errorMessage.value = data.errors.msg;
					showStatus();
				} else {
					errorStatus.value = "success";
					errorMessage.value = "Account logged successfully!";
					showStatus();
					sleep(800).then(() => {
						if (data.role === "ADMIN") {
							accessTokenLocal.value = data.accessToken;
							navigateTo({ path: "/admin/orders" });
						} else {
							accessTokenLocal.value = data.accessToken;
							navigateTo({ path: "/user/orders" });
						}
					});
				}
			})
			.catch((err) => console.log(err));
	};

	function showStatus() {
		toggleAlert.value = true;
		setTimeout(
			() => {
				toggleAlert.value = false;
			},
			errorStatus.value == "success" ? 800 : 4000
		);
	}
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<template>
	<section class="tw-h-screen tw-bg-gray-50 dark:tw-bg-gray-900">
		<div
			class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-6 tw-py-8 tw-mx-auto md:tw-h-screen lg:tw-py-0"
		>
			<NuxtLink
				to="/"
				class="tw-flex tw-items-center tw-mb-6 tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white"
			>
				<img
					class="tw-w-40 tw-h-20 tw-mr-2"
					src="/logo-white-cropped.png"
					alt="logo"
				/>
			</NuxtLink>
			<div
				class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700"
			>
				<div class="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
					<v-alert
						v-if="toggleAlert"
						:title="errorStatus"
						density="compact"
						:type="errorStatus"
						:text="errorMessage"
						rounded="lg"
						class="tw-max-w-md tw-mx-auto"
					></v-alert>
					<h1
						class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white"
					>
						Sign in to your account
					</h1>
					<form
						class="tw-space-y-4 md:tw-space-y-6"
						@submit.prevent="handleSubmit"
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
								placeholder="name@domain.com"
								required="true"
							/>
						</div>
						<div>
							<label
								for="password"
								class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>Password</label
							>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:tw-focus:border-blue-500"
								required="true"
							/>
						</div>
						<div class="tw-flex tw-items-center tw-justify-between">
							<div class="tw-flex tw-items-start">
								<div class="tw-flex tw-items-center tw-h-5">
									<input
										id="remember"
										name="remember"
										aria-describedby="remember"
										type="checkbox"
										class="tw-w-4 tw-h-4 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-3 focus:tw-ring-blue-300 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:focus:tw-ring-blue-600 dark:tw-ring-offset-gray-800"
									/>
								</div>
								<div class="tw-ml-3 tw-text-sm">
									<label
										for="remember"
										class="tw-text-gray-500 dark:tw-text-gray-300"
										>Remember me</label
									>
								</div>
							</div>
							<NuxtLink
								to="/password-reset"
								class="tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline"
								>Forgot password?
							</NuxtLink>
						</div>
						<button
							type="submit"
							class="tw-w-full text-white tw-bg-blue-600 hover:tw-bg-slate-900 tw-duration-200 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-slate-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center"
						>
							Sign in
						</button>
						<p
							class="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400"
						>
							Don't have an account yet?
							<NuxtLink
								to="/signup"
								class="tw-font-medium tw-text-blue-600 hover:tw-underline"
							>
								Sign up
							</NuxtLink>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
