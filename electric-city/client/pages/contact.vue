<template>
	<section class="relative">
		<img
			src="StudioFond.jpg"
			class="absolute -z-20 top-0 left-0 h-full w-full object-cover brightness-75"
		/>
		<div
			class="absolute -z-10 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black"
		></div>
		<div class="container max-w-7xl mx-auto px-6 py-6 z-50">
			<nav class="flex items-center justify-between font-bold text-white z-50">
				<NuxtImg
					src="./logo-white-cropped.png"
					class="z-10 h-20 w-44 ml-2 -mt-4"
				></NuxtImg>
				<div class="hidden h-10 font-alata mt-2 md:flex md:space-x-6 z-10">
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/"
							>Home</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/about"
							>About</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white no-underline text-2xl font-semibold z-10"
							to="/contact"
							>Contact</NuxtLink
						>
						<div
							class="opacity-0 group-hover:opacity-100 mt-1 duration-200 group-hover:border-b group-hover:border-blue-50"
						></div>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white pb-2 no-underline text-2xl font-semibold z-10 border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black duration-200"
							to="/login"
							>Login</NuxtLink
						>
					</div>
					<div class="group">
						<NuxtLink
							class="text-white border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black duration-200 pb-2 no-underline text-2xl font-semibold z-10"
							to="/signup"
							>Sign Up</NuxtLink
						>
					</div>
				</div>
				<div class="md:hidden z-50 mt-6">
					<button
						id="menu-btn"
						type="button"
						class="z-50 hamburger md:hidden focus:outline-none"
					>
						<span class="hamburger-top z-40"></span>
						<span class="hamburger-middle z-40"></span>
						<span class="hamburger-bottom z-40"></span>
					</button>
				</div>
			</nav>
			<div class="text-white text-center my-10 z-40 ">
				<div class="text-4xl font-bold tracking-wide leading-tight font-sans z-10 columns-2">
                    <div class="rounded-lg ml-10">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.465309475045!2d4.352545375594045!3d50.82254456050399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4f5f0c498b9%3A0x752576890080cd48!2sElectric%20City!5e0!3m2!1sfr!2sbe!4v1682519969362!5m2!1sfr!2sbe" 
                            width="550" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 float-right mr-10">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1
                                class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                            >
                                Contact us
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="https://formsubmit.co/ba.huwart@gmail.com" method="POST">
                                <div>
                                    <label
                                        for="message"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Your request</label
                                    >
                                    <input
                                        type="text"
                                        name="message"
                                        id="message"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required="true"
                                    />
                                    <input type="hidden" name="_captcha" value="false">
                                </div>
                                <div class="flex items-center justify-between">
                                </div>
                                <button
                                    type="submit"
                                    class="w-full text-white bg-blue-600 hover:bg-slate-900 duration-200 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onclick="alert('the message was sent')"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	</section>
    <Footer></Footer>
</template>

<style scoped>
	.hamburger {
		cursor: pointer;
		width: 24px;
		height: 24px;
		transition: all 0.25s;
		position: relative;
	}

	.hamburger-top,
	.hamburger-middle,
	.hamburger-bottom {
		position: absolute;
		width: 24px;
		height: 2px;
		top: 0;
		left: 0;
		background-color: #fff;
		transform: rotate(0deg);
		transition: all 0.5s;
	}

	.hamburger-middle {
		transform: translateY(7px);
	}

	.hamburger-bottom {
		transform: translateY(14px);
	}
</style>

