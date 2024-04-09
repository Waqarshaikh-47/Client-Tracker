<template>
    <div class="mt-3">

        <h4>SignIn with account</h4>
        <p><input type="text" placeholder="Email" id="email" v-model="email" class="form-control"></p>
        <div class="input-group">
            <input placeholder="Password" id="password" v-model="password" class="form-control" :type="passwordFieldType">
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
import { ref, defineEmits } from 'vue';
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore()
const email = ref('');
const password = ref('');
const emit = defineEmits(['auth-success'])
const passwordFieldType = ref('password');
const passwordVisibilityIcon = ref('bi bi-eye');

const register = () => {
    store.commit('setLoading', true);
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
        // Signed in
        store.commit('setLoading', false);
        const user = userCredential.user;
        emit('auth-success', user);
        })
        .catch((error) => {
            // Handle Errors here.
            alert(error)
            store.commit('setLoading', false);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            //...
        });

}
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result) => {
        emit('auth-success', result.user);
        router.push('/');
    }).catch((error) => {
    })
}

const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    passwordVisibilityIcon.value = passwordFieldType.value === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
}

</script>

<style scoped>
.form-control {
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn {
    display: inline-block;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: #6e747a;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
}

.btn:hover {
    color: #fff;
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
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
