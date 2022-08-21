<template>
<!-- USER INFO -->
    <div class="row d-flex align-items-center justify-content-center p-3 mb-3">
      <div class="col-md-4 p-0 m-0 flex-column d-flex justify-content-end align-items-end">
          <div v-if="previewImage === null" class="imagePreview__user-image bg-black border border-2 rounded-circle pt-5">
            <p class="text-center mt-5 text-danger text-photo">Foto no encontrada</p>
          </div>
          <div v-else-if="!profile.photo" class="imagePreview__user-image border rounded-circle border-3 bg-admin"></div>
          <div v-else class="imagePreview__user-image border rounded-circle border-3" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
      <div class="col-md-6 p-0 m-0 flex-column d-flex justify-content-start">
        <div class="card bg-black m-0 py-2 px-4 border border-2">
            <div class="card-body bg-black p-0 m-0">
             <li v-if="user === null" class="list-group m-0 p-0">
                <ul class="list-group-item bg-black text-white text-center m-3"><p class="m-0 text-danger">No hay datos</p></ul>
             </li>
             <li v-else class="list-group m-0 p-0">
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Email: <span class="fw-bold">{{user.email}}</span></p>
                </ul>
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Nombre: <span class="fw-bold">{{user.name}}</span></p>
                </ul>
                <ul class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Apellidos: <span class="fw-bold">{{user.lastName}}</span></p>
                </ul>
                <ul v-if="user.nickName"
                    class="list-group-item m-0 p-2 text-white bg-black">
                    <p class="m-0">Nickname: <span class="fw-bold">{{user.nickName}}</span></p>
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
                <ul v-if="user.biography"
                    class="list-group-item border-top border-1 text-white bg-black mx-0 my-1 px-2">
                    <p class="m-0 p-0">Biografía: <span class="fw-bold">{{user.biography}}</span></p>
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
    name:'UserCard',
    data() {
        return {
            techs: [],
            profile: null,
            previewImage: null
        }
    },

    props: {
        user: {}
    },

    created() {
        this.profile = this.$props.user
        this.previewImage = this.profile.photo
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