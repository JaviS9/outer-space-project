<template>
<div class="row-flex d-flex align-items-center pt-3 user-container my-3">
    <div v-if="profile.photo === null" class="bg-black border border-2 rounded-circle pt-5 user-photo" style="width: 250px; height: 250px;">
        <p class="text-center mt-5 text-danger text-photo">Foto no encontrada</p>
    </div>
    <div v-else-if="!profile.photo" class="imagePreview__user-image bg-admin border rounded-circle border-3 user-photo"></div>
    <div v-else class="imagePreview__user-image border rounded-circle border-3 user-photo" :style="{ 'background-image': `url(${profile.photo})` }"></div>
    <!--  -->
    <div class="col-6 user-info">
        <div class="card bg-black m-0 p-0 border border-3">
        <div class="card-body bg-black col flex-column d-flex align-items-center justify-content-center p-0">
            <li v-if="profile === null" class="list-group user-card">
                <ul class="list-group-item bg-black text-white text-center m-3"><p class="m-0 text-danger">No hay datos</p></ul>
            </li>
            <li v-else class="list-group user-card">
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Email: <span class="fw-bold">{{profile.email}}</span></p>
                </ul>
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Nombre: <span class="fw-bold">{{profile.name}}</span></p>
                </ul>
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Apellidos: <span class="fw-bold">{{profile.lastName}}</span></p>
                </ul>
                <ul v-if="profile.nickName"
                    class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Nickname: <span class="fw-bold"> {{profile.nickName}}</span></p>
                </ul>
                <ul v-if="techs.length > 0" class="list-group-item m-0 p-2 text-white bg-black row-flex d-flex align-items-center">
                    <p class="m-0">Tecnologías:</p>
                    <button
                        v-for="(tech) in techs" :key="tech"
                        type="button"
                        class="btn btn-success btn-sm rounded-pill p-2 ms-2"
                    >
                        {{ tech.name }}
                    </button>
                </ul>
                <ul v-if="profile.biography"
                    class="list-group-item my-1 border-top border-1 p-2 text-white bg-black">
                    <p>Biografía: <span class="fw-bold">{{profile.biography}}</span></p>
                </ul>
            </li>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import userApi from '@/services/userApi';

export default {
    name:'UserProfile',
    data() {
        return {
            techs: [],
            profile: null
        }
    },

    props: {
        user: {}
    },

    created() {
        this.profile = this.$props.user
        this.getTechs(this.profile.id)
    },

    methods: {
        async getTechs(id) {
            try {
                const techs = await userApi.getTechs(id)
                this.techs = techs.data
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>