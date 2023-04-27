<template>
	<div class="box">
		<h1 class="title">Welcome to your space</h1>
		<div class="boxRectangle">
			<NuxtLink to="/user/orders">
				<div class="rectangle">
					<h2 class="text">My Orders</h2>
				</div>
			</NuxtLink>
			<NuxtLink to="/user/appointments">
				<div class="rectangle">
					<h2 class="text">Appointment</h2>
				</div>
			</NuxtLink>
			<NuxtLink to="/user/profile">
				<div class="rectangle">
					<h2 class="text">My Profile</h2>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script>
	definePageMeta({
		middleware: function (to, from) {
			const store = useAuthStore();
			store.loadDataFromLocalStorage();
			const user = store.user;

			if (!user.value) {
				navigateTo("/login");
			}
		},
	});
</script>

<style scoped>
	.rectangle {
		background-color: #1f2123;
		padding: 6rem;
		border-radius: 1.5rem;
		box-shadow: 1rem 1rem 1rem black;
		transition: transform 0.5s ease;
	}
	.rectangle:hover {
		transform: scale(1.1);
		text-decoration: underline;
		text-decoration-color: white;
	}
	.text {
		color: #f4b456;
		font-weight: bold;
		font-size: 1.5rem;
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
		background-color: #393a3e;
		font-weight: bold;
		font-size: 3rem;
		text-align: center;
		color: #f4b456;
	}
	.box {
		background-color: #393a3e;
		height: 100vh;
	}
</style>
