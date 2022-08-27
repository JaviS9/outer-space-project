<template>
  <div class="router-view">
    <div class="container my-3 pt-0 pb-5 border-bottom border-2">
      <div class="row mb-4">
          <div class="col">
              <p class="h3 fw-bold text-center mt-3">Proyecto <span class="orange">{{ project.title }}</span></p>
          </div>
      </div>
      <div class="row">
        <div class="col">
          <ProjectCard
            :projectinfo="project"
            :founder="founder"
            :num_subscriptions="num_subscriptions"
            :num_donations="num_donations"
            :subs_found="subs_found"
            :key="componentproject"
          /> 
        </div>
      </div>
      <div class="row-flex d-flex align-items-center justify-content-center mt-3">
        <button type="button" 
            class="btn btn-md btn-success rounded-pill border border-2 col-md-10"
            v-on:click="saveSubscription(project.id)"
            :disabled="subs_found != null"
        >
            <p v-if="subs_found != null" class="m-0"><i class="fa fa-check text-white"></i>Suscrito</p>
            <p v-else class="m-0"><i class="fa fa-plus text-white"></i>Suscribirse</p>
        </button>
        <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
          type="button" 
          class="btn btn-sm btn-primary text-white border border-2 ms-2"
          data-bs-toggle="modal" data-bs-target="#EditProject">
          <i class="fa fa-pen"></i>
        </button>
        <!-- MODAL -->
        <div class="modal fade modal-lg" 
          id="EditProject" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
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
                <UpdateProjectForm :founder="founder" :projectinfo="project" @updatedProject="getProject" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3 mb-5 border-bottom border-2 pb-3">
      <div class="row-flex d-flex justify-content-center align-items-top p-0 m-0">
        <!-- Actualizaciones -->
        <div class="col-md flex-column justify-content-center align-items-start mb-4 mt-0">
          
          <p class="fw-bold ms-3 mb-2 m-0">Actualizaciones
            <!-- BUTTON MODAL -->
            <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
              type="button" 
              class="ms-2 btn btn-md btn-outline-success rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#ModalUpdates">
              <i class="fa fa-plus"></i>Añadir actualización
            </button>
          </p>
        <!-- MODAL UPDATES -->
        <div class="modal fade modal modal-lg" id="ModalUpdates" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-black border-light p-3">
              <div class="row-flex d-flex align-items-start my-2">
                <p class="modal-title text-light" id="exampleModalLabel">Añadir Actualización</p>
                <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="row-flex align-items-center my-2">
                <!--  -->
                <form>
                  <textarea class="form-control" rows="3" placeholder="..." v-model="description"></textarea>
                </form>
                <div class="row-flex d-flex justify-content-end align-items-center mt-2 p-2">
                  <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" v-on:click="cancel">Cancelar</button>
                  <button type="button" class="btn btn-outline-success btn-sm ms-2" data-bs-dismiss="modal" v-on:click="saveUpdate">
                    Enviar <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center py-2 pe-3 mb-2 m-0">
          <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
          <div v-else v-for="update in updates" :key="update"  
            class="card bg-black border border-2 update mb-2"
          >
            <div class="card-body bg-black py-4 px-0">
              <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
                class="btn btn-outline-danger btn-sm rounded-circle" @click="deleteUpdate(update.update_date)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class="col-sm-11 m-0">
                <p class="m-2">{{ update.description }}</p>
              </div>
              <span class="fw-bold mb-2">{{ formatDate(update.update_date) }}</span>
            </div>
          </div>
        </div>
      </div>
        <!--  -->
        <div class="col-md-5 flex-column justify-content-center align-items-center p-0">
        <div class="card bg-black border border-3 border-warning rounded p-1">
          <div class="row-flex d-flex p-3">
            <span class="fw-bold ms-2 mb-0 text-warning">Suscripciones</span>
          </div>
          <div class="row-flex d-flex p-3 mb-2 mt-0 mx-2">
            <div class="col p-0 m-0">
              <UserList 
                :key="componentsubscriptions" 
                :project="project"
                @num_subscriptions="getNumSubscriptions"
                @subs_found="getSubs"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";

import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

import ProjectCard from '@/components/ProjectCard.vue';
import UpdateProjectForm from "@/components/UpdateProjectForm.vue";
import UserList from "@/components/UserList.vue";

import swal from 'sweetalert';
import { ref } from 'vue';

