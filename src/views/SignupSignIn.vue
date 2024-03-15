<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="authModalLabel">Authentication</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Tabs for Sign In and Sign Up -->
            <ul class="nav nav-tabs" id="authTabs">
              <li class="nav-item">
                <a class="nav-link active" id="signInTab" data-bs-toggle="tab" href="#signIn" role="tab"
                  aria-controls="signIn" aria-selected="true">Sign In</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="signUpTab" data-bs-toggle="tab" href="#signUp" role="tab" aria-controls="signUp"
                  aria-selected="false">Sign Up</a>
              </li>
            </ul>

            <div class="tab-content">
              <!-- Sign In Tab -->
              <div class="tab-pane fade show active" id="signIn" role="tabpanel" aria-labelledby="signInTab">
                <SignInComponent @auth-success="authSuccess" />
              </div>

              <!-- Sign Up Tab -->
              <div class="tab-pane fade" id="signUp" role="tabpanel" aria-labelledby="signUpTab">
                <SignUpComponent @sign-auth-success="closeAuthModel"/>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary btn-sm" @click="closeAuthModel" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInComponent from "@/components/signIn/SignIn.vue";
import SignUpComponent from "@/components/signIn/SignUp.vue";
import { useStore } from 'vuex';
import { onMounted , ref } from "vue";
import * as bootstrap from "bootstrap"; // Import all exports from the 'bootstrap' module
import router from '@/router';

const store = useStore()

const authModal:any = ref<bootstrap.Modal>();


onMounted(() => {
  authModal.value = new bootstrap.Modal(document.getElementById('authModal')!);
  authModal.value.show();
});

const authSuccess = (user: any) => {
  // Handle the event here
  console.log('Authentication successful');
  console.log('Authentication successful', user);
  store.commit('setUser', user)
  authModal.value.hide();
  router.push({name:'home'})
}

const closeAuthModel = () => {
  authModal.value.hide();
}
</script>

<style scoped>
.modal-content {
  border: 2px solid #28a745;
}

.nav-tabs .nav-link {
  color: #fff;
}

.nav-tabs .nav-link.active {
  background-color: #28a745;
  border-color: #28a745;
}

.modal-header {
  background-color: #343a40;
}

.modal-body {
  background-color: #343a40;
}

.modal-footer {
  background-color: #343a40;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.btn-close-white {
  color: #fff;
}
</style>
