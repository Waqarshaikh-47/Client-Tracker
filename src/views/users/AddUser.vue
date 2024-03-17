<template>
    <div class="container mt-5">
      <h1>New User Information</h1>
      <p class="text-danger">please fill this details carefully</p>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="displayName" class="form-label">Display Name</label>
          <input v-model="userData.displayName" type="text" class="form-control" id="displayName" placeholder="Enter user's display name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input v-model="userData.email" type="email" class="form-control" id="email" placeholder="Enter user's email address" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Roles</label>
          <div v-for="(role, index) in roles" :key="index" class="form-check">
            <input v-model="userData.roles" :value="role" type="checkbox" class="form-check-input" :id="'role_' + index">
            <label :for="'role_' + index" class="form-check-label">{{ role }}</label>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4 mb-4">
          <button
            type="button"
            class="btn btn-secondary"
            @click="submitForm"
          >
            Submit
          </button>

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

  const store = useStore()
  const userData = ref(new User('', '', []));
  const roles = ref(['Admin', 'Read', 'Write']); // Example roles, replace with your actual roles
  const selectedRoles = ref([]);
  
  const submitForm = async () => {
    console.log("forem submited",userData.value);
    // store.commit('setUserData', userData.value);
    await queries.addUser(userData.value);
  };
  
  onMounted(() => {
    if(store.state.user.roles.includes('admin')){
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
  