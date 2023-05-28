<template>
    <section class="">
        <img
                src="StudioFond.jpg"
                class="tw-absolute -tw-z-20 tw-top-0 tw-left-0 tw-h-full tw-w-full tw-object-cover tw-brightness-75"
        />
        <div
                class="tw-absolute -tw-z-10 tw-h-full tw-w-full tw-bg-gradient-to-b tw-from-transparent tw-via-transparent tw-to-black"
        ></div>
        <NavBar />
    </section>

    <ColumnsBy2>
        <template v-slot:column1>
            <div class="tw-p-4 tw-text-left tw-overflow-hidden tw-border tw-rounded-2xl tw-bg-zinc-900 tw-border-transparent hover:tw-bg-zinc-800 hover:tw-border-orange-900 tw-duration-500">
                <h2 class="tw-font-bold tw-text-lg">
                    Our story
                </h2>
                <span class="tw-py-4 tw-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra nisi eros, ac ultricies
                    lacus finibus ut. Morbi eget scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel at.
                </span>
                <span class="tw-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra nisi eros, ac ultricies
                    lacus finibus ut. Morbi eget scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel at.
                </span>
            </div>
        </template>
        <template v-slot:column2>
            <div class="tw-overflow-hidden tw-border tw-rounded-2xl tw-border-transparent hover:tw-border-orange-900 tw-duration-500">
                <img class="tw-w-full tw-h-60 lg:tw-h-80 tw-object-cover" src="studio.jpeg">
            </div>
        </template>
    </ColumnsBy2>

    <ColumnBy1>
        <div class="tw-p-4 tw-text-left tw-overflow-hidden tw-shadow tw-border tw-rounded-2xl tw-bg-zinc-900 hover:tw-bg-zinc-800 tw-border-orange-900 tw-duration-500">
            <h2 class="tw-font-bold tw-text-lg">
                Our story
            </h2>
            <span class="tw-py-4 tw-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida mollis risus, sit amet dapibus
                magna. Proin ut facilisis sem. Sed efficitur, eros vel consequat vestibulum, risus libero ultricies
                felis, vitae pellentesque lectus lorem nec leo. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. In mattis efficitur eros, vel ornare dolor. Integer efficitur ex quis mi
                pharetra, ac blandit leo tristique. Aliquam facilisis nulla eget libero.
            </span>
        </div>
    </ColumnBy1>

    <ColumnsBy2 class="gradient">
        <template v-slot:column1>
            <div class="tw-overflow-hidden tw-border tw-rounded-2xl tw-border-transparent hover:tw-border-orange-900 tw-duration-500">
                <img class="tw-w-full tw-h-60 lg:tw-h-80 tw-object-cover" src="studio.jpeg">
            </div>
        </template>
        <template v-slot:column2>
            <div class="tw-p-4 tw-text-left tw-overflow-hidden tw-border tw-rounded-2xl tw-bg-zinc-900 tw-border-transparent hover:tw-bg-zinc-800 hover:tw-border-orange-900 tw-duration-500">
                <h2 class="tw-font-bold tw-text-lg">
                    Our story
                </h2>
                <span class="tw-py-4 tw-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra nisi eros, ac ultricies
                    lacus finibus ut. Morbi eget scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel at.
                </span>
                <span class="tw-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra nisi eros, ac ultricies
                    lacus finibus ut. Morbi eget scelerisque nulla. Nunc vitae nisl in tellus tristique bibendum vel at.
                </span>
            </div>
        </template>
    </ColumnsBy2>

    <Footer />
</template>

<style scoped>
.gradient {
    background-image: linear-gradient(
            to bottom,
            #000000,
            #3b161c,
            #712225,
            #a53521,
            #d35400
    );
}
</style>
<script setup>
import Columns from "~/components/ColumnsBy2.vue";
import ColumnsBy2 from "~/components/ColumnsBy2.vue";
</script>