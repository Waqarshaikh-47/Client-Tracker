<template>
    <div>
        <Navbar/>
        <RouterView/>
    </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue"
import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>

</style>