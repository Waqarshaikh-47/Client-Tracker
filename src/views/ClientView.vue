<template>
  <div class="container mt-5">
    <h1 class="text-light">Client Lists</h1>
    <ul class="nav nav-tabs mt-3" id="clientTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="active-client-tab" data-bs-toggle="tab" data-bs-target="#active-client" type="button" role="tab" aria-controls="active-client" aria-selected="true">Active Client List</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pending-client-tab" data-bs-toggle="tab" data-bs-target="#pending-client" type="button" role="tab" aria-controls="pending-client" aria-selected="false">Pending Client List</button>
      </li>
    </ul>
    
    <!-- Tab Content -->
    <div class="tab-content" id="clientTabsContent">
      <!-- Active Client List Tab -->
      <div class="tab-pane fade show active" id="active-client" role="tabpanel" aria-labelledby="active-client-tab">
        <ul class="list-group mt-3">
          <template v-if="activeClients.length">
            <li v-for="(client, index) in activeClients" :key="'active-' + index" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span class="fw-bold">{{ client.clientInformationFormData.fullName }}</span> - {{ client.clientInformationFormData.email }}
              </div>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" @click="viewContact(index,client)">View</a></li>
                </ul>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="list-group-item">No active clients found.</li>
          </template>
        </ul>
      </div>
      
      <!-- Pending Client List Tab -->
      <div class="tab-pane fade" id="pending-client" role="tabpanel" aria-labelledby="pending-client-tab">
        <ul class="list-group mt-3">
          <template v-if="pendingClients.length">
            <li v-for="(contact, index) in pendingClients" :key="'pending-' + index" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span class="fw-bold">{{ contact.name }}</span> - {{ contact.mobile }}
              </div>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" @click="viewContact(index,contact)">View</a></li>
                </ul>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="list-group-item">No pending clients found.</li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import queries from "@/plugins/db/queries/quries";
import { useStore } from 'vuex';
import router from '@/router';


const store = useStore()

onBeforeMount(async () => {
  try {
    store.commit('setLoading', true);
    const userData = await queries.getAllClientsInformation();
      activeClients.value = userData;
      store.commit('setLoading', false);
  } catch (error:any) {
    console.error('Error fetching client information:', error.message);
    store.commit('setLoading', false);
  }
});


onMounted(async()=>{
})

let userData = ref<any>([]);
// Array of Active Clients
const activeClients = ref<any[]>([]);

// Array of Pending Clients
const pendingClients = ref<any[]>([]);

const viewContact = (index: number,clientData:any): void => {
  // You can implement the view functionality here
  console.log("View Contact:", clientData);
  store.commit('setViewClientData', clientData);
  let getData = store.state.viewClientData
  console.log(getData.clientInformationFormData.fullName)
  router.push({name:'client-details'})
};

const editContact = (index: number): void => {
  // You can implement the edit functionality here
  console.log("Edit Contact:", activeClients.value[index]);
};

const deleteContact = (index: number, listType: string): void => {
  // You can implement the delete functionality here
  if (listType === 'activeClients') {
    activeClients.value.splice(index, 1);
  } else if (listType === 'pendingClients') {
    pendingClients.value.splice(index, 1);
  }
};
</script>

<style>
  /* Custom Styles */
  .nav-tabs {
    background-color: #343a40;
    border-radius: 5px;
  }
  
  .nav-tabs .nav-link {
    color: white;
    border: 1px solid transparent;
    border-radius: 0;
  }
  
  .nav-tabs .nav-link.active {
    background-color: #212529;
    border-color: #212529;
    color: #fff; /* Selected tab text color */
  }
  
  .nav-tabs .nav-link:hover {
    background-color: #454d55;
  }
  
  .list-group-item {
    background-color: #454d55;
    border-color: #343a40;
    color: white;
  }
  
  .list-group-item:hover {
    background-color: #495057;
  }
  
  .dropdown-toggle::after {
    display: none;
  }
  
  .container {
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
</style>
