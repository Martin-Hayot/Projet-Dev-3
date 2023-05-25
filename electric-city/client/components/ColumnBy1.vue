<template>
    <section class="tw-bg-black tw-text-white">
        <div class="tw-p-10 tw-grid tw-grid-cols-1 tw-gap-8">
            <div class="tw-m-auto">
                <slot />
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ColumnsBy2"
    }
</script>

<style scoped>

</style>
