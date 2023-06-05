<template>
	<NuxtLayout>
		<v-sheet width="300" class="mx-auto tw-mt-32">
			<v-form @submit.prevent="submit" :disabled="!model">
				<v-alert
					v-show="alertShow"
					:type="status"
					:title="status"
					:text="messageStatus"
				></v-alert>
				<v-text-field
					v-model="firstname.value.value"
					:counter="10"
					:error-messages="firstname.errorMessage.value"
					label="First Name"
				></v-text-field>

				<v-text-field
					v-model="lastname.value.value"
					:counter="10"
					:error-messages="lastname.errorMessage.value"
					label="Last Name"
				></v-text-field>

				<v-text-field
					v-model="email.value.value"
					:error-messages="email.errorMessage.value"
					label="E-mail"
				></v-text-field>

				<v-text-field
					v-model="password.value.value"
					:error-messages="password.errorMessage.value"
					label="Password"
					type="password"
				></v-text-field>

				<v-switch
					v-model="toggle.value.value"
					:error-messages="toggle.errorMessage.value"
					inset
					true-value="yes"
					false-value="no"
					color="info"
					label="Validate changes"
				></v-switch>

				<v-btn class="me-4" type="submit" :disabled="!model"> submit </v-btn>

				<v-btn @click="handleReset" :disabled="!model"> clear </v-btn>
			</v-form>
			<v-switch
				v-model="model"
				@click="cancel"
				hide-details
				inset
				:label="model ? 'Editing' : 'Edit'"
				color="success"
			></v-switch>
		</v-sheet>
	</NuxtLayout>
</template>

<script>
	import { useField, useForm } from "vee-validate";
	definePageMeta({
		title: "Mon profil",
		description: "Page de profil utilisateur",
		layout: "custom-admin",
		middleware: () => {
			$fetch("http://localhost:3001/api/auth/role", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("accessToken"),
				},
			}).then((res) => {
				if (res.role == "ADMIN") {
					return;
				} else {
					navigateTo("/login");
				}
			});
		},
	});

	export default {
		setup() {
			const { handleSubmit, handleReset } = useForm({
				validationSchema: {
					firstname(value) {
						if (value?.length >= 2) return true;

						return "Name needs to be at least 2 characters.";
					},
					lastname(value) {
						if (value?.length >= 2) return true;

						return "Name needs to be at least 2 characters.";
					},
					email(value) {
						if (/^[a-z0-9.0-9-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

						return "Must be a valid e-mail.";
					},
					password(value) {
						if (value?.length >= 2) return true;

						return "Password needs to be at least 2 characters.";
					},
					toggle(value) {
						if (value === "yes") return true;

						return "Must be checked.";
					},
				},
			});
			const firstname = useField("firstname");
			const lastname = useField("lastname");
			const email = useField("email");
			const password = useField("password");
			const toggle = useField("toggle");
			const accessToken = localStorage.getItem("accessToken");
			const alertShow = ref(false);
			const status = ref("success");
			const model = ref(false);
			const messageStatus = ref("success edit");

			const submit = handleSubmit((values) => {
				console.log(values);
				$fetch("http://localhost:3001/api/profile/edit", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: {
						email: values.email,
						firstname: values.firstname,
						lastname: values.lastname,
						password: values.password,
						accessToken: accessToken,
					},
				})
					.then((res) => {
						localStorage.setItem("accessToken", res.accessToken);
						alertShow.value = true;
						status.value = "success";
						password.value.value = "";
						toggle.value.value = "no";
						messageStatus.value = "Your profile has been updated successfully";
						model.value = false;
						setTimeout(() => {
							alertShow.value = false;
						}, 3000);
					})
					.catch((err) => {
						console.log(err);
						console.log("erreur est ici");
						messageStatus.value = err.message;
						alertShow.value = true;
						status.value = "error";
						setTimeout(() => {
							alertShow.value = false;
						}, 3000);
					});
			});

			return {
				firstname,
				lastname,
				email,
				password,
				toggle,
				alertShow,
				status,
				accessToken,
				model,
				messageStatus,
				submit,
				handleReset,
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				$fetch("http://localhost:3001/api/profile/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("accessToken"),
					},
				})
					.then((data) => {
						this.firstname.value.value = data.firstname;
						this.lastname.value.value = data.lastname;
						this.email.value.value = data.email;
					})
					.catch((err) => console.log(err));
			},
			cancel() {
				if (this.model) {
					this.fetchData();
				}
			},
		},
	};
</script>
