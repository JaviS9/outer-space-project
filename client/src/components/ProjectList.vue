<template>
    <div class="row p-0 m-0">
        <div class="col p-2 m-0" style="height: 350px"
            :class="{ 'scrollable border border-2 rounded': projects.length > 0}"
        >
            <div v-if="projects.length === 0">
                <p class="text-danger text-center h5 p-3">No hay proyectos</p>
            </div>
            <div v-else
                v-for="pro in projects" :key="pro.id"
                class="card bg-black text-white border border-1 mx-0 mb-2 p-0"
            >
                <div class="card-body m-0 p-0">
                    <div class="row-flex d-flex align-items-center justify-content-center p-3">
                        <div class="col-md-3 flex-column d-flex align-items-end justify-content-center">
                            <div class="imagePreview__mini-image border border-3 rounded-circle" :style="{ 'background-image': `url(${pro.photo})` }"></div>
                        </div>
                        <div class="col-md-6 flex-column d-flex align-items-start justify-content-center">
                            <p class="m-0">{{ pro.title }}</p>
                        </div>
                        <div class="col-md-3 flex-column d-flex align-items-end justify-content-center">
                            <div class="row-flex d-flex justify-content-center align-items-center">
                                <router-link v-if="listName != ''"
                                    :to=" $store.state.isAdminLoggedIn ? `/manager/projects/view/${pro.title}` : `/project/${pro.title}`"
                                    type="button" class="btn btn-outline-warning">
                                    <i class="fa fa-eye"></i>
                                </router-link>
                                <router-link v-if="listName == 'subscriptions' && (($store.state.isUserLoggedIn && $store.state.user.id == user.id) ||  $store.state.isAdminLoggedIn)"
                                    :to="{ name: 'ViewSubscription', params: { subscription: pro.numSubs }}"
                                    type="button" class="btn btn-outline-green ms-2">
                                    <i class="fa-solid fa-coins"></i>
                                </router-link>
                                <button v-if="listName != '' && (($store.state.isUserLoggedIn && $store.state.user.id == user.id) ||  $store.state.isAdminLoggedIn)"
                                    type="button"
                                    @click="deleteProject(pro.id)"
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
import projectApi from '@/services/projectApi';
import userApi from '@/services/userApi';

export default {
    name: 'ProjectList',
    data() {
        return {
            projects: []
        }
    },

    props: {
        user: Object,
        listName: String,
    },

    created() {
        switch(this.$props.listName) {
            case 'fundedProjects': this.getFundedProjects(this.$props.user.id);
                break;
            case 'subscriptions' : this.getSubscriptions(this.$props.user.id);
                break;
        }        
    },

    methods: {

        async deleteProject(idProject) {
            try {
                var response
                switch(this.$props.listName) {
                    case 'fundedProjects':
                        response = await projectApi.deleteProject(idProject)
                        this.$emit('signal', 1)
                        this.getFundedProjects(this.$props.user.id)
                        console.log(response.data)
                        break;
                    case 'subscriptions' : 
                        response = await userApi.deleteSubscription(this.$props.user.id, idProject)
                        this.getSubscriptions(this.$props.user.id)
                        console.log(response.data)
                        break;
                }
            } catch (err) {
                console.log(err);
            }
        },

        async getFundedProjects (id) {
            try {
                const response = await userApi.getFundedProjects(id);
                this.projects = response.data
            } catch (err) {
                console.log(err);
            }
        },

        async getSubscriptions (id) {
            try {
                const response = await userApi.getSubscriptions(id);
                this.projects = response.data
                this.$emit('num_subscriptions', this.projects.length)
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>