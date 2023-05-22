<script setup>
	const error = useError();
</script>

<template>
	<div
		class="tw-flex tw-h-screen tw-justify-center tw-items-center tw-flex-col"
	>
		<h1 class="tw-text-9xl">{{ error.statusCode }}</h1>
		<p class="tw-my-7 tw-text-4xl">{{ error.message }}</p>
		<v-btn color="blue" density="default">
			<NuxtLink to="/" class="tw-text-2xl"> Go back home </NuxtLink>
		</v-btn>
	</div>
</template>
