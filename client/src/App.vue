<template>
<div class="app flex-shrink-0">
  <!-- ADMIN -->
  <nav v-if="status.admin === true" class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-2 mb-2">
    <div class="container-fluid px-3">
      <router-link to="/manager" class="navbar-brand me-5">
          <img class="logo-icon" src="./assets/logo.png" alt="logo">OUTER SPACE PROJECT
          <span class="fw-bold text-warning">Manager</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item text-white">
            <router-link to="/manager/users" class="nav-link active" aria-current="page">Usuarios</router-link>
          </li>
          <li class="nav-item text-white">
            <router-link to="/manager/projects" class="nav-link active" aria-current="page">Proyectos</router-link>
          </li>
          <li class="nav-item text-white">
            <router-link to="/manager/admins" class="nav-link active" aria-current="page">Administradores</router-link>
          </li>
          <li class="nav-item text-white">
            <router-link to="/manager/techs" class="nav-link active" aria-current="page">Tecnologías</router-link>
          </li>
        </ul>
        <div class="d-flex">
            <router-link to="/" class="nav-link active text-danger" aria-current="page">Cerrar Sesión</router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- PUBLIC//USER -->
  <nav v-if="status.public === true" class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-2">
    <div class="container-fluid px-3">
      <router-link to="/manager" class="navbar-brand me-5">
          <img class="logo-icon" src="./assets/logo.png" alt="logo">OUTER SPACE PROJECT
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item text-white">
            <router-link to="/explore" class="nav-link active" aria-current="page">Explora</router-link>
          </li>
          <li class="nav-item text-white">
            <router-link to="/news" class="nav-link active" aria-current="page">Novedades</router-link>
          </li>
          <li class="nav-item text-white">
            <router-link to="/about" class="nav-link active" aria-current="page">Sobre Nosotros</router-link>
          </li>
        </ul>
        <div class="d-flex">
            <router-link to="/" class="nav-link active text-success" aria-current="page">Iniciar Sesión</router-link>
            <router-link to="/" class="nav-link active ms-2" aria-current="page">Registrarse</router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view/>

  <!-- <footer class="p-2 border-top m">
      <div class="row-flex d-flex justify-content-center align-items-center text-center p-0">
        <router-link to="/manager/users" class="d-inline p-2 nav-link active" aria-current="page">Usuarios</router-link><p class="ms-1 my-0">|</p>
        <router-link to="/manager/projects" class="d-inline p-2 nav-link active" aria-current="page">Proyectos</router-link><p class="ms-1 my-0">|</p>
        <router-link to="/manager/projects" class="d-inline p-2 nav-link active" aria-current="page">Administradores</router-link><p class="ms-1 my-0">|</p>
        <router-link to="/manager/techs" class="d-inline p-2 nav-link active" aria-current="page">Tecnologías</router-link>
      </div>
      <div class="row d-flex justify-content-center align-items-center text-center mx-5 my-0 border-top border-1 p-0">
        <router-link to="/" class="p-2 nav-link active d-flex align-items-center justify-content-center" aria-current="page">
          <p class="me-1 my-0">Copyright</p><i class="fa-regular fa-copyright"></i><p class="ms-2 my-0">2022 OUTER SPACE PROJECT, All rights reserved</p>
        </router-link>
      </div>
  </footer> -->
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      status: {
        admin: true,
        user: false,
        public: false
      }
    }
  }
}
</script>

<style>

</style>