export default {
  name: 'ProjectPage',
  data() {
    return {
      project: {},
      description: "",
      founder: "",
      num_subscriptions: 0,
      num_donations: 0,
      subscriptions: [],
      donations: [],
      updates: [],
      subs_found: null,
    }
  },

  setup() {
    const componentsubscriptions = ref(0);
    const componentmodal = ref(0)
    const componentproject = ref(0)

    const rerendersubscriptions = () => {
      componentsubscriptions.value += 1;
    };

    const rerendermodal = () => {
      componentmodal.value += 1;
    };

    const rerenderproject = () => {
      componentproject.value += 1;
    };

    return {
      componentsubscriptions,
      componentmodal,
      componentproject,

      rerendersubscriptions,
      rerendermodal,
      rerenderproject
    }
  },

  created() {
    this.getProject(this.$route.params.title);
    if(this.$store.state.isUserLoggedIn){this.getOneSubscription(this.project.id)}
    this.getUsers();
  },

  components: { ProjectCard, UpdateProjectForm, UserList },

  methods: {

    formatDate(date) {
      return moment(date).fromNow();
    },

    getNumSubscriptions(num_subscriptions) {
      this.num_subscriptions = num_subscriptions
      this.rerenderproject()
      if(this.$store.state.isUserLoggedIn){this.getOneSubscription(this.project.id)}
    },

    getSubs(data) {
      this.subs_found = data
    },

    //FIND ONE
    async getProject(title) {
        try {
            const response = await projectApi.getProject(title);
            this.project = response.data[0];
            this.getFounder();
            if(this.$store.state.isUserLoggedIn){this.getOneSubscription(this.project.id)}
            this.getUpdates(this.project.id);
            this.getDonations(this.project.id);
        }
        catch (err) {
            console.log(err);
        }
    },

    async getUsers() {
        try {
          const response = await userApi.getUsers();
          this.users = response.data.reverse();
          this.rerendermodal()
        }
        catch (err) {
          console.log(err);
        }
    },

    async getFounder() {
      try {
        const response = await userApi.getUserId(this.project.projectFounder);
        this.founder = response.data[0];
      }
      catch (err) {
        console.log(err);
      }
    },

    async getUpdates(id) {
      try {
        const response = await projectApi.getUpdates(id);
        this.updates = response.data.reverse();
        console.log(this.updates)
      }
      catch (err) {
        console.log(err);
      }
    },

    async getOneSubscription(id) {
      try {
        const response = await userApi.getOneSubscription(this.$store.state.user.id, id);
        if (response.data.length > 0) {
          this.subs_found = response.data[0];
        }
        console.log(this.subs_found)
        this.rerenderproject()
      }
      catch (err) {
        console.log(err);
      }
    },

    async getDonations(id) {
      try {
        const response = await projectApi.getDonations(id);
        this.donations = response.data;

        let sum = 0;
        if(this.donations.length > 0) {
          this.donations.forEach(key => {
              sum += key.donation;
          });
        }
        this.num_donations = sum
        this.rerenderproject()
      }
      catch (err) {
        console.log(err);
      }
    },

    async saveUpdate(e) {
      try {
          e.preventDefault();
          const response = await projectApi.saveUpdate({
              idProject: this.project.id,
              description: this.description
          }, {
              headers: { "Content-Type": "application/json; charset=UTF-8" }
          });
          console.log(response.data);
          this.description = "";
          this.getUpdates(this.project.id)
      }
      catch (err) {
          console.log(err);
      }
    },
    
    async deleteUpdate(date) {
      try {
          const response = await projectApi.deleteUpdate(this.project.id, date);
          console.log(response.data);
          this.getUpdates(this.project.id);
      }
      catch (err) {
          console.log(err);
      }
    },

    async saveSubscription (idProject) {
      try {
          if(this.$store.state.isUserLoggedIn) {
              var subscriptions = []
              subscriptions[0] = {idUser: this.$store.state.user.id, idProject: idProject}

              let response = await userApi.saveSubscription({
                  subscriptions: subscriptions,
              }, {
                  headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
              );
              console.log(response.data)
              if(this.$store.state.isUserLoggedIn){this.getOneSubscription(this.project.id)}
              this.rerendersubscriptions()
              swal("Bien hecho!", "Te has suscrito a este proyecto con exito", "success")
          } else {
              this.$router.push('/start')
          }
      } catch (err) {
          console.log(err);
          swal("Ya estas suscrito a este proyecto")
      }
    },
  }
}
</script>

<style>
</style>