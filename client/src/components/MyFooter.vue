<template>
  <footer class="p-2 border-top border-2 m-0">
      <div v-if="$store.state.isAdminLoggedIn === true" class="row-flex d-flex justify-content-center align-items-center text-center p-0 mb-1">
        <router-link to="/manager/users" class="d-inline p-2 nav-link active" aria-current="page">Usuarios</router-link><p class="mx-1 my-0">|</p>
        <router-link to="/manager/projects" class="d-inline p-2 nav-link active" aria-current="page">Proyectos</router-link><p class="mx-1 my-0">|</p>
        <router-link to="/manager/admins" class="d-inline p-2 nav-link active" aria-current="page">Administradores</router-link><p class="mx-1 my-0">|</p>
        <router-link to="/manager/techs" class="d-inline p-2 nav-link active" aria-current="page">Tecnologías</router-link>
      </div>
      <div v-else class="row-flex d-flex justify-content-center align-items-center text-center p-0 mb-1">
        <router-link to="/explore" class="nav-link active" aria-current="page">Explora</router-link><p class="mx-2 my-0">|</p>
        <router-link to="/news" class="nav-link active" aria-current="page">Novedades</router-link><p class="mx-2 my-0">|</p>
        <router-link to="/about" class="nav-link active" aria-current="page">Sobre Nosotros</router-link>
      </div>
      <div class="row d-flex justify-content-center align-items-center text-center mx-5 my-0 border-top p-0">
        <router-link v-if="$store.state.isAdminLoggedIn === true" to="/manager" class="p-2 nav-link active d-flex align-items-center justify-content-center" aria-current="page">
          <p class="me-1 my-0">Copyright</p><i class="fa-regular fa-copyright"></i><p class="ms-2 my-0">2022 OUTER SPACE PROJECT <span class="text-warning">Manager</span>, All rights reserved</p>
        </router-link>
        <router-link v-else to="/" class="p-2 nav-link active d-flex align-items-center justify-content-center" aria-current="page">
          <p class="me-1 my-0">Copyright</p><i class="fa-regular fa-copyright"></i><p class="ms-2 my-0">2022 OUTER SPACE PROJECT, All rights reserved</p>
        </router-link>
      </div>
  </footer>
</template>

<script>
export default {
  name: 'MyFooter',

}
</script>

<style>

</style>