<template>
	<div class="box">
		<h1 class="title">Welcome to your space</h1>
		<div class="boxRectangle">
			<NuxtLink to="/user/orders">
				<div class="rectangle">
					<h2 class="text">My Orders</h2>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-10 h-10 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
						/>
					</svg>
				</div>
			</NuxtLink>
			<NuxtLink to="/user/appointments">
				<div class="rectangle">
					<h2 class="text">Appointment</h2>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="white"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-10 h-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
						/>
					</svg>
				</div>
			</NuxtLink>
			<NuxtLink to="/user/profile">
				<div class="rectangle">
					<h2 class="text">My Profile</h2>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-10 h-10 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
	.rectangle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 260px;
		padding: 20px 1px;
		margin: 10px 0;
		text-align: center;
		position: relative;
		cursor: pointer;
		box-shadow: 0 10px 15px -3px rgba(33, 150, 243, 0.4),
			0 4px 6px -4px rgba(33, 150, 243, 0.4);
		border-radius: 10px;
		background-color: #6b6ecc;
		background: linear-gradient(45deg, #04051dea 0%, #2b566e 100%);
		transition: 0.8s;
	}
	.rectangle:hover {
		transform: scale(1.2);
		text-decoration: underline;
		text-decoration-color: #ffffff;
	}
	.text {
		color: #ffffff;
		font-weight: bold;
		font-size: 1.5rem;
		font-family: Helvetica, sans-serif;
	}
	.boxRectangle {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		height: 94.5vh;
		padding-bottom: 10rem;
	}
	.title {
		background-color: #1a202c;
		font-weight: bold;
		font-size: 3rem;
		text-align: center;
		color: #ffffff;
		font-family: Helvetica, sans-serif;
		padding-top: 4rem;
	}
	.box {
		background-color: #1a202c;
		height: 100vh;
	}
</style>
