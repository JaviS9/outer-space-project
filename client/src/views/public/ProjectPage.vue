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
            :num_participations="num_participations"
            :num_donations="num_donations"
          /> 
        </div>
      </div>
      <div 
        class="row-flex d-flex align-items-center justify-content-start mt-5"
      >
        <button type="button" 
            class="btn btn-md rounded-pill border border-2 ms-2 col-md-6"
            :class="{'btn-success': !subs_found, 'btn-outline-success': subs_found}"
            v-on:click="saveSubscription(project.id)"
            :disabled="subs_found"
        >
            <p v-if="!subs_found" class="m-0"><i class="fa fa-plus text-white"></i>Suscribirse</p>
            <p v-else class="m-0"><i class="fa fa-check text-white"></i>Suscrito</p>
        </button>
        <button type="button" 
            class="btn btn-md rounded-pill ms-2 border border-2 col-md-6"
            :class="{'btn-primary': !part_found, 'btn-outline-primary': part_found}"
            v-on:click="saveParticipation(project.id)"
            :disabled="part_found"
        >
            <p v-if="!part_found" class="m-0"><i class="fa fa-plus text-white"></i>Participar</p>
            <p v-else class="m-0"><i class="fa fa-check text-white"></i>Participando</p>
        </button>
      </div>
    </div>
    <!-- Comparar el id logeado con el projectFounder -->
    <div class="container mt-3 mb-5 border-bottom border-2">
      <div v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
        class="row d-flex justify-content-center align-items-center p-0"
      >
        <!-- Actualizaciones -->
        <div class="col-md flex-column justify-content-center align-items-start mb-3 mt-0">
          <span class="fw-bold ms-2">Actualizaciones</span>
          <!-- BUTTON MODAL -->
          <button type="button" class="ms-2 btn btn-outline-light btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#ModalUpdates">
            <i class="fa fa-plus"></i>
          </button>
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
                    <button type="button" class="btn btn-outline-success btn-sm ms-2" v-on:click="saveUpdate">
                      Enviar <i class="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="fw-bold ms-2">Actualizaciones del proyecto</p>

      <div class="row d-flex justify-content-center align-items-center p-0 mb-5">
        <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
        <div v-else v-for="update in updates" :key="update"  
          class="card bg-black border border-2 update mb-3 p-2"
        >
          <div class="card-body bg-black py-3 px-0">
            <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
              class="btn btn-outline-danger btn-sm rounded-circle" @click="deleteUpdate(update.update_date)"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="col-sm-11 m-0">
              <p class="m-2">{{ update.description }}</p>
            </div>
            <span class="fw-bold mb-2 orange">{{ formatDate(update.update_date) }}</span>
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

import swal from 'sweetalert';

export default {
  name: 'ProjectPage',
  data() {
    return {
      project: {},
      founder: "",
      num_subscriptions: 0,
      num_participations: 0,
      num_donations: 0,
      subscriptions: [],
      participations: [],
      donations: [],
      updates: [],
      subs_found: false,
      part_found: false,
    }
  },

  created() {
    this.getProject();
    this.getUsers();
  },

  components: { ProjectCard },

  methods: {

    formatDate(date) {
      return moment(date).fromNow();
    },

    //FIND ONE
    async getProject() {
        try {
            const response = await projectApi.getProject(this.$route.params.title);
            this.project = response.data[0];
            this.getFounder();
            this.getSubscriptions(this.project.id);
            this.getUpdates(this.project.id);
            this.getParticipations(this.project.id);
            this.getDonations(this.project.id)
        }
        catch (err) {
            console.log(err);
        }
    },

    async getUsers() {
        try {
          const response = await userApi.getUsers();
          this.users = response.data.reverse();
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

    async getSubscriptions(id) {
      try {
        const response = await projectApi.getSubscriptions(id);
        this.subscriptions = response.data;
        this.num_subscriptions = this.subscriptions.length
        if(this.$store.state.isUserLoggedIn) {
          for (let i = 0; i < this.subscriptions.length; i++) {
            if(this.subscriptions[i].idUser == this.$store.state.user.id) {
              this.subs_found = true
              break;
            }
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    },

    async getParticipations(id) {
      try {
        const response = await projectApi.getParticipations(id);
        this.participations = response.data;
        this.num_participations = this.participations.length
        
        if(this.$store.state.isUserLoggedIn == true) {
          for (let i = 0; i < this.participations.length; i++) {
            if(this.participations[i].idUser == this.$store.state.user.id) {
              console.log(this.participations[i] + " == " + this.$store.state.user.id)
              this.part_found = true
              break;
            }
          }
        }
        console.log(this.part_found)
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
            window.location.reload();
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
                swal("Bien hecho!", "Te has suscrito a este proyecto con exito", "success")
                this.getSubscriptions(this.project.id);
            } else {
                this.$router.push('/start')
            }
        } catch (err) {
            console.log(err);
            swal("Ya estas suscrito a este proyecto")
        }
    },
     async saveParticipation (idProject) {
        try {
            if(this.$store.state.isUserLoggedIn) {
                var participations = []
                participations[0] = {idUser: this.$store.state.user.id, idProject: idProject}

                let response = await userApi.saveParticipation({
                    participations: participations,
                }, {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
                );
                console.log(response.data)
                swal("Bien hecho!", "Ahora participas en este proyecto", "success")
                this.getParticipations(this.project.id);
            } else {
                this.$router.push('/start')
            }
        } catch (err) {
            console.log(err);
            swal("Ya participas a este proyecto")
        }
    },

  }
}
</script>

<style>
</style>