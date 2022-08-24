<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de usuario</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <!-- USER CARD -->
    <UserCard :user="user" />
    <!--  -->
    <div class="row mb-3">
      <div class="col">
        <router-link to="/manager/users" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container mt-4 p-2">
    <div class="row-flex d-flex justify-content-center align-items-top">
      <div class="col-md-4 mx-1 d-flex flex-column card bg-black">
        <div class="card-body p-0 bg-black">
          <li class="list-group">
            <ul class="list-group-item text-black text-center border-info bg-info mb-2 p-2">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-1 flex-column d-flex justify-content-center align-items-start">
                  <i class="fa fa-rocket rounded-circle border border-info p-2"></i>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span class="fw-bold ms-2">Proyectos fundados</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <button type="button" 
                    class="btn btn-sm btn-success text-white border border-2 rounded-pill"
                    data-bs-toggle="modal" data-bs-target="#MyProjectsModal">
                    <i class="fa fa-plus"></i>
                  </button>
                  <!-- MODAL -->
                  <div class="modal fade modal-lg" 
                    id="MyProjectsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content bg-black border border-2 text-white p-3">
                        <div class="modal-header">
                          <h5 class="modal-title fw-bold" id="staticBackdropLabel">Crea un nuevo proyecto</h5>
                          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
                            <i class="fa fa-xmark"></i>
                          </button>
                        </div>
                        <div class="modal-body">
                          <CreateProjectForm :user="user"  @signal="getMyProjects"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </li>
          <ProjectList :key="componentfundedProjects" :user="user" :listName="'fundedProjects'" />
        </div>
      </div>
      <div class="col-md-4 mx-1 d-flex flex-column card bg-black">
        <div class="card-body p-0 bg-black">
          <li class="list-group">
            <ul class="list-group-item text-black text-center border-warning bg-warning mb-2 p-2">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-1 flex-column d-flex justify-content-center align-items-start">
                  <i class="fa-solid fa-star border rounded-circle border-warning p-2"></i>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span class="fw-bold ms-2">Suscripciones</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <ModalForm :id="'ModalSubscription'"
                    :title="'suscripciones'" :type="'project'" :list="projects" 
                    @selected_items="saveSubscription"
                  />
                </div>
              </div>
            </ul>
          </li>
          <ProjectList :key="componentsubscriptions" :user="user" :listName="'subscriptions'" />
        </div>
      </div>
      <div class="col-md-4 mx-1 d-flex flex-column card bg-black">
        <div class="card-body p-0 bg-black">
          <li class="list-group">
            <ul class="list-group-item text-black text-center border-primary bg-primary mb-2">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-1 flex-column d-flex justify-content-center align-items-start">
                  <i class="fa-solid fa-globe border rounded-circle border-primary p-2"></i>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span class="fw-bold ms-2">Participaciones</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <ModalForm :id="'ModalParticipation'"
                    :title="'participaciones'" :type="'project'" :list="projects"
                    @selected_items="saveParticipation"
                  />
                </div>
              </div>
            </ul>
          </li>
          <ProjectList :key="componentparticipations" :user="user" :listName="'participations'" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

import ModalForm from '@/components/ModalForm.vue';
import UserCard from '@/components/UserCard.vue';
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';

import swal from 'sweetalert';
import { ref } from 'vue';

export default {
  name: "ViewUser",
  data() {
    return {
      user: null,
      selected_project: null,
      previewImage: null,
      projects: [],
      selected_projects: [],
      techs: [],
      subscriptions: [],
      projectsFunded: [],
      participations: []
    };
  },
 
  created() {
    this.getProfile();
    this.getProjects();
  },

  setup() {
    const componentfundedProjects = ref(0);
    const componentsubscriptions = ref(0);
    const componentparticipations = ref(0);

    const rerenderfundedProjects = () => {
      componentfundedProjects.value += 1;
    };

    const rerendersubscriptions = () => {
      componentsubscriptions.value += 1;
    };

    const rerenderparticipations = () => {
      componentparticipations.value += 1;
    };

    return {
      componentfundedProjects,
      componentsubscriptions,
      componentparticipations,

      rerenderfundedProjects,
      rerendersubscriptions,
      rerenderparticipations,
    }
  },

  components: {
    ModalForm,
    UserCard,
    CreateProjectForm,
    ProjectList
  },

  methods: {
    //FIND ONE
    async getProfile() {
      try {
        const response = await userApi.getUser(this.$route.params.nickName);
        this.user = response.data[0];
        this.previewImage = this.user.photo
        this.getTechs(this.user.id)
      } catch (err) {
        console.log(err);
      }
    },

    async getTechs(id) {
        try {
            const techs = await userApi.getTechs(id)
            this.techs = techs.data
        } catch (err) {
            console.log(err)
        }
    },

    async getProjects() {
      try {
        const projects = await projectApi.getProjects();
        this.projects = projects.data.reverse();
      } catch (err) {
        console.log(err);
      }
    },

    getMyProjects(data) {
      if (data != 0) {
        this.rerenderfundedProjects()
      }
    },

    async saveSubscription (selected_items) {
      try {
        this.selected_projects = selected_items;
        for(let i = 0; i < this.selected_projects.length; i++){
          this.subscriptions[i] = {idUser: this.user.id, idProject: this.selected_projects[i].id}
        }
        let response = await userApi.saveSubscription({
          subscriptions: this.subscriptions,
        }, {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data)
        this.selected_projects = [];
        this.rerendersubscriptions()
      } catch (err) {
        console.log(err);
        swal("Ha habido algún error!", "Ya esta suscrito a alguno de estos proyectos", "error")
      }
    },

    async saveParticipation (selected_items) {
      try {
        this.selected_projects = selected_items;
        for(let i = 0; i < this.selected_projects.length; i++){
          this.participations[i] = {idUser: this.user.id, idProject: this.selected_projects[i].id}
        }

        let response = await userApi.saveParticipation({
          participations: this.participations,
        }, {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );

        console.log(response.data)
        this.selected_projects = [];
        this.rerenderparticipations()
      } catch (err) {
        console.log(err);
        swal("Ha habido algún error!", "Ya participa en alguno de estos proyectos", "error")
      }
    },

    async deleteSubscription(idProject) {
      try {
        const response = await userApi.deleteSubscription(this.user.id, idProject);
        console.log(response.data)
        this.getSubscriptions(this.user.id)
      } catch (err) {
        console.log(err);
      }
    },

    async deleteParticipation(idProject) {
      try {
        const response = await userApi.deleteParticipation(this.user.id, idProject);
        console.log(response.data)
        this.getParticipations(this.user.id);
      } catch (err) {
        console.log(err);
      }
    },

    // HELPERS
    cancel() {
      this.selected_projects = [];
    },

    saveProject(list) {
        let found = false
        
        for(let i = 0; i < list.length && found == false; i++){
            if(this.selected_project.title == list[i].title){
              found = true
            }
        }
        if (found == false && this.selected_project != {}) { 
            list.push(this.selected_project)
            console.log(list)
        }
        else { console.log("ERROR: elemente ya añadido")} 
    },

    deleteProject(title, list) {
        let found = -1
        for(let i = 0; i < list.length && found == -1; i++){
            if(title == list[i].title){
              found = i
            }
        }
        if (found != -1) {
            list.splice(found, 1)
            console.log(list)
        }
    },
  }
}
</script>

<style>

</style>