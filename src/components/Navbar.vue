<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand title-color"  @click="$router.push({name:'home'})">GrowSmart</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="$router.push({name:'clients'})">
            <a class="nav-link" :class="$route.name == 'clients' ? 'active' : ''" aria-current="page">Clients</a>
          </li>
          <li class="nav-item" @click="$router.push({name:'about'})" >
            <a class="nav-link" :class="$route.name == 'about' ? 'active' : ''" >About</a>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit" v-if="isLoggedIn"
            @click.prevent="handleSignout">Sign-out</button>
            <button class="btn btn-outline-success" type="submit" v-else
            @click.prevent="handleSignIn">Sign-In</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import router from '@/router';
const isLoggedIn = ref(false)
let auth: Auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });

});

const handleSignout = () => {

  signOut(auth).then(() => {
    router.push({name:'home'})
    router.push({name:'register'})
  })
}

const handleSignIn = ()=>{
  router.push({name:'about'})
  setTimeout(()=>{
    router.push({name:'register'})
  },0)
}
</script>

<style scoped>

.title-color {
  color: #198754;
  transition: color 0.3s ease; /* Smooth transition effect */
}

.title-color:hover {
  color: #06fc89; /* Change color on hover */
}

</style>