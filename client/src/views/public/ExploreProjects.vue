<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 fw-bold mb-2">Explora los proyectos más populares</p>
                <p>Explora a través del espacio y descubre nuevos proyectos que liderarán el futuro.</p>
                <SearchBox :table="'Project'" @search="searchProject" />
            </div>
        </div>
    </div>
    <div class="container mt-0 pt-0">
        <div class="row p-2">
            <div class="col-md-12 d-flex flex-column align-items-center justify-content-center" v-if="projects.length === 0">
                <p class="h5 text-danger mt-5">No hay proyectos aún</p>
            </div>
            <div 
                class="col-md-4 m-0 p-3 d-flex flex-column justify-content-center"
                v-else
                v-for="project in projects" :key="project.id"
            >
                <div class="card bg-black text-white border border-3 m-2 p-3"
                    style="height: 500px"
                >
                    <div class="row-flex d-flex justify-content-center align-items-center">
                        <router-link :to="{ name: 'ProjectPage', params: {title: project.title}}"
                            type="button" 
                            class="d-flex justify-content-center align-items-center mt-4 rounded-circle button-image"
                            style="width: 250px"
                        >
                            <div class="imagePreview__user-image m-0 p-0"
                                :style="{ 'background-image': `url(${project.photo})` }"
                            ></div>
                        </router-link>
                    </div>
                    <div class="card-body my-3">
                        <!-- FIN PROGRESS -->
                        <div class="progress my-3 rounded-pill bg-black border border-light border-3" style="height: 20px;">
                            <div class="progress-bar bg-orange rounded-pill mx-0" 
                                :class="{ 'bg-orange': getProgress(project.title, project.financiation) != '100%', 'bg-success': getProgress(project.title, project.financiation) == '100%' }"
                                role="progressbar" :style="{'width': getProgress(project.title, project.financiation)}"
                                aria-valuenow="25" 
                                aria-valuemin="0" 
                                aria-valuemax="100">
                            </div>
                        </div>
                        <!--  -->
                        <h5 class="card-title fw-bold">{{ project.title }}</h5>
                        <p class="card-text long-text">{{ project.description }}</p>
                        <p class="card-text border border-3 rounded-pill p-2 bg-black text-center">Desde {{ formatDate(project.startDate) }}</p>
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
        <div v-else style="width: 100%; height: 60px"></div>
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
            donations: [],
            num_donations: 0,
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
        },
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
        
        searchProject(search) {
            if(search != -1) { this.projects = search }
            else { this.getProjects() }            
        },

        getProgress(title, financiation) {
            var donation = 0
            console.log(this.donations)
            for(let i = 0; i < this.donations.length; i++) {
                if(this.donations[i].title == title) {
                    donation = this.donations[i].total
                    break
                }
            }
            if (donation != 0) { 
                var res = ((donation/financiation)*100)
                 if (res < 100) { 
                    return String(res.toFixed(0)) + '%'
                 } else if (res >= 100) {
                    return '100%'
                 }
            }
            else { return ""}
        },

        formatDate(date){
            return date.substring(0, 10).replaceAll('-', '/').split("/").reverse().join("/")
        },

        async getProjects() {
            try {
                const projects = await projectApi.getProjects();
                this.projects = projects.data.reverse();
                this.getDonations();
            }
            catch (err) {
                console.log(err);
            }
        },

        async getDonations() {
            try {
                const response = await projectApi.getAllDonations();
                this.donations = response.data;
            }
            catch (err) {
                console.log(err);
            }
        },
    },

    components: { SearchBox }
}
</script>

<style>

</style>