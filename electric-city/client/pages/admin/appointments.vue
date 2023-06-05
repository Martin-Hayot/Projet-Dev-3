<template>
	<NuxtLayout>
		<div></div>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		layout: "custom-admin",
		title: "Admin Appointments",
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
	useSeoMeta({
		title: "Admin Appointments",
	});
</script>
