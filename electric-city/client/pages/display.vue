<template>
  <div class="tw-py-8">
    <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-4">Merci d'avoir envoyé un message !</h1>
    <p class="tw-text-center tw-mb-8">Nous avons bien reçu votre message et nous y répondrons dès que possible.</p>
    <nuxt-link to="/" class="tw-block tw-mx-auto tw-text-center tw-mb-8 tw-px-4 tw-py-2 tw-rounded tw-bg-gray-200 hover:tw-bg-gray-300">Retour à la page d'accueil</nuxt-link>

    <div class="tw-max-w-lg tw-mx-auto">
      <h2 class="tw-text-lg tw-font-bold tw-mb-4">Derniers messages reçus :</h2>

      <!-- Menu déroulant pour filtrer par email -->
      <div class="tw-flex tw-justify-between tw-mb-4">
        <label for="email-filter" class="tw-text-gray-700 tw-font-medium tw-mr-2">Filtrer par email :</label>
        <select id="email-filter" v-model="selectedEmail" class="tw-block tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-sm tw-border-gray-300 tw-focus:border-blue-300 tw-focus:ring tw-focus:ring-blue-200 tw-focus:ring-opacity-50">
          <option value="">Tous</option>
          <option v-for="email in emails" :value="email">{{ email }}</option>
        </select>
      </div>

      <!-- Liste des messages filtrés -->
      <ul>
        <li v-for="donnee in filteredData" :key="donnee.id" class="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow tw-mb-4">
          <p class="tw-text-gray-800">{{ donnee.message }}</p>
          <p class="tw-text-sm tw-text-gray-500">{{ donnee.email }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const getMessages = async () => {
  try {
    const response = await $fetch("http://localhost:3001/display", {
      method: "GET",
    });
    data.value = response;
    console.log(response);
  } catch(error) {
    console.log(error);
  }
};

const data = ref([]);
getMessages();

const emails = computed(() => {
  const uniqueEmails = new Set(data.value.map(d => d.email));
  return [''].concat(Array.from(uniqueEmails));
});

const selectedEmail = ref('');

const filteredData = computed(() => {
  if (selectedEmail.value) {
    return data.value.filter(d => d.email === selectedEmail.value);
  } else {
    return data.value;
  }
});

</script>

<style scoped>

a {
  color: #4b5563;
  text-decoration: none;
}

a:hover {
  color: #1d4ed8;
}

body {
  background-color: #5975ad;
}

</style>
