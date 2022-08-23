<template>
<div class="row-flex d-flex align-items-center justify-content-center">
    <div class="col-10">
        <div class="row-flex d-flex align-items-center justify-content-center m-0 p-0">
            <div class="col-md-3 d-flex flex-column justify-content-center align-items-bottom m-0 pe-5">
                <div class="imagePreview__project-page m-0 p-0 border border-4"
                    :style="{ 'background-image': `url(${project.photo})` }"
                ></div>
            </div>
            <!--  -->
            <div class="col-md-3 d-flex flex-column justify-content-center align-items-end m-0 p-0">
                <div class="card blockquote p-3 border border-2 rounded-circle bg-black text-center justify-content-center"
                    style="width: 220px; height: 220px;"
                >
                    <span class="card-title mb-0">Suscripciones</span>
                    <p class="number-score mt-0">{{formatNumber(num_subscriptions)}}</p>
                </div>              
            </div>
            <div class="col-md-3 d-flex flex-column justify-content-center align-items-center m-0 p-0">
                <div class="card blockquote p-3 border border-2 rounded-circle bg-black text-white d-flex align-items-center justify-content-center"
                    style="width: 220px; height: 220px;"
                >
                    <span class="card-title mb-0">Participaciones</span>
                    <p class="number-score mt-0">{{formatNumber(num_participations)}}</p>
                </div>
            </div>
            <div class="col-md-3 d-flex flex-column justify-content-center align-items-start m-0 p-0">
                <router-link type="button" v-if="subs_found != null"
                    :to="{ name: 'ViewSubscription', params: {subscription: subs_found.numSubs}}"
                    class="button-donation card blockquote p-3 border-green border-3 rounded-circle bg-black text-center justify-content-center"
                    style="width: 220px; height: 220px; text-decoration: none; color: inherit;"
                >
                    <span class="card-title mb-0 greenyellow">Donaciones</span>
                    <p class="number-score mt-0 greenyellow">
                        {{formatNumber(num_donations)}}<i class="fa fa-euro-sign"></i>
                    </p>
                </router-link>
                <div v-else
                    class="card blockquote p-3 border-green border-3 rounded-circle bg-black text-center justify-content-center"
                    style="width: 220px; height: 220px; text-decoration: none; color: inherit;"
                >
                    <span class="card-title mb-0 greenyellow">Donaciones</span>
                    <p class="number-score mt-0 greenyellow">
                        {{formatNumber(num_donations)}}<i class="fa fa-euro-sign"></i>
                    </p>
                </div>
            </div>
            <!--  -->
        </div>
        <!-- FIN PROGRESS -->
        <div class="progress my-3 rounded-pill bg-black border border-light border-3" style="height: 30px;">
            <div class="progress-bar bg-orange rounded-pill" 
                role="progressbar" :style="{'width': getProgress()}"
                aria-valuenow="25" 
                aria-valuemin="0" 
                aria-valuemax="100">{{ getProgress() }}</div>
        </div>
        <!--  -->
        <div class="row-flex d-flex align-items-center justify-content-end m-0 p-0">
            <div class="col-md-12 flex-column justify-content-center align-items-center m-0 p-0">
                <div class="card p-0 bg-black">
                    <li class="list-group" v-if="project === null">
                        <ul class="list-group-item bg-black text-center mt-4"><p class="text-danger">No hay datos</p></ul>
                    </li>
                    <li class="list-group" v-else>
                        <ul class="list-group-item text-white border border-2 bg-black mx-0 py-2 px-4 mb-2">
                            <router-link v-if="founder != null"
                                type="button" 
                                :to=" $store.state.isAdminLoggedIn ? `/manager/users/profile/${founder.nickName}` : `/user/${founder.nickName}`"
                                class="d-flex align-items-center justify-content-start p-0 m-0"
                                style="text-decoration: none; color: inherit;"
                            >
                                <div class="flex-column d-flex align-items-center justify-content-center m-0 p-0">
                                    <i class="fa-solid fa-crown text-warning"></i>
                                    <div class="imagePreview__mini-image m-0 p-0 border border-4"
                                        :style="{ 'background-image': `url(${founder.photo})` }"
                                    ></div>
                                </div>
                                <div class="col-md-4 d-flex align-items-start justufy-content-center m-0 px-2 pt-3">
                                    <p class="fw-bold m-0 p-0">{{founder.nickName}}</p>
                                </div>
                            </router-link>
                            <p class="mb-2 mt-3 p-0"><i class="fa-solid fa-coins greenyellow"></i> {{project.financiation}} <i class="fa fa-euro-sign"></i></p>
                            <p v-if="project.repository" class="mb-2 mt-3 p-0"><i class="fa-brands fa-github purple fa-xl"></i> {{project.repository}}</p>
                            <p v-if="project.description" class="mb-2 mt-3 py-2 border-top border-1"><i class="fa-solid fa-book text-primary fa-xl"></i> {{project.description}}</p>
                        </ul>
                        <ul class="list-group-item text-white border border-2 bg-black m-0 py-2 px-4">
                            <p class="m-0">Creado el <span class="fw-bold">{{formatDate(project.startDate)}}</span></p>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ProjectCard',
    data() {
        return {
            project: null,
        }
    },

    props: {
        projectinfo: {},
        founder: String,
        num_subscriptions: Number,
        num_participations: Number,
        num_donations: Number,
        subs_found: {},
    },

    created() {
        this.project = this.$props.projectinfo
    },

    methods: {

        formatDate(date){
            return date.substring(0, 10).replaceAll('-', '/')
        },

        getProgress() {
            return String(((this.num_donations/this.project.financiation)*100).toFixed(2)) + '%'
        },

        formatNumber(number) {
            var res
            if (number >= 0 && number < 1000) { 
                return number
            }
            if (number >= 1000 && number < 1000000) {
                res = (number/1000).toFixed(1)
                return String(res) + "K"
            } 
            if (number >= 1000000) {
                res = (number/1000000).toFixed(1)
                return String(res) + "M"
            }
        },
    }
}
</script>

<style>

</style>