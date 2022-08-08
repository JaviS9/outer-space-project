<template>
<div class="app">
  <nav class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-2">
    <div class="container">
      <router-link to="/" class="navbar-brand me-5">
          <i class="fa fa-rocket"></i> OUTER SPACE PROJECT
          <span class="fw-bold text-warning">Manager</span>
      </router-link>
      <div class="collapse navbar-collapse">
        <ul class="item-list navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/users" class="nav-link active" aria-current="page">Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projects" class="nav-link active" aria-current="page">Proyectos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admins" class="nav-link active" aria-current="page">Administradores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/techs" class="nav-link active" aria-current="page">Tecnologías</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
  <!-- <footer class="col flex-column bg-black border-top border-2 text-white p-2">
    <div class="row-flex d-flex justify-content-center align-items-center text-center p-0">
      <router-link to="/users" class="d-inline p-2 nav-link active" aria-current="page">Usuarios</router-link><p class="ms-1 my-0">|</p>
      <router-link to="/projects" class="d-inline p-2 nav-link active" aria-current="page">Proyectos</router-link><p class="ms-1 my-0">|</p>
      <router-link to="/" class="d-inline p-2 nav-link active" aria-current="page">Tecnologías</router-link>
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
  name: "App"
}
</script>

<style>

</style>