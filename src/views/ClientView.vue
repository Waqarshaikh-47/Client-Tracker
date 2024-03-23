<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="text-light mb-0">Client Lists</h1>
      <div class="input-group" style="max-width: 300px">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search..."
        />
        <button
          @click="searchClients(activeTab)"
          class="btn btn-outline-light"
          type="button"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>

    <ul class="nav nav-tabs mt-3" id="clientTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="active-client-tab"
          @click="activateTab('active-client-tab')"
          data-bs-toggle="tab"
          data-bs-target="#active-client"
          type="button"
          role="tab"
          aria-controls="active-client"
          aria-selected="true"
        >
          Active Client List
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pending-client-tab"
          @click="activateTab('pending-client-tab')"
          data-bs-toggle="tab"
          data-bs-target="#pending-client"
          type="button"
          role="tab"
          aria-controls="pending-client"
          aria-selected="false"
        >
          Pending Client List
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content" id="clientTabsContent">
      <!-- Active Client List Tab -->
      <div
        class="tab-pane fade show active"
        id="active-client"
        role="tabpanel"
        aria-labelledby="active-client-tab"
      >
        <ul class="list-group mt-3">
          <template v-if="filteredActiveClients.length">
  <div class="table-responsive">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Consultant</th>
          <th>Last Updated</th>
          <th>Created on</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activeClient, activeIndex) in filteredActiveClients" :key="'active-' + activeIndex">
          <td>{{ activeIndex + 1 }}</td>
          <td class="text-light">{{ activeClient.clientData.clientInformationFormData.fullName }}</td>
          <td class="text-light">{{ activeClient.clientData.fillerInfo.name }}</td>
          <td class="text-light">{{ formatDate(activeClient.clientData.lastUpdated) }}</td>
          <td class="text-light">{{ formatDate(activeClient.clientData.startDate) }}</td>
          <td>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item text-dark" @click="viewContact(activeIndex, activeClient)">View</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



          <template v-else>
            <li class="list-group-item">No active clients found.</li>
          </template>
        </ul>
      </div>

      <!-- Pending Client List Tab -->
      <div
        class="tab-pane fade"
        id="pending-client"
        role="tabpanel"
        aria-labelledby="pending-client-tab"
      >
        <ul class="list-group mt-3">
          <template v-if="filteredPendingClients.length">
  <div class="table-responsive">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Consultant</th>
          <th>Last Updated</th>
          <th>Created On</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pendingClient, pendingIndex) in filteredPendingClients" :key="'pending-' + pendingIndex">
          <td>{{ pendingIndex + 1 }}</td>
          <td class="text-light">{{ pendingClient.clientData.clientInformationFormData.fullName }}</td>
          <td class="text-light">{{ pendingClient.clientData.fillerInfo.name }}</td>
          <td class="text-light">{{ formatDate(pendingClient.clientData.lastUpdated) }}</td>
          <td class="text-light">{{ formatDate(pendingClient.clientData.startDate) }}</td>
          <td>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item text-dark" @click="viewContact(pendingIndex, pendingClient)">View</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
import { onBeforeMount, onMounted, ref, computed , watch ,inject} from "vue";
import queries from "@/plugins/db/queries/quries";
import { useStore } from "vuex";
import router from "@/router";
import { cloneDeep, filter } from "lodash";

const store = useStore();

const searchQuery = ref<string>("");
const filteredActiveClients = ref<any[]>([]);
const filteredPendingClients = ref<any[]>([]);
let activeClients: any[] = [];
let pendingClients: any[] = [];
const activeTab = ref("active-client-tab");

onBeforeMount(async () => {
  try {
    store.commit("setLoading", true);
    const userData = await queries.getAllClientsInformation();
    activeClients = categorizeClients(userData).active;
    pendingClients = categorizeClients(userData).pending;
    filteredActiveClients.value = categorizeClients(userData).active;
    filteredPendingClients.value = categorizeClients(userData).pending;
    store.commit("setLoading", false);
  } catch (error: any) {
    console.error("Error fetching client information:", error.message);
    store.commit("setLoading", false);
  }
});

const activateTab = (tabId:string) => {
  activeTab.value = tabId;
};

const viewContact = (index: number, clientData: any): void => {
  // You can implement the view functionality here
  let clientDataClone = cloneDeep(clientData)
  store.commit("setViewClientData", clientDataClone);
  router.push({ name: "client-details" });
};

// Create a copy of activeClients and pendingClients to preserve the original lists
// Search Query
watch(searchQuery, () => {
  searchClients(activeTab.value);
});


const searchClients = (tabName:string) => {
  if (tabName == "active-client-tab") {
    if (searchQuery.value) {
      let filterValue = filter(activeClients, (client) => {
        return (
          client.clientData.clientInformationFormData.fullName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          client.clientData.clientInformationFormData.panNumber
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
      filteredActiveClients.value = filterValue;
    } else {
      filteredActiveClients.value = activeClients;
    }
  } else if(tabName == "pending-client-tab") {
    // Filter for pending list
    if (searchQuery.value) {
      let filterValue = filter(pendingClients, (client) => {        
        return (
          client.clientData.clientInformationFormData.fullName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          client.clientData.clientInformationFormData.panNumber
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
      filteredPendingClients.value = filterValue;
    } else {
      filteredPendingClients.value = pendingClients;
    }
  }
};

const editContact = (index: number): void => {
  // You can implement the edit functionality here
};

const deleteContact = (index: number, listType: string): void => {
  // You can implement the delete functionality here
  if (listType === "activeClients") {
    activeClients.splice(index, 1);
  } else if (listType === "pendingClients") {
    pendingClients.splice(index, 1);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options:any = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-GB', options);
}

interface ClientData {
  [key: string]: any;
}

function categorizeClients(clients: { id: string, clientData: ClientData }[]): { active: { id: string, clientData: ClientData }[], pending: { id: string, clientData: ClientData }[] } {
  const activeClientsList: { id: string, clientData: ClientData }[] = [];
  const pendingClientsList: { id: string, clientData: ClientData }[] = [];

  const formsToCheck = [
    'fixedDepositFormData',
    'goldInvestmentFormData',
    'indiaPostFormData',
    'insurancePolicyFormData',
    'mutualFundFormData'
  ];

  clients.forEach(client => {
    const data = client.clientData;

    // Flag to check if client is pending
    let isPending = false;

    formsToCheck.forEach(form => {
      if (Object.keys(data[form]).some(key => data[form][key] !== '')) {
        // Form has a key with a value
        if (Object.keys(data[form]).some(key => data[form][key] === '')) {
          // Form also has a key with an empty value
          isPending = true;
        }
      }
    });

    if (isPending) {
      pendingClientsList.push(client);
    } else {
      activeClientsList.push(client);
    }
  });

  return { active: activeClientsList, pending: pendingClientsList };
}


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
