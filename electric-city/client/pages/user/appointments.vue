<template>
	<NuxtLayout>
		<ClientOnly>
			<Calendar></Calendar>
		</ClientOnly>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		layout: "custom",
		middleware: ["auth"],
	});
</script>
