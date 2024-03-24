<template>
    <div class="mt-3">
      <h4>Create account</h4>
      <p><input type="text" placeholder="email" id="email-sign-up" v-model="email"></p>
      <div class="input-group">
        <input placeholder="password" id="password-sign-up" v-model="password" class="form-control" :type="passwordFieldType">
        <button @click="togglePasswordVisibility" class="btn btn-outline-secondary" type="button" id="password-visibility-toggle">
          <i :class="passwordVisibilityIcon"></i>
        </button>
      </div>
      <div class="d-flex mt-3">
        <p class="mr-2"><button @click="register" class="btn btn-primary">Submit</button></p>
        <!-- <p class="mx-2"><button @click="signInWithGoogle" class="btn btn-danger">Sign In With Google</button></p> -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import router from '@/router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const emit = defineEmits(['sign-auth-success']);
  const email = ref('');
  const password = ref('');
  const passwordFieldType = ref('password');
  const passwordVisibilityIcon = ref('bi-eye');
  
  const register = () => {
    store.commit('setLoading', true);
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((userCredential) => {
        store.commit('setLoading', false);
        const user = userCredential.user;
        router.push({ name: 'home' });
        emit('sign-auth-success');
      })
      .catch((error) => {
        store.commit('setLoading', false);
        alert(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        // Handle error
      });
  }
  
  const signInWithGoogle = () => {
    // Implement Google sign in
  }
  
  const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    passwordVisibilityIcon.value = passwordFieldType.value === 'password' ? 'bi-eye' : 'bi-eye-slash';
  }
  </script>
  
  <style scoped>
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: #fff;
  }
  
  .btn-danger:hover {
    background-color: #bd2130;
    border-color: #bd2130;
  }
  
  .bi-eye-slash {
    display: none;
  }
  
  .input-group {
    position: relative;
  }
  
  #password-visibility-toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  </style>
  