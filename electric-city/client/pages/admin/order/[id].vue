<template>
	<NuxtLayout>
		<div
			class="tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-[#111827]"
		>
			<v-sheet
				height="55em"
				width="50em"
				:elevation="10"
				color="#1F2937"
				rounded
				border
			>
				<v-row class="text-center">
					<v-col cols="12">
						<h1 class="display-1 text-white tw-text-2xl tw-mt-4">
							<strong> Order Details {{ orderId }}</strong>
						</h1>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" class="d-flex align-center justify-center">
						<ul style="color: #ffffff">
							<li>
								<strong class="tw-text-[#2563eb]">Id: &nbsp&nbsp</strong>
								{{ data.id }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Songname: &nbsp&nbsp</strong>
								{{ data.songName }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Price: &nbsp&nbsp</strong>
								{{ data.price }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]"
									>MasteringType: &nbsp&nbsp</strong
								>
								{{ data.masteringType }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">CreatedAt: &nbsp&nbsp</strong>
								{{ data.createdAt }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]"
									>ClientFile: &nbsp&nbsp</strong
								>
								{{ data.clientFile }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">ClientId: &nbsp&nbsp</strong>
								{{ data.clientId }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]"
									>MasteredFile: &nbsp&nbsp</strong
								>
								{{ data.masteredFile }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Status: &nbsp&nbsp</strong>
								{{ data.status }}
							</li>
						</ul>
					</v-col>
					<v-col cols="12" class="d-flex align-center justify-center">
						<v-sheet
							width="30em"
							height="28em"
							class="d-flex align-center justify-center"
							color="#374151"
							rounded="xl"
							elevation="20"
							auto-grow
							density="dense"
							v-if="true"
						>
							<form
								@submit.prevent="handleSubmit"
								class="tw-space-y-4 md:tw-space-y-6"
							>
								<h2 class="text-left tw-text-[#2563eb]">
									<strong>Feedback client</strong>
								</h2>
								<textarea
									class="scrollable-textarea tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-p-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-200 focus:tw-border-blue-300"
									rows="6"
									cols="50"
									v-model="data.feedback"
									readonly
								></textarea>

								<input
									type="file"
									simple
									required
									name="audioFile"
									class="tw-text-black tw-bg-black tw-text-white tw-bg-gray-700 tw-p-2 tw-rounded-lg tw-w-full tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500"
								/>
								<v-btn
									color="#2563EB "
									type="submit"
									block
									class="mt-2 text-white"
									text="Submit"
								></v-btn>
							</form>
						</v-sheet>
					</v-col>
				</v-row>
				<v-row class="text-center">
					<v-col cols="12">
						<v-btn
							class="hover:tw-text-[#03A9F4]"
							@click="navigateTo('/admin/orders')"
							>Back</v-btn
						>
					</v-col>
				</v-row>
			</v-sheet>
		</div>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		layout: "custom-admin",
		middleware: () => {
			$fetch("http://localhost:3001/api/auth/role", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("accessToken"),
				},
			}).then((res) => {
				if (res.role == "ADMIN") {
					return;
				} else {
					navigateTo("/login");
				}
			});
		},
	});
</script>
<script>
	export default {
		data() {
			return {
				route: useRoute(),
				data: [],
				files: [],
			};
		},
		computed: {
			orderId() {
				return this.route.params.id;
			},
		},
		mounted() {
			this.getOrder();
		},
		methods: {
			handleSubmit(e) {
				const form = e.target;
				const formData = new FormData(form);
				console.log(formData);
				formData.append("orderId", this.orderId);
				$fetch("http://localhost:3001/api/orders/admin/upload", {
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: formData,
				})
					.then((res) => {
						console.log(res);
						navigateTo("/admin/orders");
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getOrder() {
				$fetch("http://localhost:3001/api/orders/details/" + this.orderId, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((res) => {
						this.data = res;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
	useSeoMeta({
		title: "Order details",
	});
</script>
