<template>
	<ClientOnly>
		<v-app style="height: 100%">
			<v-tabs
				fixed-tabs
				bg-color="#0F172A"
				height="70"
				hide-slider="true"
				v-if="!(orderPath === '/user/ordersshop')"
			>
				<NuxtLink to="/">
					<NuxtImg
						src="./logo-white-cropped.png"
						class="tw-z-10 tw-h-20 tw-w-44 tw-ml-2 -tw-mt-4"
					>
					</NuxtImg>
				</NuxtLink>
				<v-tab
					to="/user/orders"
					class="text-white"
					:class="{
						'text-blue': router.currentRoute.value.path == '/user/orders',
					}"
				>
					<Icon name="material-symbols:keyboard-command-key" size="1.6em" />
					Orders
				</v-tab>
				<v-tab
					to="/user/appointments"
					class="text-white"
					:class="{
						'text-blue': router.currentRoute.value.path == '/user/appointments',
					}"
				>
					<Icon name="material-symbols:calendar-month-outline" size="1.5em" />
					Appointments
				</v-tab>
				<v-tab
					to="/user/profile"
					class="text-white"
					:class="{
						'text-blue': router.currentRoute.value.path == '/user/profile',
					}"
				>
					Profile
				</v-tab>
			</v-tabs>
			<v-card style="height: 100%">
				<v-layout style="height: 100%">
					<v-navigation-drawer class="bg-blue" theme="dark" permanent>
						<v-list-item
							lines="two"
							prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
							title="Gaetan Leplae"
							subtitle="gaetan.leplae@hotmail.fr"
						></v-list-item>
						<v-list color="transparent">
							<v-list-item @click="navigateTo({ path: '/' })"
								><Icon name="mdi:home" size="1.6em" /> Home</v-list-item
							>
							<v-list-item @click="navigateTo({ path: '/user/profile' })"
								><Icon
									name="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write"
									size="1.5rem"
								/>
								Account</v-list-item
							>
							<v-list-item @click="navigateTo({ path: '/user/dashboard' })"
								><Icon name="ic:twotone-menu-book" size="1.5em" />
								Dashboard</v-list-item
							>
							<v-list-item @click="navigateTo({ path: '/user/ordersshop' })"
								><Icon
									name="material-symbols:keyboard-command-key"
									size="1.6em"
								/>
								Order</v-list-item
							>
							<v-list-item @click="navigateTo({ path: '/contact' })"
								><Icon name="material-symbols:contact-mail" size="1.5em" />
								Contact Us</v-list-item
							>
						</v-list>

						<template v-slot:append>
							<div class="pa-2">
								<v-btn block @click="logout">
									<Icon name="ri:logout-box-r-line" size="1.4rem"></Icon>Logout
								</v-btn>
							</div>
						</template>
					</v-navigation-drawer>
					<v-main> <slot /></v-main>
				</v-layout>
			</v-card>
		</v-app>
	</ClientOnly>
</template>
<script setup>
	const router = useRouter();
	const orderPath = router.currentRoute.value.path;
	function logout() {
		localStorage.removeItem("accessToken");
		navigateTo({ path: "/" });
	}
</script>
