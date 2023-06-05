<template>
	<NuxtLayout>
		<Calendar></Calendar>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		layout: "custom",
	});
	useSeoMeta({
		title: "New appointments",
	});
</script>
