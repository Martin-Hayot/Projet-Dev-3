<template>
	<NuxtLayout>
		<ClientOnly>
			<v-table theme="light">
				<thead class="tw-border-b-2 tw-border-black">
					<tr class="">
						<th class="text-left tw-border tw-border-black">
							<strong>Name</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Date</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Feedback</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Type</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Price</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Command Id</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Client Id</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Original track</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Status</strong>
						</th>
						<th class="text-left tw-border tw-border-black">
							<strong>Details</strong>
						</th>
					</tr>
				</thead>
				<tbody class="tw-border tw-border-black">
					<tr
						v-for="(order, i) in data"
						:key="order.id"
						class="hover:tw-bg-gray-200"
					>
						<td class="tw-border tw-border-black">{{ order.songName }}</td>
						<td class="tw-border tw-border-black">{{ formatedDate[i] }}</td>
						<td class="tw-border tw-border-black">{{ order.feedback }}</td>
						<td class="tw-border tw-border-black">{{ order.masteringType }}</td>
						<td class="tw-border tw-border-black">{{ order.price }}€</td>
						<td class="tw-border tw-border-black">{{ order.id }}</td>
						<td class="tw-border tw-border-black">{{ order.clientId }}</td>
						<td class="tw-border tw-border-black">
							<v-btn
								@click="downloadSong(order.clientFile)"
								class="tw-border tw-border-black hover:tw-text-blue-500"
							>
								<Icon name="carbon:download" size="1.4em" color="black" />
								<strong>Download</strong>
							</v-btn>
						</td>
						<td class="tw-border tw-border-black">
							<v-row>
								<v-col cols="12" class="py-2">
									<v-btn-toggle
										mandatory
										rounded="0"
										v-model="order.status"
										:color="colorToggle[order.status]"
										group
									>
										<v-btn
											name="PENDING"
											value="PENDING"
											@click="statusOrder('PENDING', order.id)"
										>
											Pending
										</v-btn>

										<v-btn
											name="IN-PROGRESS"
											value="IN-PROGRESS"
											@click="statusOrder('IN-PROGRESS', order.id)"
										>
											In progress
										</v-btn>

										<v-btn
											name="FINISH"
											value="FINISH"
											@click="statusOrder('FINISH', order.id)"
										>
											Finish
										</v-btn>
									</v-btn-toggle>
								</v-col>
							</v-row>
						</td>
						<td class="tw-border tw-border-black">
							<v-btn
								class="hover:tw-text-green-500"
								@click="navigateTo('/admin/order/' + order.id)"
								>Details</v-btn
							>
						</td>
					</tr>
				</tbody>
			</v-table>
		</ClientOnly>
	</NuxtLayout>
</template>

<script setup>
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
	const files = ref({});
</script>

<script>
	import { format } from "date-fns";
	export default {
		data() {
			return {
				data: [],
				formatedDate: [],
				dateObj: {},
				selectedFile: null,
				colorToggle: {
					PENDING: "grey",
					"IN-PROGRESS": "orange",
					FINISH: "green",
				},
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			handler(file, filename) {
				const url = URL.createObjectURL(file);
				const a = document.createElement("a");
				a.setAttribute("href", url);
				a.setAttribute("download", filename);
				a.style.display = "none";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			},
			downloadSong(fileName) {
				fetch("http://localhost:3001/api/orders/admin/download", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						file: fileName,
					}),
				})
					.then((res) => res.blob())
					.then((blob) => this.handler(blob, fileName))
					.catch((error) => {
						console.error(
							"Une erreur s'est produite lors du téléchargement du fichier :",
							error
						);
					});
			},
			//get all orders from all users
			fetchData() {
				fetch("http://localhost:3001/api/orders/admin", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((data) => {
						this.data = data;
						this.formatedDateFromData();
					})
					.catch((error) => console.log(error));
			},
			formatedDateFromData() {
				for (let i = 0; i < this.data.length; i++) {
					this.formatedDate.push(
						format(new Date(this.data[i].createdAt), "dd/MM/yyyy")
					);
				}
			},
			statusOrder(status, id) {
				console.log("j ai modifier le status");
				fetch("http://localhost:3001/api/orders/edit/status", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						status: status,
						id: id,
					}),
				})
					.then((response) => response.json())
					.catch((error) => console.log(error));
			},
		},
	};
</script>
