<template>
	<NuxtLayout>
		<div>
			<h1 class="tw-text-4xl tw-m-5 tw-ml-16 tw-absolute">Orders</h1>
		</div>
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
			<thead class="tw-border-b-2 tw-border-black">
				<tr>
					<th class="text-left tw-border tw-border-black">Name</th>
					<th class="text-left tw-border tw-border-black">Date</th>
					<th class="text-left tw-border tw-border-black">Feedback</th>
					<th class="text-left tw-border tw-border-black">Type</th>
					<th class="text-left tw-border tw-border-black">Price</th>
					<th class="text-left tw-border tw-border-black">Command Id</th>
					<th class="text-left tw-border tw-border-black">Status</th>
				</tr>
			</thead>
			<tbody class="tw-border tw-border-black">
				<tr v-for="(order, i) in data" :key="order.id">
					<td class="tw-border tw-border-black">{{ order.songName }}</td>
					<td class="tw-border tw-border-black">{{ formatedDate[i] }}</td>
					<td class="tw-border tw-border-black">{{ order.feedback }}</td>
					<td class="tw-border tw-border-black">{{ order.masteringType }}</td>
					<td class="tw-border tw-border-black">{{ order.price }}€</td>
					<td class="tw-border tw-border-black">{{ order.id }}</td>
					<td class="tw-border tw-border-black">{{ order.status }}</td>
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
</script>
<script>
	import { format } from "date-fns";
	export default {
		data() {
			return {
				data: [],
				formatedDate: [],
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				$fetch("http://localhost:3001/api/orders/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("accessToken"),
					},
				})
					.then((res) => {
						this.data = res;
						console.log(this.data);
						console.log(this.data.status);
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
