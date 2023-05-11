<template>
	<NuxtLayout>
		<div class="box">
			<h1>Order history</h1>
			<table>
				<thead>
					<tr>
						<th>Order id</th>
						<th>Musique track name</th>
						<th>Date of the order</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="commande in commandes" :key="commande.id">
						<td>{{ commande.id }}</td>
						<td>{{ commande.nomMusique }}</td>
						<td>{{ formatDate(commande.dateCommande) }}</td>
					</tr>
				</tbody>
			</table>
			<div class="text-center">
				<v-btn
						color="blue"
						@click="mailOrderConfirmation"
				>
					Order Now
				</v-btn>
			</div>
		</div>
		<div class="text-center">

			<v-dialog
					v-model="dialog"
					width="auto"
			>
				<v-card>
					<v-card-text>
						Un mail de confirmation avec les détails de votre commande vous a été envoyé par email.
					</v-card-text>
					<v-card-text>
						Si le mail n'est pas arrivé dans les 10 minutes suivant la commande, prenez contact par téléphone avec nous.
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</NuxtLayout>
</template>

<script>
	import {tr} from "vuetify/locale";
	export default {
		data() {
			return {
				dialog: false,
				commandes: [
					{
						id: 1,
						nomMusique: "Song 1",
						dateCommande: "2022-04-25",
					},
					{
						id: 2,
						nomMusique: "Song 2",
						dateCommande: "2022-04-24",
					},
					{
						id: 3,
						nomMusique: "Song 3",
						dateCommande: "2022-04-23",
					},
					{
						id: 4,
						nomMusique: "Song 4",
						dateCommande: "2022-04-23",
					},
					{
						id: 5,
						nomMusique: "Song 5",
						dateCommande: "2022-04-23",
					},
					{
						id: 6,
						nomMusique: "Song 6",
						dateCommande: "2022-04-23",
					},
				],
			};
		},
		methods: {
			formatDate(date) {
				const options = { year: "numeric", month: "long", day: "numeric" };
				return new Date(date).toLocaleDateString("fr-FR", options);
			},
			async mailOrderConfirmation() {
				// POST request using fetch with async/await
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: "Antoine",
						orderId: 1423
					})
				};
				const response = await fetch("http://localhost:3001/api/order/mail", requestOptions);
				//const data = response.json();
				this.dialog = true;
			},
		},
	};
</script>

<script setup>
	definePageMeta({
		layout: "custom",
	});
</script>

<style scoped>
	.bouton {
		position: absolute;
		top: 27em;
		left: 48em;
		background-color: black;
		color: white;
		font-weight: bold;
		text-align: center;
		padding: 1em;
	}
	.box {
		background-color: #ffffff;
		height: 100vh;
	}
	body {
		margin: 0;
		padding: 0;
		height: 100vh;
		font-family: "Roboto", sans-serif;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid #000000;
		width: 100vw;
		max-width: 800px;
		margin: 0 auto;
	}

	th,
	td {
		text-align: left;
		padding: 10px;
	}

	th {
		background-color: #000000;
		color: #fff;
	}

	tr:hover {
		background-color: #6d86c6;
	}

	h1 {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 30px;
	}

	@media only screen and (max-width: 768px) {
		table {
			max-width: 90%;
		}

		th,
		td {
			display: block;
			width: 100%;
		}

		th {
			text-align: center;
		}
	}
</style>
