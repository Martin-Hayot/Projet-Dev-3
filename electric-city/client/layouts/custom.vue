<template>
	<ClientOnly>
		<v-app id="inspire">
			<v-navigation-drawer permanent absolute v-model="drawer">
				<v-list>
					<v-list-item
						prepend-avatar="/user.png"
						title="John Doe"
						subtitle="john@google.com"
					>
					</v-list-item>
				</v-list>

				<v-divider :thickness="2" class="border-opacity-100"></v-divider>
				<v-list>
					<v-list-item title="My Orders" to="/user/orders"> </v-list-item>
					<v-list-item title="My Appointments" to="/user/appointments">
					</v-list-item>
					<v-list-item title="My Profile" to="/user/profile"> </v-list-item>
				</v-list>

				<template v-slot:append>
					<div class="pa-10">
						<v-btn block> Logout </v-btn>
					</div>
				</template>
			</v-navigation-drawer>

			<v-app-bar>
				<v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

				<v-toolbar-title>{{ page }}</v-toolbar-title>
			</v-app-bar>

			<v-main> <slot /></v-main>
		</v-app>
	</ClientOnly>
</template>

<script>
	export default {
		data: () => ({ drawer: null }),
	};
</script>

<script setup>
	const router = useRouter();
	let page = router.currentRoute.value.name;
	page = page.split("-")[1];
	page = page.charAt(0).toUpperCase() + page.slice(1);
</script>
