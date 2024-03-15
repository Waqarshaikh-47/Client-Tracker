<template>
    <div class="mt-3">

        <h4>SignIn with account</h4>
        <p><input type="text" placeholder="email" id="email" v-model="email"></p>
        <p><input type="password" placeholder="password" id="password" v-model="password"></p>
        <div class="d-flex">
            <p class="mr-2"><button @click="register">submit</button></p>
            <p class="mx-2"><button @click="signInWithGoogle">sign In With Google</button></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const register = () => {
    store.commit('setLoading', true);
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
        // Signed in
        store.commit('setLoading', false);
        const user = userCredential.user;
        console.log("user register succesfully", user);
        emit('auth-success', user);
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
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result) => {
        emit('auth-success', result.user);
        router.push('/');
    }).catch((error) => {
        console.log(error);
    })
}

</script>