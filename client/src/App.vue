<template>
<div class="app">
  <nav class="navbar navbar-dark bg-sucess navbar-expand-sm border-bottom border-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
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
            <!-- <li class="nav-item">
              <router-link to="/companies" class="nav-link active" aria-current="page">Empresas</router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  <router-view/>
</div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>

</style>