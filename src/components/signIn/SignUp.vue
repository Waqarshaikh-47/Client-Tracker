<template>
    <div class="mt-3">

        <h4>Create account</h4>
        <p><input type="text" placeholder="email" id="email-sign-up" v-model="email"></p>
        <p><input type="password" placeholder="password" id="password-sign-up" v-model="password"></p>
        <div class="d-flex">

            <p class="mr-2"><button @click="register">submit</button></p>
            <p class="mx-2"><button @click="signInWithGoogle">sign In With Google</button></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore()
const emit = defineEmits(['sign-auth-success'])
const email = ref('');
const password = ref('');

const register = () => {
    store.commit('setLoading', true);
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            // Signed in
            store.commit('setLoading', false);
            const user = userCredential.user;
            console.log("user register succesfully", user);
            router.push({name:'home'})
            emit('sign-auth-success');

        })
        .catch((error) => {
            // Handle Errors here.
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

}

</script>