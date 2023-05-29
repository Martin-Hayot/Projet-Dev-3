<template>
	<NuxtLayout>
		<div>
			<h1 class="tw-text-4xl tw-m-5 tw-ml-16 tw-absolute">Appointments</h1>
		</div>
		<v-container>
			<v-row align="center" class="justify-end">
				<v-col cols="auto">
					<v-btn
						@click="navigateTo('/user/new-appointments')"
						size="x-large"
						class="bg-blue"
						>+ New appointment</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
		<v-table theme="light">
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
	</NuxtLayout>
</template>

<script setup>
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
	let data = ref();
	const getAppointments = () => {
		$fetch("http://localhost:3001/api/agenda/appointments/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("accessToken"),
			},
		}).then((res) => {
			data = res.data;
		});
	};
	getAppointments();
</script>
