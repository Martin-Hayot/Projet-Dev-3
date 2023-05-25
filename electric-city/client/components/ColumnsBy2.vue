<template>
    <section class="tw-bg-black tw-text-white">
        <div class="tw-p-10 tw-grid md:tw-grid-cols-2 tw-gap-8">
            <div class="tw-m-auto">
                <slot name="column1" />
            </div>
            <div class="tw-m-auto">
                <slot name="column2" />
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