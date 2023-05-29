<template>
	<NuxtLayout>
		<v-table theme="light">
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Date</th>
					<th class="text-left">Feedback</th>
					<th class="text-left">Type</th>
					<th class="text-left">Price</th>
					<th class="text-left">Command Id</th>
					<th class="text-left">File path</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(order, i) in data" :key="order.id">
					<td>{{ order.songName }}</td>
					<td>{{ formatedDate[i] }}</td>
					<td>{{ order.feedback }}</td>
					<td>{{ order.masteringType }}</td>
					<td>{{ order.price }}€</td>
					<td>{{ order.id }}</td>
					<td>{{ order.filePath }}</td>
				</tr>
			</tbody>
		</v-table>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		layout: "custom-admin",
	});
</script>

<script>
	import { format } from "date-fns";
	export default {
		data() {
			return {
				data: [],
				formatedDate: [],
				dateObj: {},
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				$fetch("http://localhost:3001/api/orders/admin", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((data) => {
						this.data = data;
						this.formatedDateFromData();
					})
					.catch((err) => console.log(err));
			},
			formatedDateFromData() {
				for (let i = 0; i < this.data.length; i++) {
					this.formatedDate.push(
						format(new Date(this.data[i].createdAt), "dd/MM/yyyy")
					);
				}
			},
		},
	};
</script>
