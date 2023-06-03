<template>
	<NuxtLayout>
		<ClientOnly>
			<v-table theme="light">
				<thead>
					<tr>
						<th class="text-left">Name</th>
						<th class="text-left">Date</th>
						<th class="text-left">Feedback</th>
						<th class="text-left">Type</th>
						<th class="text-left">Price</th>
						<th class="text-left">Command Id</th>
						<th class="text-left">Client Id</th>
						<th class="text-left">Original track</th>
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
						<td>{{ order.clientId }}</td>
						<td>
							<button @click="downloadSong(order.clientFile)">Download</button>
						</td>
						<td>
							<input type="file" @change="selectFile" />
							<button @click="uploadFile">Upload</button>
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
			selectFile(event) {
				this.selectedFile = event.target.files[0];
			},
			uploadFile() {
				const formData = new FormData();
				formData.append("audioFile", this.selectedFile);
				fetch("http://localhost:3001/api/orders/admin/upload", {
					method: "POST",
					headers: {},
					body: formData,
				}).then((res) => {
					console.log(res);
				});
			},
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
		},
	};
</script>
