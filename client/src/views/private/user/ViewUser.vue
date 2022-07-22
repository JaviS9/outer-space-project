<template>
<div class="viewUser">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de usuario</p>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img class="card-img-top icon-image-big" src="../../../../public/img/user-1.png" alt="alien-1">
      </div>
      <div class="col-md-6 card border-light bg-black align-self-center">
        <div class="card-body bg-black">
          <li class="list-group">
            <ul class="list-group-item text-white bg-black"><p>Email: <span class="fw-bold"> Email</span></p></ul>
            <ul class="list-group-item text-white bg-black"><p>Nombre: <span class="fw-bold"> Nombre</span></p></ul>
            <ul class="list-group-item text-white bg-black"><p>Rol: <span class="fw-bold"> Rol</span></p></ul>
            <ul class="list-group-item text-white bg-black border-bottom"><p>Empresa: <span class="fw-bold"> Empresa</span></p></ul>
            <ul class="list-group-item text-white bg-black"><p>Contraseña: <span class="fw-bold"> Contraseña</span></p></ul>
          </li>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <router-link to="/users" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "ViewUser"
}
</script>

<style>

</style>