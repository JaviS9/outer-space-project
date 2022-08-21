<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 fw-bold">Explora los proyectos más populares</p>
                <SearchBox :table="'Project'" @search="searchProject" />
            </div>
        </div>
    </div>
    <div class="container mt-3 pt-3">
        <div class="row p-2">
            <div class="col-md-12 d-flex flex-column align-items-center justify-content-center" v-if="projects.length === 0">
                <p class="h5 text-danger mt-5">No hay proyectos aún</p>
            </div>
            <div 
                class="col-md-3 pe-1 d-flex flex-column justify-content-center"
                v-else
                v-for="project in projects" :key="project.id"
                :id="project.id"
            >
                <div class="card text-white bg-black border border-2 rounded p-2">
                    <li class="list-group">
                        <ul class="list-group-item bg-black text-white m-0 p-2 text-center">
                            {{ project.title }}
                        </ul>
                        <ul class="list-group-item bg-black text-white mx-0 my-2 py-2 ps-3 d-flex align-items-center justify-content-center">
                            <div class="imagePreview__user-image m-0 p-0"
                                :style="{ 'background-image': `url(${project.photo})` }"
                            >
                            </div>
                        </ul>
                        <ul class="list-group-item bg-black text-white mx-0 mb-2 p-0 justify-content-center d-flex">
                            <router-link :to="{ name: 'ProjectPage', params: {title: project.title}}"
                                type="button" class="btn btn-md btn-outline-warning rounded-pill"
                            ><i class="fa fa-eye"></i> Ver proyecto
                            </router-link>
                            <!--  -->
                            <router-link to="/" type="button" class="btn btn-md btn-outline-success rounded-pill ms-2">
                                <i class="fa fa-plus"></i> Suscribirse
                            </router-link>
                        </ul>
                    </li>
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
import projectApi from '@/services/projectApi';
import SearchBox from '@/components/SearchBox.vue';

export default {
    name: "ExploreProjects",
    data() {
        return {
            search: "",
            projects: [],
            aux_projects: [],
            pageSize: 12,
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