<template>
  <div class="container mt-5">
    <h1 class="mb-4">Add New Employee</h1>
    <p class="text-danger">Please fill in these details carefully:</p>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="displayName" class="form-label">Employee's Full Name</label>
        <input
          v-model="userData.displayName"
          type="text"
          class="form-control"
          id="displayName"
          placeholder="Enter employee's full name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Employee's Email</label>
        <input
          v-model="userData.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter employee's email address"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Employee Roles</label>
        <div v-for="(role, index) in roles" :key="index" class="form-check">
          <input
            :checked="selectedRoles.includes(role)"
            @change="toggleRole(role)"
            :value="role"
            type="checkbox"
            class="form-check-input"
            :id="'role_' + index"
          />
          <label :for="'role_' + index" class="form-check-label">{{ role }}</label>
        </div>
      </div>
      <div class="d-grid gap-2 mt-4">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User } from '@/schemas/user/User';
import queries from "@/plugins/db/queries/quries";
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore();
const userData = ref(new User('', '', []));
const roles = ref(['Admin', 'Read', 'Write']); // Example roles, replace with your actual roles
const selectedRoles = ref([]);

const toggleRole = (role: string) => {
  if (selectedRoles.value.includes(role)) {
    selectedRoles.value = selectedRoles.value.filter(r => r !== role);
  } else {
    selectedRoles.value.push(role);
  }
};

const submitForm = async () => {
  userData.value.roles = selectedRoles.value;
  console.log("form submitted", userData.value);
  
  // Check if the email already exists in the database
  const userRoleData = await queries.fetchUserDataByEmail(userData.value.email);
  if (userRoleData.length > 0) {
    // If the user exists, update their data
    await queries.updateUser(userData.value.email, userData.value);
  } else {
    // If the user doesn't exist, add new client data
    await queries.addUser(userData.value);
  }
};

onMounted(() => {
  if(!store.state.user.roles.includes('Admin')){
    router.push('/notAuthorized');
  }
});

</script>


<style scoped>
.btn-primary {
  background-color: #3d444b;
  border-color: #3d444b;
}

.btn-primary:hover {
  background-color: #000000;
  border-color: #000000;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #5a6167;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6167;
}
</style>
