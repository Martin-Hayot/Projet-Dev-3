<template>
    <NuxtLayout>
      <div class="tw-py-8">
        <div class="tw-max-w-lg tw-mx-auto">
          <h1 class="tw-text-lg tw-font-bold tw-mb-4">Derniers messages reçus :</h1>
  
          <div class="tw-flex tw-justify-between tw-mb-4">
            <label for="email-filter" class="tw-text-gray-700 tw-font-medium tw-mr-2">Filtrer par e-mail :</label>
            <select id="email-filter" v-model="selectedEmail" class="tw-block tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-md tw-border-gray-300 tw-focus:border-blue-300 tw-focus:ring tw-focus:ring-blue-200 tw-focus:ring-opacity-50">
              <option value="">Tous</option>
              <option v-for="email in emails" :value="email">{{ email }}</option>
            </select>
          </div>
  
          <div class="tw-flex tw-justify-between tw-mb-4">
            <label for="sort-by" class="tw-text-gray-700 tw-font-medium tw-mr-2">Trier par :</label>
            <select id="sort-by" v-model="sortOrder" class="tw-block tw-w-48 tw-mt-1 tw-rounded-md tw-shadow-md tw-border-gray-300 tw-focus:border-blue-300 tw-focus:ring tw-focus:ring-blue-200 tw-focus:ring-opacity-50">
              <option value="asc">Plus ancien</option>
              <option value="desc">Plus récent</option>
            </select>
          </div>
  
          <ul class="tw-mt-4">
            <li v-for="donnee in sortedData" :key="donnee.id" class="tw-flex" :id="donnee.id">
              <div class="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md tw-mb-4 tw-flex-auto tw-w-[450px]">
                <div>
                  <p class="tw-text-gray-800 tw-mr-10">{{ donnee.message }}</p>
                </div>
                <div>
                  <p class="tw-text-sm tw-text-gray-500">{{ donnee.email }}</p>
                  <p class="tw-text-sm tw-text-gray-500">{{ donnee.date }}</p>
                </div>
              </div>
              <button @click="deleteMessages(donnee.id)" class="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md tw-mb-4 tw-flex-none tw-max-h-[72px] tw-ml-3">Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue';
  
    const getMessages = async () => {
      try {
        const response = await $fetch("http://localhost:3001/api/display", {
          method: "GET",
        });
        data.value = response;
        console.log(response);
      } catch (error) {
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
    const sortOrder = ref('asc');
  
    const sortedData = computed(() => {
      let sortedArray = [...data.value];
  
      if (sortOrder.value === 'asc') {
        sortedArray.sort((a, b) => new Date (new Date(a.date).toLocaleDateString('fr-BE')) - new Date (new Date(b.date).toLocaleDateString('fr-BE')));
      } else if (sortOrder.value === 'desc') {
        sortedArray.sort((a, b) => new Date (new Date(b.date).toLocaleDateString('fr-BE')) - new Date (new Date(a.date).toLocaleDateString('fr-BE')));
      }
  
      if (selectedEmail.value) {
        return sortedArray.filter(d => d.email === selectedEmail.value);
      } else {
        return sortedArray;
      }
    });

    function deleteMessages(id){
        console.log(id);
        $fetch("http://localhost:3001/api/deleteMessages/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                id : id,
            },
        })
            .then((res) => {
                if(res.ok){
                    console.log(res)
                }
            })
            .catch((err) => {
                console.log(err);
            });
            
        document.getElementById(id).remove();
	};

  
    definePageMeta({
      layout: "custom-admin",
    });
  </script>
  
  <style scoped>
    body {
      background-color: #5975ad;
    }
  </style>
  