<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de proyectos
          <router-link :to="{name: 'AddProject'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nuevo proyecto
          </router-link>
        </p>
        <p>Listado de proyectos.</p>
        <SearchBox :table="'Project'" @search="searchProject" />
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row d-flex justify-content-center">
      <div v-if="projects.length === 0">
        <p class="h5 text-danger text-center">No se han encontrado proyectos</p>
      </div>
      <div v-else v-for="project in paginated" :key="project.id"
        class="col-md-10 pb-3 d-flex flex-column justify-content-center"
      >
        <div class="card bg-black border border-2 p-0 m-0">
          <div class="row-flex d-flex align-items-center justify-content-center">

              <div class="col-md-2 d-flex flex-column justify-content-center align-items-center p-3 m-0">
                  <div class="imagePreview__project-image border border-3 rounded-circle m-0" :style="{ 'background-image': `url(${project.photo})` }"></div>
              </div>
              <div class="col-md-9 d-flex flex-column justify-content-center p-2 m-0">
                <div class="card-body p-0 bg-black">
                  <li class="list-group">
                    <ul class="list-group-item text-white bg-black border border-2 border-bottom-0 mb-0">
                      <p class="mb-2 mt-1"><span class="h4 fw-bold orange">{{project.title}}</span></p>
                      <p class="mb-2">{{project.description}}</p>
                    </ul>
                    <ul class="list-group-item text-white bg-black border border-2 border-top-0 mb-0">
                      <p class="my-1">Desde <span class="fw-bold">{{formatDate(project.startDate)}}</span></p>
                    </ul>
                  </li>
                </div>
              </div>
              <div class="col-md-1 d-flex flex-column justify-content-center align-items-center p-2 m-0">
                <router-link :to="{ name: 'ViewProject', params: {title: project.title}}"
                  type="button" class="btn btn-outline-warning mb-2">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="{ name: 'EditProject', params: {title: project.title}}"
                  type="button" class="btn btn-outline-primary mb-2">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button 
                  @click="deleteProject(project.id)"
                  class="btn btn-outline-danger">
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
</template>

<script>
import projectApi from "@/services/projectApi";
import SearchBox from "@/components/SearchBox.vue";

export default {
    name: "ListProject",
    data() {
    return {
      projects: [],
      pageSize: 5,
      current: 1
    };
  },
 
  created() {
    this.getProjects();
  },

  computed: {
    numPages() {
      var res = Math.floor(this.projects.length/this.pageSize);
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
      return this.projects.slice(this.indexStart, this.indexEnd);
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

    formatDate(date){
      return date.substring(0, 10).replaceAll('-', '/')
    },

    //LIST ALL
    async getProjects() {
      try {
        const response = await projectApi.getProjects();
        this.projects = response.data.reverse();
        console.log(this.projects)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteProject(id) {
      try {
        const response = await projectApi.deleteProject(id);
        console.log(response.data)
        this.getProjects()
      } catch (err) {
        console.log(err);
      }
    },

    searchProject (search) {
      this.projects = search
    }
    
  }
}
</script>

<style>

</style>