<template>
<div class="listAdmin">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de administradores
          <router-link
            :to="{name: 'AddAdmin'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nuevo administrador
          </router-link>
        </p>
        <p>Listado de administradores.</p>
        <form>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Busca un administrador" v-model="admin_search">
                </div>
                <div class="col">
                  <input type="submit" class="btn btn-outline-light" value="Buscar" @click="searchAdmin">
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
      <div class="col-md-12 d-flex flex-column align-items-center justify-content-center" v-if="admins.length === 0">
        <p class="h5 text-danger">No se han encontrado administradores</p>
      </div>
      <div 
      class="col-md-4 p-4 d-flex flex-column align-items-center justify-content-center"
      v-for="admin in admins" :key="admin.id"
      >
        <div class="card mx-4 border-light bg-black" style="width: 350px;">
          <div class="card-body p-0 text-center">
            <ul class="list-group">
              <li class="list-group-item bg-black">
                <!--  -->
                <img class="user-image" src="../../../../public/img/admin-1.png" alt="admin-1">
             </li>
              <li v-if="admin.name === '' && admin.lastName === '' " class="list-group-item bg-black text-white">
                <br>
              </li>
              <li v-else class="list-group-item bg-black text-white">
                  <p>{{ admin.name }} {{ admin.lastName }}</p>
              </li>
              <li class="list-group-item bg-black border-top">
                <div class="row my-3">
                  <div class="col-sm-4">
                    <router-link :to="{ name: 'ViewAdmin', params: {id: admin.id}}"
                      type="button"
                      class="btn btn-outline-warning"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <router-link :to="{name: 'EditAdmin', params: {id: admin.id}}"
                      type="button" 
                      class="btn btn-outline-primary">
                      <i class="fa fa-pen"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <button 
                      @click="deleteAdmin(admin.id)"
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
  name: "ListAdmin",
  data() {
    return {
      admins: [],
      admin_search: ""
    };
  },
 
  created() {
    this.getAdmins();
  },

  methods: {

    //LIST ALL
    async getAdmins() {
      try {
        const response = await axios.get("http://localhost:5000/admin/list");
        this.admins = response.data.reverse();
        console.log(this.admins)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteAdmin(id) {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/delete/${id}`);
        console.log(response.data)
        this.getAdmins()
      } catch (err) {
        console.log(err);
      }
    },

    async searchAdmin() {
      try {
        const response = await axios.get(`http://localhost:5000/admin/search/${this.admin_search}`);
        this.admins = response.data;
        console.log(this.admins)
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style>

</style>