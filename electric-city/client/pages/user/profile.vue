<template>
	<NuxtLayout>
		<v-table theme="dark">
			<tbody>
				<tr>
					<th class="text-left">First name</th>
					<td class="text-left">gaetan</td>
					<button>Edit</button>
				</tr>
				<tr>
					<th class="text-left">Name</th>
					<td class="text-left">leplae</td>
					<button>Edit</button>
				</tr>
				<tr>
					<th class="text-left">Email address</th>
					<td class="text-left">gaetan.leplae@hotmail.fr</td>
					<button>Edit</button>
				</tr>
				<tr>
					<th class="text-left">Password</th>
					<td class="text-left">mot de passe</td>
					<button>Edit</button>
				</tr>
			</tbody>
		</v-table>
	</NuxtLayout>
</template>

<script setup>
	definePageMeta({
		title: "Mon profil",
		description: "Page de profil utilisateur",
		layout: "custom",
	});
</script>
