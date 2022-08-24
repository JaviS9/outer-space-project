<template>
    <div class="row p-0 m-0">
        <div class="col-12 p-0 m-0">
            <div v-if="users.length === 0">
                <p class="text-danger text-center h5 p-3">No hay usuarios</p>
            </div>
            <div v-else
                v-for="user in users" :key="user.id"
                class="card bg-black text-white border border-1 mx-0 mb-2 p-0"
            >
                <div class="card-body m-0 p-0">
                    <div class="row-flex d-flex align-items-center justify-content-center p-3">
                        <div class="col-md-3 flex-column d-flex align-items-end justify-content-center">
                            <div class="imagePreview__mini-image border border-3 rounded-circle" :style="{ 'background-image': `url(${user.photo})` }"></div>
                        </div>
                        <div class="col-md-6 flex-column d-flex align-items-start justify-content-center">
                            <p class="m-0">{{ user.nickName }}</p>
                        </div>
                        <div class="col-md-3 flex-column d-flex align-items-end justify-content-center">
                            <div class="row-flex d-flex justify-content-center align-items-center">
                                <router-link v-if="listName != ''"
                                    :to=" $store.state.isAdminLoggedIn ? `/manager/users/profile/${user.nickName}` : `/user/${user.nickName}`"
                                    type="button" class="btn btn-outline-warning">
                                    <i class="fa fa-eye"></i>
                                </router-link>
                                <router-link v-if="listName == 'subscriptions' && ($store.state.isUserLoggedIn && $store.state.user.id == project.founder ||  $store.state.isAdminLoggedIn)"
                                    :to="{ name: 'ViewSubscription', params: { subscription: user.numSubs }}"
                                    type="button" class="btn btn-outline-green ms-2">
                                    <i class="fa-solid fa-coins"></i>
                                </router-link>
                                <button v-if="listName != '' && ($store.state.isUserLoggedIn && $store.state.user.id == project.founder ||  $store.state.isAdminLoggedIn)"
                                    type="button"
                                    @click="deleteUser(user.id)"
                                    class="btn btn-outline-danger ms-2">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

export default {
    name: 'UserList',
    data() {
        return {
            users: []
        }
    },

    props: {
        project: Object,
        listName: String,
    },

    created() {
        switch(this.$props.listName) {
            case 'subscriptions' : this.getSubscriptions(this.$props.project.id);
                break;
            case 'participations': this.getParticipations(this.$props.project.id);
                break;
        }        
    },

    methods: {

        async deleteUser(idUser) {
            try {
                var response
                switch(this.$props.listName) {
                    case 'subscriptions' : 
                        response = await userApi.deleteSubscription(idUser, this.$props.project.id);
                        this.getSubscriptions(this.$props.project.id);
                        console.log(response.data)
                        break;
                    case 'participations': 
                        response = await userApi.deleteParticipation(idUser, this.$props.project.id);
                        this.getParticipations(this.$props.project.id);
                        console.log(response.data)
                        break;
                }
            } catch (err) {
                console.log(err);
            }
        },

        async getSubscriptions (id) {
            try {
                const response = await projectApi.getSubscriptions(id);
                this.users = response.data;
            } catch (err) {
                console.log(err);
            }
        },

        async getParticipations (id) {
            try {
                const response = await projectApi.getParticipations(id);
                this.users = response.data;
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>