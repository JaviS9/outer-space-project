<template>
<div class="router-view">
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
        <SearchBox :table="'Admin'" @search="searchAdmin" />
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
    <!-- PAGES -->
    <div class="row-flex d-flex my-5 align-items-center justify-content-center bg-black">
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
import adminApi from '@/services/adminApi';
import SearchBox from '@/components/SearchBox.vue';

export default {
  name: "ListAdmin",
  data() {
    return {
      admins: [],
      admin_search: "",
      pageSize: 9,
      current: 1
    };
  },
 
  created() {
    this.getAdmins();
  },

  computed: {
    numPages() {
      var res = Math.floor(this.admins.length/this.pageSize);
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
      return this.admins.slice(this.indexStart, this.indexEnd);
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
    
    //LIST ALL
    async getAdmins() {
      try {
        const response = await adminApi.getAdmins();
        this.admins = response.data.reverse();
        console.log(this.admins)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteAdmin(id) {
      try {
        const response = await adminApi.deleteAdmin(id);
        console.log(response.data)
        this.getAdmins()
      } catch (err) {
        console.log(err);
      }
    },

    searchAdmin(search) {
      this.admins = search
    }
  },
};
</script>

<style>

</style>