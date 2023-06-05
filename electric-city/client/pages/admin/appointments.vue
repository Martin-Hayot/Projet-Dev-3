<template>
	<NuxtLayout>
		<div>
			<h1 class="tw-text-4xl tw-m-5 tw-ml-16 tw-absolute tw-hidden lg:tw-block">
				Appointments
			</h1>
		</div>
		<v-table theme="light" class="tw-mt-16">
			<thead>
			<tr>
				<th>Date</th>
				<th>Number of tracks</th>
				<th>Price</th>
				<th>description</th>
				<th>Appointment id</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="appointment in data" :key="appointment.id">
				<td>{{ appointment.date }}</td>
				<td>{{ appointment.nbrOfTrack }}</td>
				<td>{{ appointment.nbrOfTrack * 85 }}€</td>
				<td>{{ appointment.description }}</td>
				<td>{{ appointment.id }}</td>
			</tr>
			</tbody>
		</v-table>
		<v-table theme="light">
			<thead class="tw-border-b-2 tw-border-black">
			<tr class="">
				<th class="text-left tw-border tw-border-black">
					<strong>Date</strong>
				</th>
				<th class="text-left tw-border tw-border-black">
					<strong>Client</strong>
				</th>
				<th class="text-left tw-border tw-border-black">
					<strong>Number of tracks</strong>
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
				<td class="tw-border tw-border-black">{{ appointment.date }}</td>
				<td class="tw-border tw-border-black">{{ appointment.nbrOfTrack }}</td>
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

<script>
definePageMeta({
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
