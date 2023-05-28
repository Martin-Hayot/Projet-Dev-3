<template>
	<ClientOnly>
		<NuxtLayout>
			<Calendar></Calendar>
		</NuxtLayout>
	</ClientOnly>
</template>

<script setup>
	definePageMeta({
		layout: "custom",
	});
</script>
