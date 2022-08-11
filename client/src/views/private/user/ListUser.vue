<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de usuarios
          <router-link
            :to="{name: 'AddUser'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nuevo usuario
          </router-link>
        </p>
        <p>Listado de usuarios.</p>
        <form>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Busca un usuario" v-model="user_search">
                </div>
                <div class="col">
                  <input type="submit" class="btn btn-outline-light" value="Buscar" @click="searchUser">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12 d-flex flex-column align-items-center justify-content-center" v-if="users.length === 0">
        <p class="h5 text-danger mt-5">No se han encontrado usuarios</p>
      </div>
      <div 
      class="col-md-4 p-4 d-flex flex-column align-items-center justify-content-center"
      v-else
      v-for="user in users" :key="user.id"
      >
        <div class="card mx-4 border-light bg-black" style="width: 350px;">
          <div class="card-body p-0 text-center">
            <div v-if="user === null">
              <p class="text-center text-danger">No hay datos del usuario</p>
            </div>
            <ul v-else class="list-group">
              <li class="list-group-item bg-black">
                <!--  -->
                <div class="imagePreview__user-image" :style="{ 'background-image': `url(${user.photo})` }"></div>
             </li>
              <li class="list-group-item bg-black text-white mb-0">
                <span class="fw-bold">{{ user.nickName }}</span>
              </li>
              <li v-if="user.name === '' && user.lastName === '' " class="list-group-item bg-black text-white">
                  <!-- <p> --- </p> -->
                  <br>
              </li>
              <li v-else class="list-group-item bg-black text-white">
                  <p>{{ user.name }} {{ user.lastName }}</p>
              </li>
              <!-- <li class="list-group-item bg-black text-white">
                <span class="fw-bold">{{ user.Role.name }}</span>
              </li> -->
              <li class="list-group-item bg-black border-top">
                <div class="row my-3">
                  <div class="col-sm-4">
                    <router-link :to="{ name: 'ViewUser', params: {nickName: user.nickName}}"
                      type="button"
                      class="btn btn-outline-warning"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <router-link :to="{name: 'EditUser', params: {nickName: user.nickName}}"
                      type="button" 
                      class="btn btn-outline-primary">
                      <i class="fa fa-pen"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <button 
                      @click="deleteUser(user.id)"
                      class="btn btn-outline-danger">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import userApi from "@/services/userApi";

export default {
  name: "ListUser",
  data() {
    return {
      users: [],
      user_search: ""
    };
  },
 
  created() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try{
        const users = await userApi.getUsers()
        this.users = users.data.reverse()
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    },
 
    async deleteUser(id) {
      try{
        const response = await userApi.deleteUser(id)
        console.log(response)
        this.getUsers()
      } catch (err) {
        console.log(err);
      }
    },

    async searchUser() {
      try {
        const users = await userApi.searchUser(this.user_search)
        this.users = users.data.reverse();
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style>

</style>