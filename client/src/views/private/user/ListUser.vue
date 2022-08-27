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
        <SearchBox :table="'User'" @search="searchUser" />
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
        v-for="(user, index) in paginated" :key="index"
      >
        <div class="card mx-4 border border-2 bg-black" style="width: 350px;">
          <div class="card-body p-0 text-center">
            <div v-if="user === null">
              <p class="text-center text-danger">No hay datos del usuario</p>
            </div>
            <ul v-else class="list-group">
              <li class="list-group-item bg-black">
                <!--  -->
                <div class="imagePreview__user-image border border-3 rounded-circle" :style="{ 'background-image': `url(${user.photo})` }"></div>
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
    <!-- PAGES -->
    <div v-if="numPages > 1"
      class="row-flex d-flex my-5 align-items-center justify-content-center bg-black"
    >
      <button type="button"
        class="button-page" :disabled="current <= 1"
        v-on:click="prevPage()"
      ><i class="fa-solid fa-caret-left"></i>
      </button>

      <button v-for="(index) in numPages" :key="index" 
        type="button"
        class="button-page"
        v-on:click="changePage(index)"
      ><i class="fa-solid" :class="'fa-' + index"></i>
      </button>

      <button type="button"
        class="button-page" :disabled="current >= numPages"
        v-on:click="nextPage()"
      ><i class="fa-solid fa-caret-right"></i>
      </button>
    </div>
    <!--  -->
  </div>
</div>
</template>

<script>
import userApi from "@/services/userApi";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "ListUser",
  data() {
    return {
      users: [],
      user_search: "",
      pageSize: 9,
      current: 1
    };
  },
 
  created() {
    this.getUsers();
  },

  computed: {
    numPages() {
      var res = Math.floor(this.users.length/this.pageSize);
      // var res = Math.round(n + 0,49)
      if(res > 10) { res = 10 }
      console.log(res)
      return res + 1
    },
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      return this.users.slice(this.indexStart, this.indexEnd);
    }
  },

  components: {
    SearchBox,
  },

  methods: {
    changePage(index) {
      this.current = index
    },

    prevPage () {
      this.current--
    },

    nextPage () {
      this.current++
    },

    getImage(name) {
      return "../../../../public/img/" + name + ".png";
    },

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

    searchUser(search) {
      if(search != -1) { this.users = search }
      else { this.getUsers() }        
    },
  },
};
</script>

<style>

</style>