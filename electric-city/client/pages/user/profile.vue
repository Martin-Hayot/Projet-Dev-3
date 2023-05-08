<template>
	<div class="p-6">
		<h1 class="text-2xl font-bold mb-4">Mon profil</h1>
		<div class="bg-white rounded-lg shadow-md p-6">
			<p class="mb-2">
				<span class="font-bold">Name:</span> {{ user.lastName }}
			</p>
			<p class="mb-2">
				<span class="font-bold">First Name:</span> {{ user.firstName }}
			</p>
			<p class="mb-2">
				<span class="font-bold">email address:</span> {{ user.email }}
			</p>
			<p class="mb-2">
				<span class="font-bold">Password:</span>
				<span v-if="showPassword">{{ user.password }}</span>
				<span v-else>******</span>
				<button
					@click="togglePasswordVisibility"
					class="ml-2 font-bold text-blue-500 hover:text-blue-700"
				>
					{{ showPassword ? "Masquer" : "Afficher" }}
				</button>
			</p>
		</div>
		<div class="mt-4 flex justify-end">
			<button
				class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
				<span>Edit Profile</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					lastName: "Doe",
					firstName: "John",
					email: "john.doe@example.com",
					password: "monsupermotdepasse",
				},
				showPassword: false,
			};
		},
		methods: {
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword;
			},
		},
	};
</script>
