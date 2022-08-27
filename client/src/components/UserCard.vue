<template>
<div class="row d-flex align-items-center justify-content-center p-0 m-0">
    <div class="col-10">
        <div class="row-flex d-flex align-items-center justify-content-center m-0 p-3">
            <div class="col-md-4 p-0 m-0 d-flex flex-column justify-content-center align-items-end">
                <div v-if="profile.photo != null" class="imagePreview__user-image m-0 p-0 border border-4"
                    :style="{ 'background-image': `url(${profile.photo})` }"
                ></div>
                <div v-else-if="!profile.photo" class="imagePreview__user-image border rounded-circle border-3 bg-admin"></div>
                <div v-else class="imagePreview__user-image border rounded-circle border-3" :style="{ 'background-image': `url(${previewImage})` }"></div>
            </div>
            <div class="col-md-4 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                <div class="card blockquote p-3 border border-2 rounded-circle bg-black text-center justify-content-center"
                    style="width: 220px; height: 220px;"
                >
                    <span class="card-title mb-0">Suscripciones</span>
                    <p class="number-score mt-0">{{formatNumber(num_subscriptions)}}</p>
                </div>              
            </div>
            <div class="col-md-4 p-0 m-0 d-flex flex-column justify-content-center align-items-start">
                <div class="card blockquote p-3 border-green border-2 rounded-circle bg-black text-center justify-content-center"
                    style="width: 220px; height: 220px;"
                >
                    <span class="card-title mb-0 greenyellow">Donaciones</span>
                    <p class="number-score mt-0 greenyellow">
                        {{formatNumber(num_donations)}}<i class="fa fa-euro-sign"></i>
                    </p>
                </div>              
            </div>
        </div>
        <div class="row-flex d-flex align-items-center justify-content-center m-0 p-0">
            <div class="col-10 flex-column d-flex justify-content-center m-0 p-0">
                <div class="card bg-black m-0 py-2 px-4 border border-2">
                    <div class="card-body bg-black p-0 m-0">
                        <div class="row ps-2 m-0">
                            <div v-if="user === null" class="my-3 p-0">
                                <div class="bg-black text-white text-center m-3"><p class="m-0 text-danger">No hay datos</p></div>
                            </div>
                            <div v-else class="col m-0 p-0">
                                <div class="row">
                                    <div class="col-md-7 pe-1 m-0"
                                        :class="{ 'col-md-7': user.biography, 'col-md-12': !user.biography}"
                                    >
                                        <div class="row-flex d-flex align-items-start justify-content-top m-0 p-0">
                                            <div class="col-md-7">
                                                <p class="mb-1">Email: <span class="fw-bold">{{user.email}}</span></p>
                                                <p class="mb-1">Nombre: <span class="fw-bold">{{user.name}}</span></p>
                                            </div>
                                            <div class="col-md-5">
                                                <p class="mb-1">Nickname: <span class="fw-bold">{{user.nickName}}</span></p>
                                                <p class="mb-1">Apellidos: <span class="fw-bold">{{user.lastName}}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="user.biography" class="col-md-5 ps-2 border-start m-0">
                                        <div class="row-flex d-flex align-items-start justify-content-top m-0 p-0">
                                            <div class="text-white bg-black mx-0 mb-1 px-2">
                                                <p class="m-0 p-0">Biografía: <span class="fw-bold">{{user.biography}}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="techs.length > 0" class="row border-top border-2 pt-1">
                                    <ul class="list-group-item m-0 p-2 text-white bg-black row-flex d-flex align-items-center">
                                        <p class="m-0">Tecnologías:</p>
                                        <button
                                            v-for="(tech) in techs" :key="tech"
                                            type="button"
                                            class="btn btn-success btn-sm rounded-pill p-2 ms-2"
                                        >
                                            {{ tech.name }}
                                        </button>
                                    </ul>
                                </div>
                            </div>
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

export default {
    name:'UserCard',
    data() {
        return {
            techs: [],
            profile: null,
            previewImage: null
        }
    },

    props: {
        user: {},
        num_subscriptions: Number,
        num_donations: Number,
    },

    created() {
        this.profile = this.$props.user
        this.previewImage = this.profile.photo
        this.getTechs(this.profile.id)
    },

    methods: {
         formatNumber(number) {
            var res
            if (number >= 0 && number < 1000) { 
                return (number)
            }
            if (number >= 1000 && number < 1000000) {
                res = (number/1000).toFixed(1)
                return String(res) + "K"
            } 
            if (number >= 1000000) {
                res = (number/1000000).toFixed(1)
                return String(res) + "M"
            }
        },

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