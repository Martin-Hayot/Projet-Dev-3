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
	});
	const files = ref({});

	const handleSubmit = async (orderId) => {
		const file = files.value[orderId];
		if (!file) {
			alert("Please select a file.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("orderId", orderId);

		console.log("Order ID:", orderId);
		console.log("File:", file);
		console.log("Form Data:", formData);

		const response = await fetch(
			"http://localhost:3001/api/orders/admin/upload",
			{
				headers: {
					"Content-Type": "content-type: application/json",
				},
				method: "POST",
				body: formData,
			}
		)
			.then((res) => {
				navigateTo({ path: "/admin/orders" });
			})
			.catch((error) => {
				console.log(error);
			});
	};
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
						console.log(this.data);
					})
					.catch((error) => console.log(error));
			},
			formatedDateFromData() {
				for (let i = 0; i < this.data.length; i++) {
					this.formatedDate.push(
						format(new Date(this.data[i].createdAt), "dd/MM/yyyy")
					);
					console.log(this.formatedDate);
				}
			},
		},
	};
</script>
