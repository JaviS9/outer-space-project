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
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img class="card-img-top icon-image-big" src="../../../../public/img/admin-1.png" alt="admin-1">
      </div>
      <div class="col-md-6 mx-3 flex-column justify-content-center">
        <div class="card border-light bg-black py-1">
          <div class="card-body bg-black px-0">
            <li class="list-group" v-if="admin === null">
              <ul class="list-group-item bg-black text-white text-center mt-4"><p class="text-danger">No hay datos</p></ul>
            </li>
            <li class="list-group p-0" v-else>
              <ul class="list-group-item m-0 text-white bg-black"><p>Email: <span class="fw-bold"> {{admin.email}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Nombre: <span class="fw-bold"> {{admin.name}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Apellidos: <span class="fw-bold"> {{admin.lastName}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black border-top"><p>Contraseña: <span class="fw-bold"> {{admin.password}}</span></p></ul>
            </li>
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
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style>

</style>