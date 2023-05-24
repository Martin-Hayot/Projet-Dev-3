<template>
    <div class="tw-container tw-py-8">
      <div class="tw-commande-container">
        <h1 class="tw-title tw-text-3xl tw-font-bold tw-text-center tw-mb-4">Merci d'avoir envoyé un commande !</h1>
        <p class="tw-description tw-text-center tw-mb-8">Nous avons bien reçu votre commande et nous y répondrons dès que possible.</p>
      </div>
  
      <div class="tw-commandes tw-max-w-lg tw-mx-auto">
        <h2 class="tw-subtitle tw-text-2xl tw-font-bold tw-mb-4">Dernières commandes reçues :</h2>
  
        <!-- Liste des commandes -->
        <ul class="tw-commande-list">
          <li v-for="item in data" :key="item.id" class="tw-commande-item tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-lg tw-mb-4">
            <p class="tw-commande tw-text-gray-800">Id de la commande : <br>{{ item.id }}</p>
            <div class="tw-metadata tw-text-sm tw-text-gray-500 tw-flex tw-flex-wrap tw-gap-2 tw-mt-2">
              <span class="tw-metadata-item">Date de création : {{ item.createdAt }}</span>
              <span class="tw-metadata-item">Date de mise à jour : {{ item.updatedAt }}</span>
              <span class="tw-metadata-item">ID client : {{ item.clientId }}</span>
              <span class="tw-metadata-item">Feedback : {{ item.feedback }}</span>
              <span class="tw-metadata-item">Prix : {{ item.price }}</span>
              <span class="tw-metadata-item">Nombre de track : {{ item.numbOfTrack }}</span>
              <span class="tw-metadata-item">ID de mastering : {{ item.masteringId }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const data = ref([]);
  
  const getcommandes = async () => {
    try {
      const response = await $fetch("http://localhost:3001/display2", {
        method: "GET",
      });
      data.value = response;
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  };
  
  onMounted(getcommandes);
  </script>
  
  <style scoped>
  .tw-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .tw-commande-container {
    margin-bottom: 2rem;
  }
  
  .tw-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1a202c;
  }
  
  .tw-description {
    font-size: 1.125rem;
    color: #4a5568;
  }
  
  .tw-subtitle {
    font-size: 1.75rem;
    font-weight: bold;
    color: #1a202c;
  }
  
  .tw-commande-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .tw-commande-item {
    background-color: #f7fafc;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
  }
  
  .tw-commande-item:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .tw-commande {
    font-size: 1.125rem;
    color: #2d3748;
  }
  
  .tw-metadata {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tw-metadata-item {
    font-size: 0.875rem;
    color: #718096;
  }
  </style>
  