<template>
	<NuxtLayout>
		<section class="tw-bg-gray-50 dark:tw-bg-gray-900">
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
						<form
							class="tw-space-y-4 md:tw-space-y-6"
							@submit.prevent="handleSubmit"
						>
							<div>
								<label
									for="name"
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
									>Name of the song</label
								>
								<input
									type="text"
									name="songName"
									class="tw-text-white tw-bg-gray-700 tw-rounded-md tw-mb-2"
									required
								/>
								<span
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
									>Description
								</span>

								<textarea
									name="description"
									class="tw-bg-gray-50 tw-mb-4 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500 tw-max-h-40"
								>
								</textarea>
								<legend
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>
									Select your type of mastering :
								</legend>
								<label
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>
									<input
										type="radio"
										name="typeMastering"
										required
										value="master"
									/>
									Master : 85€
								</label>
								<label
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>
									<input type="radio" name="typeMastering" value="stemMaster" />
									Stem Master : 95€
								</label>
								<label
									class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>
									<input type="radio" name="typeMastering" value="mix" />
									Mix : 110€
								</label>
							</div>
							<label
								v-if="!isSelect"
								for="audio-files"
								class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>Select your audio file :
							</label>
							<label
								v-else
								for="audio-files"
								class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
								>Selected File :
							</label>
							<input
								type="file"
								@change="onFileSelect"
								simple
								required
								name="audioFile"
								class="tw-text-black tw-bg-black tw-text-white tw-bg-gray-700 tw-p-2 tw-rounded-lg tw-w-full tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500"
							/>
							<button
								type="submit"
								class="tw-w-full text-white tw-bg-blue-600 hover:tw-bg-slate-900 tw-duration-200 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-slate-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center"
							>
								Order
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
		<div class="text-center">
			<v-dialog v-model="dialog" width="auto">
				<v-card>
					<v-card-text>
						Un mail de confirmation vous a été envoyé par mail
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" block @click="returnToOrder"
							>Close Dialog</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</NuxtLayout>
</template>

<script setup>
	let dialog = ref(false);
	const returnToOrder = () => {
		dialog.value = false;
		navigateTo({ path: "/user/orders" });
	};
	definePageMeta({
		title: "Mon profil",
		description: "Page de profil utilisateur",
		layout: "custom",
		middleware: () => {
			$fetch("http://localhost:3001/api/auth/authenticate", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("accessToken"),
				},
			}).then((res) => {
				if (res.authenticated == true) {
					return;
				} else {
					navigateTo("/login");
				}
			});
		},
	});
	useSeoMeta({
		title: "New order",
	});
	const handleSubmit = async (e) => {
		const form = e.target;
		const formData = new FormData(form);
		// Retrieve other form data
		const typeMastering = form.typeMastering.value;
		let price = 0;
		if (typeMastering == "master") {
			price = 85;
		} else if (typeMastering == "stemMaster") {
			price = 95;
		} else if (typeMastering == "mix") {
			price = 110;
		}
		formData.append("price", JSON.stringify(price));

		formData.append("accessToken", localStorage.getItem("accessToken"));
		$fetch("http://localhost:3001/api/orders/order", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: formData,
		})
			.then((res) => {
				if (res.error) {
					alert(res.error);
				} else {
					let reqOptions = {
						method: "POST",
						body: res.newOrder,
					};
					$fetch("http://localhost:3001/api/mail/order", reqOptions);
					dialog.value = true;
				}
			})
			.catch((err) => console.log(err));
	};
</script>

<script>
	export default {
		data() {
			return {
				isSelect: false,
				files: [],
			};
		},
		methods: {
			onFileSelect(e) {
				this.files = e.target.files;
				this.isSelect = true;
			},
		},
	};
</script>

<style scoped>
	input[type="file"] {
		background-color: white;
		font: bold 14px Arial, Helvetica, sans-serif;
		color: #2c4355;
		border: 0;
		cursor: pointer;
	}
</style>
