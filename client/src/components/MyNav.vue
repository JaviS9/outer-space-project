<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-2">
    <div class="container-fluid px-3">
      <router-link  v-if="$store.state.isAdminLoggedIn" to="/manager" class="navbar-brand me-5">
          <img class="logo-icon" src="../assets/logo.png" alt="logo">OUTER SPACE PROJECT
          <span class="fw-bold orange">Manager</span>
      </router-link>
      <router-link  v-else to="/" class="navbar-brand me-5">
          <img class="logo-icon" src="../assets/logo.png" alt="logo">OUTER SPACE PROJECT
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="$store.state.isAdminLoggedIn" class="navbar-nav me-auto mb-2 mb-lg-0">
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
        <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0">
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
            <router-link v-if="!$store.state.isUserLoggedIn && !$store.state.isAdminLoggedIn"
              type="button" to="/start" 
              class="nav-link active btn btn-sm border rounded-pill btn-success p-2" 
              aria-current="page">Comenzar
            </router-link>
            <div class="btn-group" v-if="$store.state.isUserLoggedIn || $store.state.isAdminLoggedIn">
              <button v-if="$store.state.isUserLoggedIn" type="button"
                class="btn btn-sm border border-3 rounded-circle p-2 dropdown-toggle imagePreview__mini-image"
                :style="{ 'background-image': `url(${$store.state.user.photo})` }"
                data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <button v-if="$store.state.isAdminLoggedIn" type="button"
                class="btn btn-sm bg-admin border border-3 rounded-circle p-2 text-white dropdown-toggle imagePreview__mini-image"
                data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <ul v-if="$store.state.isUserLoggedIn || $store.state.isAdminLoggedIn"
                class="dropdown-menu dropdown-menu-end bg-black text-white border border-2">
                <li>
                  <router-link
                    type="button" :to="{ name: 'MyProfile' }"
                    class="nav-link active p-2 flex-column d-flex align-items-center justify-content-center"
                    aria-current="page">Mi perfil
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li class="nav-link active pb-2 flex-column d-flex align-items-center justify-content-center">
                  <button
                    type="submit" v-on:click="shutSession"
                    class="nav-link active btn btn-sm border rounded-pill btn-danger p-2"
                    aria-current="page">Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Authentication from '@/services/Authentication'

export default {
  name: 'MyNav',
  props: {
    status: {},
  },

  methods: {
    shutSession () {
      try {
          if(this.$store.state.token && this.$store.state.isAdminLoggedIn){
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setAdmin', null)
          } else if (this.$store.state.token && this.$store.state.isUserLoggedIn) {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
          }
          Authentication.deleteUserLogged()
          this.$router.push('/')
      } catch (error) {
          window.alert(this.error)
      }
    }
  }
}
</script>

<style>

</style>