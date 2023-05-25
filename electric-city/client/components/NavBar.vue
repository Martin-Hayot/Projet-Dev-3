<template>
    <div class="tw-container tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-6 tw-z-50">
        <nav
            class="tw-flex tw-items-center tw-justify-between tw-font-bold tw-text-white tw-z-50"
        >
            <NuxtImg
                src="./logo-white-cropped.png"
                class="tw-z-10 tw-h-20 tw-w-44 tw-ml-2 -tw-mt-4"
            ></NuxtImg>
            <div
                class="tw-hidden tw-h-10 tw-font-alata tw-mt-2 md:tw-flex md:tw-space-x-6 tw-z-10"
            >
                <div class="tw-group">
                    <NuxtLink
                        class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
                        to="/"
                    >Home</NuxtLink
                    >
                    <div
                        class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
                    ></div>
                </div>
                <div class="tw-group">
                    <NuxtLink
                        class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
                        to="/about"
                    >About</NuxtLink
                    >
                    <div
                        class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
                    ></div>
                </div>
                <div class="tw-group">
                    <NuxtLink
                        class="tw-text-white tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
                        to="/contact"
                    >Contact</NuxtLink
                    >
                    <div
                        class="tw-opacity-0 group-hover:tw-opacity-100 tw-mt-1 tw-duration-200 group-hover:tw-border-b group-hover:tw-border-blue-50"
                    ></div>
                </div>
                <div v-if="!isLoggedIn" class="tw-group">
                    <NuxtLink
                        class="tw-text-white tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10 tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200"
                        to="/login"
                    >Login</NuxtLink
                    >
                </div>
                <div v-if="!isLoggedIn" class="tw-group">
                    <NuxtLink
                        class="tw-text-white tw-border-2 tw-rounded-lg tw-px-4 tw-py-1 hover:tw-bg-white hover:tw-text-black tw-duration-200 tw-pb-2 tw-no-underline tw-text-2xl tw-font-semibold tw-z-10"
                        to="/signup"
                    >Sign Up</NuxtLink
                    >
                </div>
                <div v-else>Profile</div>
            </div>
            <div class="md:tw-hidden tw-z-50 tw-mt-6">
                <button
                    id="menu-btn"
                    type="button"
                    class="tw-z-50 hamburger md:tw-hidden focus:tw-outline-none"
                >
                    <span class="hamburger-top tw-z-40"></span>
                    <span class="hamburger-middle tw-z-40"></span>
                    <span class="hamburger-bottom tw-z-40"></span>
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>

</style>