<script setup>
	useSeoMeta({
		title: "Sign up",
		description: "Sign up",
	});
	let errorStatus = ref("success");
	let errorMessage = ref("");
	let toggleAlert = ref(false);
	let password = ref("");
	let confirmPassword = ref("");
	let isCorrect = ref(false);

	function checkPasswordMatch() {
		if (password.value !== confirmPassword.value) {
			isCorrect.value = false;
		} else {
			isCorrect.value = true;
		}
	}

	function showStatus() {
		toggleAlert.value = true;
		setTimeout(
			() => {
				toggleAlert.value = false;
				if (errorStatus.value == "success") {
					navigateTo({ path: "/login" });
				}
			},
			errorStatus.value == "success" ? 1000 : 4000
		);
	}
	const handleSubmit = (e) => {
		if (!isCorrect.value) {
			errorStatus.value = "error";
			errorMessage.value = "Passwords do not match!";
			showStatus();
			return;
		}
		$fetch("http://localhost:3001/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value,
				firstname: e.target.firstname.value,
				lastname: e.target.lastname.value,
			}),
		})
			.then((data) => {
				if (data.errors) {
					errorStatus.value = "error";
					errorMessage.value = data.errors.msg;
					showStatus();
				} else {
					errorStatus.value = "success";
					errorMessage.value = "Account created successfully!";
					showStatus();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
						class="tw-rounded-md tw-max-w-xs tw-mx-auto"
					></v-alert>
					<h1
						class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white"
					>
						Create an account
					</h1>
					<v-form
						class="tw-space-y-4 md:tw-space-y-6"
						@submit.prevent="handleSubmit"
					>
						<div class="tw-flex tw-justify-between">
							<div>
								<label
									for="firstname"
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
									>First Name</label
								>
								<input
									type="text"
									name="firstname"
									id="firstname"
									class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
									placeholder="First Name"
									required
								/>
							</div>
							<div>
								<label
									for="lastname"
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
									>Last Name</label
								>
								<input
									type="text"
									name="lastname"
									id="lastname"
									class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
									placeholder="Last Name"
									required
								/>
							</div>
						</div>
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
								class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
								placeholder="name@company.com"
								required
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
								v-model="password"
								@input="checkPasswordMatch"
								class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
								required
							/>
						</div>
						<div>
							<label
								for="confirm-password"
								class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>Confirm password</label
							>
							<input
								type="password"
								name="confirm-password"
								id="confirm-password"
								placeholder="••••••••"
								@input="checkPasswordMatch"
								:class="{
									'tw-outline-red-500': !isCorrect,
									'tw-outline-green-500': isCorrect,
								}"
								v-model="confirmPassword"
								class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
								required
							/>
						</div>
						<div class="tw-flex tw-items-start">
							<div class="tw-flex tw-items-center tw-h-5">
								<input
									id="terms"
									aria-describedby="terms"
									type="checkbox"
									class="tw-w-4 tw-h-4 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-3 focus:tw-ring-blue-300 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:focus:tw-ring-blue-600 dark:tw-ring-offset-gray-800"
									required
								/>
							</div>
							<div class="tw-ml-3 tw-text-sm">
								<label
									for="terms"
									class="tw-font-light tw-text-gray-500 dark:tw-text-gray-300"
									>I accept the
									<a
										class="tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-blue-500"
										href="#"
										>Terms and Conditions</a
									></label
								>
							</div>
						</div>
						<button
							type="submit"
							class="tw-w-full text-white tw-bg-blue-600 hover:tw-bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-slate-900 tw-duration-200 dark:focus:tw-ring-blue-800"
						>
							Create an account
						</button>
						<p
							class="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400"
						>
							Already have an account?
							<a
								href="/login"
								class="tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-blue-500"
								>Login here</a
							>
						</p>
					</v-form>
				</div>
			</div>
		</div>
	</section>
</template>
