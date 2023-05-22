<template>
	<ClientOnly>
		<v-app>
			<v-tabs fixed-tabs bg-color="#0F172A" height="70" hide-slider="true">
				<NuxtLink to="/">
					<NuxtImg
						src="./logo-white-cropped.png"
						class="tw-z-10 tw-h-20 tw-w-44 tw-ml-2 -tw-mt-4"
					>
					</NuxtImg>
				</NuxtLink>
				<v-tab
					to="/admin/orders"
					class="text-white"
					:class="{
						'text-blue': router.currentRoute.value.path == '/admin/orders',
					}"
				>
					Orders
				</v-tab>
				<v-tab
					to="/admin/appointments"
					class="text-white"
					:class="{
						'text-blue':
							router.currentRoute.value.path == '/admin/appointments',
					}"
				>
					Appointments
				</v-tab>
				<v-tab
					to="/admin/profile"
					class="text-white"
					:class="{
						'text-blue': router.currentRoute.value.path == '/admin/profile',
					}"
				>
					Profile
				</v-tab>
			</v-tabs>
			<v-main> <slot /></v-main>
		</v-app>
	</ClientOnly>
</template>
<script setup>
	const router = useRouter();
</script>
