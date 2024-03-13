<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import Home from './components/Home.vue';
import { onMounted, ref } from 'vue';
import { store } from './stores/store';
import queries from './plugins/db/queries/quries';


const currentUser = ref({});
const fetchCurrentUser = () => {
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser.value = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      store.commit('setUser', currentUser.value);
    } else {
      currentUser.value = {};
    }
  });
};

onMounted(async () => {
  await fetchCurrentUser(); // Wait for fetchCurrentUser to complete
});

</script>

<template>
  <Home />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
