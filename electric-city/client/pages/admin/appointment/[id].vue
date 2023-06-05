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
							<strong> Appointment Details {{ appointmentId }}</strong>
						</h1>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" class="d-flex align-center justify-center">
						<ul style="color: #ffffff">
							<li>
								<strong class="tw-text-[#2563eb]">Client: &nbsp&nbsp</strong>
								{{ clientData.firstname }} {{ clientData.lastname }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Email: &nbsp&nbsp</strong>
								{{ clientData.email }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Date: &nbsp&nbsp</strong>
								{{ data.date }}
							</li>
							<li>
								<strong class="tw-text-[#2563eb]">Number of tracks: &nbsp&nbsp</strong>
								{{ data.nbrOfTrack }}
							</li>
						</ul>
					</v-col>
					<v-col cols="12" class="d-flex align-center justify-center">
						<v-sheet
							width="30em"
							height="16em"
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
									v-model="data.description"
									readonly
								></textarea>
							</form>
						</v-sheet>
					</v-col>
				</v-row>
				<v-row class="text-right">
					<v-col cols="12">
						<v-btn
							class="hover:tw-text-[#03A9F4]"
							@click="navigateTo('/admin/appointments')"
							>Back</v-btn
						>
					</v-col>
				</v-row>
			</v-sheet>
		</div>
	</NuxtLayout>
</template>

<script setup>
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
				clientData: [],
				files: [],
			};
		},
		computed: {
			appointmentId() {
				return this.route.params.id;
			},
		},
		mounted() {
			this.getAppointment();
		},
		methods: {
			getAppointment() {
				$fetch("http://localhost:3001/api/agenda/details/" + this.appointmentId, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((res) => {
						this.data = res;
						this.clientData = res.client;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>
