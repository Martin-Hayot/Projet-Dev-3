<template>
	<NuxtLayout>
		<v-sheet width="300" class="mx-auto tw-mt-20">
			<v-form :disabled="toggle" @submit.prevent="handleSubmit">
				<v-label>First name</v-label>
				<v-text-field v-model="data.firstname" name="firstname"></v-text-field>
				<v-label>Last name</v-label>
				<v-text-field v-model="data.lastname" name="lastname"></v-text-field>
				<v-label>Email</v-label>
				<v-text-field
					v-model="data.email"
					type="email"
					name="email"
				></v-text-field>
				<v-label>Password</v-label>
				<v-text-field
					placeholder="password"
					name="password"
					type="password"
				></v-text-field>
				<div v-show="toggle" class="tw-flex tw-justify-center tw-mt-8">
					<v-btn
						position="relative"
						size="x-large"
						class="bg-blue"
						@click="toggleForm"
					>
						Edit profile
					</v-btn>
				</div>
				<div v-show="!toggle" class="tw-flex tw-justify-center tw-mt-8">
					<v-btn
						position="relative"
						size="x-large"
						class="bg-blue"
						@click="toggleForm"
					>
						Cancel
					</v-btn>
				</div>
				<div v-show="!toggle" class="tw-flex tw-justify-center tw-mt-8">
					<v-btn
						type="submit"
						position="relative"
						size="x-large"
						class="bg-blue"
						@click="toggleForm"
					>
						Confirmed
					</v-btn>
				</div>
				<div v-show="toggle" class="tw-flex tw-justify-center tw-mt-4">
					<v-btn size="x-large" class="bg-blue mt-4"> Delete account</v-btn>
				</div>
			</v-form>
		</v-sheet>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		title: "Mon profil",
		description: "Page de profil utilisateur",
		layout: "custom",
	});

	const handleSubmit = async (e) => {
		const form = e.target;
		const accessToken = localStorage.getItem("accessToken");
		$fetch("http://localhost:3001/api/profile/edit", {
			method: "PUT",
			headers: {
				contentType: "application/json",
			},
			body: JSON.stringify({
				email: form.email.value,
				firstname: form.firstname.value,
				lastname: form.lastname.value,
				password: form.password.value,
				accessToken: accessToken,
			}),
		})
			.then((res) => {
				if (res.error) {
					alert(res.error);
				} else {
					localStorage.setItem("accessToken", res.accessToken);
					navigateTo({ path: "/user/profile" });
				}
			})
			.catch((err) => console.log(err));
	};
</script>
<script>
	export default {
		data: () => ({
			toggle: true,
			data: [],
		}),
		mounted() {
			this.fetchData();
		},
		methods: {
			toggleForm() {
				this.toggle = !this.toggle;
			},
			fetchData() {
				$fetch("http://localhost:3001/api/profile/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("accessToken"),
					},
				})
					.then((data) => {
						this.data = data;
						console.log(this.data);
					})
					.catch((err) => console.log(err));
			},
		},
	};
</script>
