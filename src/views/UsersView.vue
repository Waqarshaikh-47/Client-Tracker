<template>
  <div class="container mt-4 mb-2">
    <div class="table-responsive">
      <table class="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }} {{ user.clientData.displayName }}</td>
            <td>{{ user.clientData.email }}</td>
            <td>
              <div class="d-flex">
                <p
                  class="mx-2"
                  v-for="role in user.clientData.roles"
                  :key="role"
                >
                  {{ role }}
                </p>
              </div>
            </td>
            <td>
              <button
                class="btn btn-sm btn-danger p-2"
                @click="confirmDelete(user)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import queries from "@/plugins/db/queries/quries";
import store from "@/stores/store";
import { some, includes, filter } from "lodash";

const users: any = ref([]);
const getUsers = async () => {
  store.commit("setLoading", true);
  users.value = await queries.getAllUsersInformation();
  store.commit("setLoading", false);
};
onMounted(() => {
  getUsers();
});

const confirmDelete = (user: any) => {
  let isUserAdmin: boolean = false;
    let isOnlyAdmin: boolean = false;
    isUserAdmin = includes(user.clientData.roles, "Admin");
    if (isUserAdmin) {
      let allAdmins: Array<any> = filter(users.value, (user) => {
        return includes(user.clientData.roles, "Admin");
      });
      isOnlyAdmin = allAdmins.length > 1 ? false : true;
    }
    if(isOnlyAdmin){
      const alertMessage = "Cannot delete the only admin. At least one admin must remain.";
      alert(alertMessage);
    }else if (
    confirm(
      "Are you sure you want to delete this user?   " +
        user.clientData.displayName
    )
  ) {
    // User confirmed deletion, proceed with deletion logic
    store.dispatch("setLoading", true)
    if (!isOnlyAdmin) {
      queries
        .deleteUser(user.id)
        .then(() => {
          getUsers();
          store.dispatch("setLoading", false);
        })
        .catch(() => {
          store.dispatch("setLoading", false);
        });
    }
  } else {
    // User canceled deletion
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto; /* Enable horizontal scroll */
}

/* Adjust table style for dark theme */
.table-dark {
  color: #fff;
  background-color: #343a40;
}

.table-dark th,
.table-dark td,
.table-dark thead th {
  border-color: #454d55;
}

.table-dark th {
  background-color: #212529;
}

.table-dark.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
