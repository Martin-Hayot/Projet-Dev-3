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
	});
</script>
