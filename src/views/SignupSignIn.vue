<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
      <div class="modal-dialog d-flex align-items-center">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="authModalLabel">Authentication</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex flex-column align-items-center ">
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
                <SignUpComponent />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInComponent from "@/components/signIn/SignIn.vue";
import SignUpComponent from "@/components/signIn/SignUp.vue";
import { store } from "@/stores/store";
import { onMounted } from "vue";

onMounted(() => {
  const authModal = new bootstrap.Modal(document.getElementById('authModal'));
  authModal.show();
});
const authSuccess = (user: any) => {
  // Handle the event here
  console.log('Authentication successful');
  console.log('Authentication successful', user);
  const authModal = new bootstrap.Modal(document.getElementById('authModal'));
  store.commit('setUser', user)
  authModal.hide();
}
</script>