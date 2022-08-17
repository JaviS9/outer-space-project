<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 fw-bold">Explora los proyectos más populares</p>
                <SearchBox :table="Project" @search="searchProject" />
                <!-- <form>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Busca un proyecto"
                                        v-model="search"
                                        onkeyup="filter(projects, search)"
                                    >
                                </div>
                                <div class="col">
                                    <input type="submit" class="btn btn-outline-light" value="Buscar">
                                </div>
                            </div>
                        </div>
                    </div>
                </form> -->
            </div>
        </div>
    </div>
    <div class="container mt-3 pt-3">
        <div class="row p-2">
            <div class="col-md-12 d-flex flex-column align-items-center justify-content-center" v-if="projects.length === 0">
                <p class="h5 text-danger mt-5">No hay proyectos aún</p>
            </div>
            <div 
                class="col-md-3 p-2 d-flex flex-column border justify-content-center"
                v-else
                v-for="project in projects" :key="project.id"
                :id="project.id"
            >
                <li class="list-group">
                    <ul class="list-group-item bg-black text-white m-0 p-2 text-center">
                        {{ project.title }}
                    </ul>
                    <ul class="list-group-item bg-black text-white mx-0 my-2 p-2">
                        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
                    </ul>
                    <ul class="list-group-item bg-black text-white mx-0 mb-2 p-0 justify-content-center d-flex">
                        <router-link to="/" type="button" class="btn btn-md btn-outline-warning rounded-pill">
                            <i class="fa fa-eye me-2"></i>Ver proyecto
                        </router-link>
                        <router-link to="/" type="button" class="btn btn-md btn-outline-success rounded-pill ms-2">
                            <i class="fa fa-plus me-2"></i>Suscribirse
                        </router-link>
                    </ul>
                </li>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import projectApi from '@/services/projectApi';
import SearchBox from '@/components/SearchBox.vue';

export default {
    name: "ExploreProjects",
    data() {
        return {
            search: "",
            projects: [],
            aux_projects: []
        };
    },
    created() {
        this.getProjects();
    },
    methods: {
        filter(list, search) {
            let filter;
            filter = search.value.toUpperCase();
            for (let i = 0; i < list.length; i++) {
                if (!list[i].title.toUpperCase().indexOf(filter) > -1) {
                    this.aux_projects.push(list[i]);
                    list.splice(i, 1);
                }
            }
        },
        
        searchProject(search) {
            this.projects = search
        },

        async getProjects() {
            try {
                const projects = await projectApi.getProjects();
                this.projects = projects.data.reverse();
            }
            catch (err) {
                console.log(err);
            }
        }
    },

    components: { SearchBox }
}
</script>

<style>

</style>