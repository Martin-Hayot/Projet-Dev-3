<template>
	<NuxtLayout>
		<div>
			<h1 class="tw-text-4xl tw-m-5 tw-ml-16 tw-absolute tw-hidden lg:tw-block">
				Appointments
			</h1>
		</div>
		<v-table theme="light" class="tw-mt-16">
			<thead class="tw-border-b-2 tw-border-black">
			<tr class="">
				<th class="text-left tw-border tw-border-black">
					<strong>Date</strong>
				</th>
				<th class="text-left tw-border tw-border-black">
					<strong>Appointment id</strong>
				</th>
				<th class="text-left tw-border tw-border-black">
					<strong>Details</strong>
				</th>
			</tr>
			</thead>
			<tbody class="tw-border tw-border-black">
			<tr
					v-for="(appointment, i) in data"
					:key="appointment.id"
					class="hover:tw-bg-gray-200"
			>
				<td class="tw-border tw-border-black">{{ appointment.date }}</td>
				<td class="tw-border tw-border-black">{{ appointment.id }}</td>
				<td class="tw-border tw-border-black">
					<v-btn
							class="hover:tw-text-green-500"
							@click="navigateTo('/admin/appointment/' + appointment.id)"
					>Details</v-btn
					>
				</td>
			</tr>
			</tbody>
		</v-table>
	</NuxtLayout>
</template>

<script setup>
definePageMeta({
	layout: "custom-admin",
	title: "Admin Appointments",
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
useSeoMeta({
	title: "Admin Appointments",
});
</script>

<script>
export default {
	data() {
		return {
			data: [],
		};
	},
	methods: {
		getAppointments() {
			$fetch("http://localhost:3001/api/agenda/appointments/all", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("accessToken"),
				},
			}).then((res) => {
				this.data = res.data;
			});
		},
	},
	mounted() {
		this.getAppointments();
	},
};
</script>
