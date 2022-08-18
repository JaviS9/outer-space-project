<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de administrador</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <div class="row">
      <!-- USER INFO -->
    <div class="row d-flex align-items-center justify-content-center p-3 mb-3">
      <div class="col-md-4 p-0 m-0 flex-column d-flex justify-content-end align-items-end">
          <div class="imagePreview__user-image border rounded-circle border-3 bg-admin"></div>
      </div>
      <div class="col-md-6 p-0 m-0 flex-column d-flex justify-content-start">
        <div class="card bg-black m-0 py-2 px-4 border border-2">
            <div class="card-body bg-black p-0 m-0">
              <li v-if="user === null" class="list-group m-0 p-0">
                  <ul class="list-group-item bg-black text-white text-center m-3"><p class="m-0 text-danger">No hay datos</p></ul>
              </li>
              <li v-else class="list-group m-0 p-0">
                  <ul class="list-group-item m-0 p-2 text-white bg-black">
                      <p class="m-0">Email: <span class="fw-bold">{{admin.email}}</span></p>
                  </ul>
                  <ul class="list-group-item m-0 p-2 text-white bg-black">
                      <p class="m-0">Nombre: <span class="fw-bold">{{admin.name}}</span></p>
                  </ul>
                  <ul class="list-group-item m-0 p-2 text-white bg-black">
                      <p class="m-0">Apellidos: <span class="fw-bold">{{admin.lastName}}</span></p>
                  </ul>
              </li>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/manager/admins" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import adminApi from '@/services/adminApi';

export default {
    name: "ViewAdmin",
    data() {
        return {
            admin: null,
        };
    },
    created() {
        this.getProfile();
    },
    methods: {
        //FIND ONE
        async getProfile() {
            try {
                const response = await adminApi.getAdminId(this.$route.params.id);
                this.admin = response.data[0];
            }
            catch (err) {
                console.log(err);
            }
        }
    },
}
</script>

<style>

</style>