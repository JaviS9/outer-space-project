<template>
<div class="viewUser">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de usuario</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img class="card-img-top icon-image-big" src="../../../../public/img/user-1.png" alt="alien-1">
      </div>
      <div class="col-md-6 mx-3 flex-column justify-content-center">
        <div class="card border-light bg-black py-1">
          <div class="card-body bg-black px-0">
            <li class="list-group" v-if="user === null">
              <ul class="list-group-item text-white bg-black text-center mt-4"><p class="text-danger">No hay datos</p></ul>
            </li>
            <li class="list-group" v-else>
              <ul class="list-group-item text-white bg-black"><p>Email: <span class="fw-bold"> {{user.email}}</span></p></ul>
              <ul class="list-group-item text-white bg-black"><p>Nombre: <span class="fw-bold"> {{user.name}}</span></p></ul>
              <ul class="list-group-item text-white bg-black"><p>Apellidos: <span class="fw-bold"> {{user.lastName}}</span></p></ul>
              <ul class="list-group-item text-white bg-black"><p>Nickname: <span class="fw-bold"> {{user.nickName}}</span></p></ul>
              <ul class="list-group-item text-white bg-black"><p>Biografía: <span class="fw-bold"> {{user.biography}}</span></p></ul>
              <!-- <ul class="list-group-item text-white bg-black border-bottom"><p>Empresa: <span class="fw-bold"> Empresa</span></p></ul> -->
              <ul class="list-group-item text-white bg-black border-top"><p>Contraseña: <span class="fw-bold"> {{user.password}}</span></p></ul>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/users" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Roles y proyectos a los que pertenece -->

      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ViewUser",
  data() {
    return {
      user: null,
    };
  },
 
  created() {
    this.getProfile();
  },

  methods: {
    //FIND ONE
    async getProfile() {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/${this.$route.params.nickName}`);
        this.user = response.data[0];
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>