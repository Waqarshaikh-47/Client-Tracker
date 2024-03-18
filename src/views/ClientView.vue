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
            <li
              v-for="(activeClient, activeIndex) in filteredActiveClients"
              :key="'active-' + activeIndex"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{
                  activeClient.clientData.clientInformationFormData.fullName
                }}</span>
                - {{ activeClient.clientData.clientInformationFormData.email }}
              </div>
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
                    <a class="dropdown-item" @click="viewContact(activeIndex, activeClient.clientData)"
                      >View</a
                    >
                  </li>
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
      <div
        class="tab-pane fade"
        id="pending-client"
        role="tabpanel"
        aria-labelledby="pending-client-tab"
      >
        <ul class="list-group mt-3">
          <template v-if="filteredPendingClients.length">
            <li
              v-for="(contact, index) in filteredPendingClients"
              :key="'pending-' + index"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{ contact.name }}</span> -
                {{ contact.mobile }}
              </div>
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
                    <a
                      class="dropdown-item"
                      @click="viewContact(index, contact)"
                      >View</a
                    >
                  </li>
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
    console.log(userData)
    filteredActiveClients.value = userData;
    activeClients = userData;
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
  let getData = store.state.viewClientData;
  console.log(getData.clientInformationFormData.fullName);
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
          client.clientInformationFormData.fullName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          client.clientInformationFormData.panNumber
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
      filteredActiveClients.value = filterValue;
    } else {
      filteredActiveClients.value = activeClients;
    }
  } else {
    // Filter for pending list
    if (searchQuery.value) {
      let filterValue = filter(activeClients, (client) => {
        return (
          client.clientInformationFormData.fullName
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          client.clientInformationFormData.panNumber
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
      filteredActiveClients.value = filterValue;
    } else {
      filteredActiveClients.value = activeClients;
    }
  }
};

const editContact = (index: number): void => {
  // You can implement the edit functionality here
  console.log("Edit Contact:", activeClients[index]);
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
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 to get the correct month (zero-based index)
  const year = date.getFullYear();

  // Pad day and month with leading zero if necessary
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
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
