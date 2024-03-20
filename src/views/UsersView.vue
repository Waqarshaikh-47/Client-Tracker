<template>
    <div class="row px-5 py-2">

        <div class="table-responsive table-dark">
            <table class="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.clientData.displayName }}</td>
                        <td>{{ user.clientData.email }}</td>
                        <td>
                            <div class="d-flex">
                                <p class="mx-2" v-for="role in user.clientData.roles" :key="role">{{ role }}</p>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger p-2" @click="confirmDelete(user)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import queries from '@/plugins/db/queries/quries';
import store from '@/stores/store';

const users: any = ref([]);
const getUsers = async () => {
    users.value = await queries.getAllUsersInformation();

}
onMounted(() => {
    getUsers();
});

const confirmDelete = (user: any) => {
    if (confirm("Are you sure you want to delete this user?   " + user.clientData.displayName)) {
        // User confirmed deletion, proceed with deletion logic
        store.dispatch("setLoading", true)
        queries.deleteUser(user.id).then(() => {
            getUsers()
            store.dispatch("setLoading", false)

        }).catch(() => {
            store.dispatch("setLoading", false)

        });
    } else {
        // User canceled deletion
        console.log("Deletion canceled");
    }
};
</script>