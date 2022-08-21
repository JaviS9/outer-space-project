<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de tecnologías
          <router-link :to="{name: 'AddTech'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nueva tecnología
          </router-link>
        </p>
        <p>Aquí se encuentran todas las tecnologías registradas en el sistema.</p>
        <SearchBox :table="'Tech'" @search="searchTech" />
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row d-flex justify-content-top align-items-start">
      <div class="col-md-12 d-flex flex-column align-items-center justify-content-center"
        v-if="techs.length === 0"
      >
        <p class="h5 text-danger">No se han encontrado tecnologías</p>
      </div>
      <div class="col-md-6"
        v-for="(tech, index) in paginated" :key="index"
      >
        <div class="col card border-light bg-black align-self-center mb-4 p-1">
          <div class="card-body p-0 bg-black">
            <div class="row-flex d-flex justify-content-center align-items-center">
              <div class="col-md-4 flex-column d-flex justify-content-center align-items-center">
                  <div class="imagePreview__tech-logo m-2" :style="{ 'background-image': `url(${tech.photo})` }"></div>
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-center align-items-top p-1">
                <li class="list-group justify-content-top align-items-top m-0">
                  <ul class="list-group-item bg-black border border-bottom-0 text-center text-white pt-3 pb-1 px-2 m-0">
                    <span class="h5 fw-bold m-0 p-0">{{tech.name}}</span>
                  </ul>
                  <ul class="list-group-item bg-black border text-center border-top-0 text-white pb-3 pt-0 px-2 m-0">
                    <p class="p-0 m-0">Tipo de tecnología: <span class="fw-bold">{{tech.type}}</span></p>                        
                  </ul>
                </li>
              </div>
              <div class="col-md-2 d-flex flex-column justify-content-center align-items-center px-1">
                  <router-link :to="{ name: 'EditTech', params: {tech_name: tech.name}}"
                    type="button" class="btn btn-outline-primary my-2">
                    <i class="fa fa-pen"></i>
                  </router-link>
                  <button 
                    @click="deleteTech(tech.id)"
                    class="btn btn-outline-danger my-2">
                      <i class="fa fa-trash"></i>
                  </button>
              </div>
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
</div>
</template>

<script>
import techApi from '@/services/techApi';
import SearchBox from '@/components/SearchBox.vue';

export default {
    name: "ListTech",
    data() {
    return {
      techs: [],
      pageSize: 8,
      current: 1
    };
  },
 
  created() {
    this.getTechs();
  },

  computed: {
    numPages() {
      var res = Math.floor(this.techs.length/this.pageSize);
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
      return this.techs.slice(this.indexStart, this.indexEnd);
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

    // **************************************************
    //LIST ALL
    async getTechs() {
      try {
        const response = await techApi.getTechs();
        this.techs = response.data.reverse();
        console.log(this.techs)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteTech(id) {
      try {
        const response = await techApi.deleteTech(id);
        console.log(response.data)
        this.getTechs()
      } catch (err) {
        console.log(err);
      }
    },
    
    searchTech (search) {
      this.techs = search
    }

  }
}
</script>

<style>

</style>