<template>
	<div class="box">
		<h1>Order history</h1>
		<button class="bouton">Order now</button>
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
		},
	};
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
