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
  <div class="container mt-5">
    <div class="col-md-12 d-flex flex-column align-items-center justify-content-center"
      v-if="projects.length === 0"
    >
      <p class="h5 text-danger">No se han encontrado proyectos</p>
    </div>
    <div class="row"
      v-for="project in projects" :key="project.id"
    >
        <div class="col card border-light bg-black align-self-center mx-2 mb-3">
            <div class="card-body p-0 bg-black">
                <div class="row-flex d-flex justify-content-center align-items-center">
                    <div class="col-sm-2 d-flex justify-content-center p-2">
                        <div class="imagePreview__project-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
                    </div>
                    <div class="col-sm-9 d-flex flex-column justify-content-center p-2 m-0">
                      <div class="card-body p-0 bg-black">
                        <li class="list-group">
                          <ul class="list-group-item text-white bg-black border border-bottom-0 mb-0">
                            <p><span class="h4 fw-bold">{{project.title}}</span></p>
                            <p class="my-3">{{project.description}}</p>
                          </ul>
                          <ul class="list-group-item text-white bg-black border mb-0">
                            <p class="mb-0">Desde <span class="fw-bold">{{project.startDate.substring(0, 10)}}</span></p>
                          </ul>
                        </li>
                      </div>
                    </div>
                    <div class="col-sm-1 ml-1 d-flex flex-column justify-content-center align-items-center pt-2">
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
                          class="btn btn-outline-danger mb-2">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
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