<template>
	<NuxtLayout>
		<v-row class="fill-height">
			<v-col
				cols="12"
				md="6"
				offset-md="3"
				class="d-flex align-center justify-center"
			>
				<v-sheet
					height="55em"
					width="50em"
					:elevation="10"
					color="blue-lighten-3"
					rounded
					border
				>
					<v-row class="text-center">
						<v-col cols="12">
							<h1 class="display-1">
								<strong> Order Details {{ orderId }}</strong>
							</h1>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" class="d-flex align-center justify-center">
							<ul class="tw-text-black">
								<li>
									<strong class="tw-text-white">Id: &nbsp&nbsp</strong>
									{{ data.id }}
								</li>
								<li>
									<strong class="tw-text-white">Songname: &nbsp&nbsp</strong>
									{{ data.songName }}
								</li>
								<li>
									<strong class="tw-text-white">Feedback: &nbsp&nbsp</strong>
									{{ data.feedback }}
								</li>
								<li>
									<strong class="tw-text-white">Price: &nbsp&nbsp</strong>
									{{ data.price }}
								</li>
								<li>
									<strong class="tw-text-white"
										>MasteringType: &nbsp&nbsp</strong
									>
									{{ data.masteringType }}
								</li>
								<li>
									<strong class="tw-text-white">CreatedAt: &nbsp&nbsp</strong>
									{{ data.createdAt }}
								</li>
								<li>
									<strong class="tw-text-white">ClientFile: &nbsp&nbsp</strong>
									{{ data.clientFile }}
								</li>
								<li>
									<strong class="tw-text-white">ClientId: &nbsp&nbsp</strong>
									{{ data.clientId }}
								</li>
								<li>
									<strong class="tw-text-white"
										>MasteredFile: &nbsp&nbsp</strong
									>
									{{ data.masteredFile }}
								</li>
								<li>
									<strong class="tw-text-white">Status: &nbsp&nbsp</strong>
									{{ data.status }}
								</li>
							</ul>
						</v-col>
						<v-col cols="12" class="d-flex align-center justify-center">
							<v-sheet
								width="30em"
								height="28em"
								class="d-flex align-center justify-center"
								color="#BBDEFB"
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
									<h2 class="text-left"><strong>Send Message</strong></h2>
									<textarea
										class="scrollable-textarea tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-p-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-200 focus:tw-border-blue-300"
										rows="6"
										cols="50"
									></textarea>

									<v-file-input
										v-model="files"
										color="green"
										counter
										label="choose a file..."
										multiple
										placeholder="Select your files"
										variant="outlined"
										:show-size="1000"
										bg-color="white"
										required
									>
										<template v-slot:selection="{ fileNames }">
											<template
												v-for="(fileName, index) in fileNames"
												:key="fileName"
											>
												<v-chip
													v-if="index < 2"
													color="green"
													label
													size="small"
													class="me-2"
												>
													{{ fileName }}
												</v-chip>

												<span
													v-else-if="index === 2"
													class="text-overline text-black mx-2"
												>
													+{{ files.length - 2 }} File(s)
												</span>
											</template>
										</template>
									</v-file-input>
									<v-btn type="submit" block class="mt-2" text="Submit"></v-btn>
									<v-btn type="submit" block class="mt-2" text="Clear"></v-btn>
								</form>
							</v-sheet>
						</v-col>
					</v-row>
					<v-row class="text-right">
						<v-col cols="12">
							<v-btn
								class="hover:tw-text-green-500"
								@click="navigateTo('/admin/orders')"
								>Back</v-btn
							>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	definePageMeta({
		layout: "custom-admin",
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
				console.log(this.route.params.id);
				return this.route.params.id;
			},
		},
		mounted() {
			this.getOrder();
		},
		methods: {
			handleSubmit() {
				console.log(this.files);
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
</script>
