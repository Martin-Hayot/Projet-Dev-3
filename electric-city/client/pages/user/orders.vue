<template>
	<NuxtLayout>
		<div>
			<h1 class="tw-text-4xl tw-m-5 tw-ml-16 tw-absolute">Orders</h1>
		</div>
		<v-container>
			<v-row align="center" class="justify-end">
				<v-col cols="auto">
					<v-btn
						@click="navigateTo({ path: '/user/new-order' })"
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
					<td class="tw-border tw-border-black">
						<span
							:class="{
								'tw-text-green-500': order.status == 'FINISH',
								'tw-text-[#FF9800]': order.status == 'IN-PROGRESS',
								'tw-text-[#F44336]': order.status == 'PENDING',
							}"
							>{{ order.status }}</span
						>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<v-btn
							v-if="order.masteredFile != 'NULL'"
							@click="downloadSong(order.masteredFile, order.id)"
							class="tw-border tw-border-black hover:tw-text-blue-500"
						>
							<Icon name="carbon:download" size="1.4em" color="black" />
							<strong>Download</strong>
						</v-btn>
					</td>
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
	useSeoMeta({
		title: "Orders",
		description: "Orders",
	});
</script>
<script>
	import { format, set } from "date-fns";
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
			handler(file, filename) {
				const url = URL.createObjectURL(file);
				let a = document.createElement("a");
				a.setAttribute("href", url);
				a.setAttribute("download", filename);
				a.style.display = "none";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				setTimeout(() => {
					URL.revokeObjectURL(url);
				}, 500);
			},
			downloadSong(fileName, id) {
				fetch("http://localhost:3001/api/orders/download", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						file: fileName,
						orderId: id,
					}),
				})
					.then((res) => res.blob())
					.then((blob) => {
						const orderId = id;
						const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
						const newFileName = orderId + "." + extension;
						this.handler(blob, newFileName);
					})
					.catch((error) => {
						console.error(
							"Une erreur s'est produite lors du téléchargement du fichier :",
							error
						);
					});
			},
		},
	};
</script>
