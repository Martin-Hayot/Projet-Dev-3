<template>
	<NuxtLayout>
		<v-container>
			<v-row align="center" class="justify-end">
				<v-col cols="auto">
					<v-btn
						@click="navigateTo({ path: '/user/ordersshop' })"
						size="x-large"
						class="bg-blue"
						>+ New order</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
		<v-table theme="light">
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Date</th>
					<th class="text-left">Feedback</th>
					<th class="text-left">Type</th>
					<th class="text-left">Price</th>
					<th class="text-left">Command Id</th>
					<th class="text-left">Returned track</th>
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
					<td>
						<a
							v-if="order.masteredPath != NULL"
							:href="order.masteredPath"
							download="song.mp3"
							>{{ order.masteredPath }}</a
						>
						<span v-else>We are working on it</span>
					</td>
				</tr>
			</tbody>
		</v-table>
	</NuxtLayout>
</template>

<script setup>
	import { format } from "date-fns";
	definePageMeta({
		layout: "custom",
	});
	let data = ref();
	let formatedDate = [];

	const fetchData = () => {
		$fetch("http://localhost:3001/api/orders/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("accessToken"),
			},
		})
			.then((res) => {
				data = res;
				formatedDateFromData();
				console.log(data);
			})
			.catch((err) => console.log(err));
	};
	const formatedDateFromData = () => {
		for (let i = 0; i < data.length; i++) {
			formatedDate.push(format(new Date(data[i].createdAt), "dd/MM/yyyy"));
		}
	};

	fetchData();
</script>
