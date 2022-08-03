<template>
<div class="listUser">
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
        <p class="h5 text-danger">No se han encontrado usuarios</p>
      </div>
      <div 
      class="col-md-4 p-4 d-flex flex-column align-items-center justify-content-center"
      v-for="user in users" :key="user.id"
      >
        <div class="card mx-4 border-light bg-black" style="width: 350px;">
          <div class="card-body p-0 text-center">
            <ul class="list-group">
              <li class="list-group-item bg-black">
                <!--  -->
                <img class="user-image" src="../../../../public/img/user-1.png" alt="alien-1">
                <!-- <img v-if="user.photo === null" class="user-image" src="../../../../public/img/user-1.png" alt="alien-1"> -->
                <!-- <img v-else class="user-image" :src="getImage(user.photo)" alt="user_image"> -->
                <!-- <div v-else class="imagePreview" :style="{ 'background-image': `url()` }" @click="selectImage"></div> -->
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
import { Buffer } from 'buffer';

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
    getImage(photo) {
      // var base64 = Buffer.from(photo, "binary").toString("base64")
      // let url = "data:image/jpeg;base64," + photo;
      try {
        // var blob = new Blob([photo.data], { type: "image/png" });
        // var imageUrl = URL.createObjectURL(blob);
        // console.log("URL -- " + imageUrl)
        // return imageUrl;
        let buffer = Buffer.from(photo.data)
        let base64 = Buffer.from(buffer, "binary").toString("base64")
        let img = 'data:image/png;base64,'+ base64
        // console.log(img)
        return img
        // let reader = new FileReader
        // reader.readAsDataURL(photo)
        // console.log("URL -- " + photo)
        // return photo
      } catch (e) {
        console.log(e)
      }
    },

    // **************************************************
    //LIST ALL
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/user/list");
        this.users = response.data.reverse();
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteUser(nickName) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/delete/${nickName}`);
        console.log(response.data)
        this.getUsers()
      } catch (err) {
        console.log(err);
      }
    },

    async searchUser() {
      try {
        const response = await axios.get(`http://localhost:5000/user/search/${this.user_search}`);
        this.users = response.data;
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