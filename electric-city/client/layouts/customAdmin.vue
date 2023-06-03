<template>
	<v-card style="height: 100%">
		<v-layout style="height: 100%">
			<v-navigation-drawer class="bg-blue" theme="dark" permanent>
				<v-list-item
					lines="two"
					prepend-avatar="https://api.iconify.design/ooui:user-avatar-outline.svg?color=%23ffffff"
					:title="fullName"
					:subtitle="email"
					style="white-space: nowrap; overflow: hidden"
				></v-list-item>
				<v-list color="transparent">
					<v-list-item @click="navigateTo({ path: '/' })"
						><Icon name="mdi:home" size="1.6em" /><strong>
							Home</strong
						></v-list-item
					>
					<v-list-item @click="navigateTo({ path: '/admin/profile' })"
						><Icon
							name="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write"
							size="1.5rem"
						/>
						<strong> Account</strong></v-list-item
					>
					<v-list-item @click="navigateTo({ path: '/admin/appointments' })"
						><Icon
							name="material-symbols:calendar-month-outline-rounded"
							size="1.5em"
						/>
						<strong> Appointments</strong>
					</v-list-item>
					<v-list-item @click="navigateTo({ path: '/admin/orders' })"
						><Icon name="mdi:shopping-music" size="1.6em" />
						<strong> Order</strong></v-list-item
					>
					<v-list-item @click="navigateTo({ path: '/admin/statistics' })"
						><Icon name="ion:stats-chart" size="1.6em" />
						<strong> Statistics</strong></v-list-item
					>
					<v-list-item @click="navigateTo({ path: '/contact' })"
						><Icon name="material-symbols:contact-mail" size="1.5em" />
						<strong> Contact Us</strong></v-list-item
					>
					<v-list-item @click="navigateTo({ path: '/admin/display' })"
						><Icon name="material-symbols:mail-rounded" size="1.5em" />
						<strong> Messages</strong>
					</v-list-item>
				</v-list>

				<template v-slot:append>
					<div class="pa-2">
						<v-btn block @click="logout">
							<Icon name="ri:logout-box-r-line" size="1.4rem"></Icon
							><strong>Logout</strong>
						</v-btn>
					</div>
				</template>
			</v-navigation-drawer>
			<v-main style="height: 100vh"> <slot /></v-main>
		</v-layout>
	</v-card>
</template>
<script setup>
	let fullName = ref("");
	let email = ref("");
	const router = useRouter();
	const orderPath = router.currentRoute.value.path;
	function logout() {
		localStorage.removeItem("accessToken");
		navigateTo({ path: "/" });
	}

	onMounted(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		$fetch("http://localhost:3001/api/profile/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("accessToken"),
			},
		})
			.then((data) => {
				email.value = data.email;
				fullName.value = data.firstname + " " + data.lastname;
			})
			.catch((err) => console.log(err));
	});
</script>
