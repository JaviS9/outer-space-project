<template>
<div class="listUser">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de usuarios
          <router-link to="/users/add/"
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
                  <input type="text" class="form-control" placeholder="Busca un usuario">
                </div>
                <div class="col">
                  <input type="submit" class="btn btn-outline-light" value="Buscar">
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
        <p class="h5"> - Aún no hay usuarios - </p>
      </div>
      <div 
      class="col-md-4 p-4 d-flex flex-column align-items-center justify-content-center"
      v-for="user in users" :key="user.id"
      >
        <div class="card mx-4 border-light bg-black">
          <div class="card-body p-0 text-center">
            <ul class="list-group">
              <li class="list-group-item bg-black">
                <img class="card-img-top user-image my-3" src="../../../../public/img/user-1.png" alt="alien-1">
              </li>
              <li class="list-group-item bg-black text-white">
                <span class="fw-bold">{{ user.nickName }}</span>
              </li>
              <li class="list-group-item bg-black text-white">
                <p>{{ user.name }}</p><p>{{ user.lastName }}</p>
              </li>
              <!-- <li class="list-group-item bg-black border-bottom text-white">
                <span class="fw-bold">{{ user.Role.name }}</span>
              </li> -->
              <li class="list-group-item bg-black">
                <div class="row my-3">
                  <div class="col-sm-4">
                    <router-link to="{name: 'ViewUser', params: {nickName: user.nickName}}"
                      type="button"
                      class="btn btn-outline-warning"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <router-link to="{name: 'EditUser', params: {nickName: user.nickName}}"
                      type="button" 
                      class="btn btn-outline-primary">
                      <i class="fa fa-pen"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <button 
                      @click="deleteUser(user.nickName)"
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
import axios from "axios";

export default {
  name: "ListUser",
  data() {
    return {
      users: [],
    };
  },
 
  created() {
    this.getUsers();
  },
 
  methods: {
    //LIST ALL
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/user/list");
        this.users = response.data;
      } catch (err) {
        console.log(err);
        return;
      }
    },
 
    //DELETE
    async deleteUser(nickName) {
      try {
        await axios.delete(`http://localhost:5000/user/delete/${nickName}`);
        this.getUsers();
      } catch (err) {
        console.log(err);
        return;
      }
    },
  },
};
</script>

<style>

</style>