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
            :subs_found="subs_found"
          /> 
        </div>
      </div>
      <div 
        class="row-flex d-flex align-items-center justify-content-center mt-4"
      >
        <button type="button" 
            class="btn btn-md btn-success rounded-pill border border-2 ms-2 col-md-4"
            v-on:click="saveSubscription(project.id)"
            :disabled="$store.state.isUserLoggedIn && subs_found != null"
        >
            <p v-if="!subs_found" class="m-0"><i class="fa fa-plus text-white"></i>Suscribirse</p>
            <p v-else class="m-0"><i class="fa fa-check text-white"></i>Suscrito</p>
        </button>
        <button type="button" 
            class="btn btn-md btn-primary rounded-pill ms-2 border border-2 col-md-4"
            v-on:click="saveParticipation(project.id)"
            :disabled="$store.state.isUserLoggedIn && part_found != null"
        >
            <p v-if="!part_found" class="m-0"><i class="fa fa-plus text-white"></i>Participar</p>
            <p v-else class="m-0"><i class="fa fa-check text-white"></i>Participando</p>
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
                <UpdateProjectForm :founder="founder" :projectinfo="project" @updatedProject="getData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Comparar el id logeado con el projectFounder -->
    <div class="container mt-3 mb-5 border-bottom border-2">
      <div class="row d-flex justify-content-center align-items-center p-0">
        <!-- Actualizaciones -->
        <div v-if="$store.state.isUserLoggedIn && $store.state.user.id == founder.id"
          class="col-md flex-column justify-content-center align-items-start mb-3 mt-0"
        >
          <span class="fw-bold ms-2">Actualizaciones</span>
          <!-- BUTTON MODAL -->
          <button type="button" class="ms-2 btn btn-md btn-outline-success btn-sm rounded-pill border-2" data-bs-toggle="modal" data-bs-target="#ModalUpdates">
            <i class="fa fa-plus"></i> Añadir actualización
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
                    <button type="button" class="btn btn-outline-success btn-sm ms-2" data-bs-dismiss="modal" v-on:click="saveUpdate">
                      Enviar <i class="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <span v-else class="fw-bold ms-2">Actualizaciones del proyecto</span>
      </div>
      <div class="row d-flex justify-content-center align-items-top p-0 mt-3 mb-5">
        <div class="col-md-8">
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
        <div class="col-md-4 flex-column d-flex justify-content-center">
          <div class="row border border-2 rounded px-0 pt-2 mb-2 border-warning">
            <p class="text-warning fw-bold">Suscripciones</p>
            <div class="col flex-column d-flex p-2 justify-content-center">
              <li class="list-group">
                <ul v-if="subscriptions.length === 0" class="text-white border border-2 rounded bg-black mb-2 p-3">
                  <p class="text-danger text-center m-0 p-0">No hay suscripciones</p>
                </ul>
                <ul v-else v-for="user in subscriptions" :key="user.id"
                  class="text-white border border-2 rounded bg-black mx-0 mb-2 p-3">
                  <div class="row-flex d-flex justify-content-center align-items-center p-0">
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                      <div class="imagePreview__mini-image m-0" :style="{ 'background-image': `url(${user.photo})` }"></div>
                    </div>
                    <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                      <span>{{user.nickName}}</span>
                    </div>
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                      <div class="row-flex d-flex justify-content-center align-items-center">
                        <router-link :to="{ name: 'UserProfile', params: {nickName: user.nickName} }"
                          type="button" class="btn btn-outline-warning">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <router-link
                            :to="{ name: 'ViewSubscription', params: { subscription: user.numSubs }}"
                            type="button" class="btn btn-outline-green ms-2">
                            <i class="fa-solid fa-coins"></i>
                        </router-link>
                        <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == user.id"
                            @click="deleteSubscription(user.id)"
                            class="btn btn-outline-danger ms-2">
                            <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>
            </div>
          </div>
          <div class="row border-primary border border-2 rounded px-0 pt-2 mb-3">
            <p class="text-primary fw-bold">Participaciones</p>
            <div class="col flex-column d-flex p-2 justify-content-center">
              <li class="list-group">
                <ul v-if="participations.length === 0" class="text-white border border-2 rounded bg-black mb-2 p-3">
                  <p class="text-danger text-center m-0 p-0">No hay participaciones</p>
                </ul>
                <ul v-else v-for="user in participations" :key="user.id"
                  class="text-white border border-2 rounded bg-black mx-0 mb-2 p-3">
                  <div class="row-flex d-flex justify-content-center align-items-center p-0">
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                      <div class="imagePreview__mini-image m-0" :style="{ 'background-image': `url(${user.photo})` }"></div>
                    </div>
                    <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                      <span>{{user.nickName}}</span>
                    </div>
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                      <div class="row-flex d-flex justify-content-center align-items-center">
                        <router-link :to="{ name: 'UserProfile', params: {nickName: user.nickName} }"
                          type="button" class="btn btn-outline-warning">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <button v-if="$store.state.isUserLoggedIn && $store.state.user.id == user.id"
                          @click="deleteParticipation(user.id)"
                          class="btn btn-outline-danger ms-2">
                            <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>
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

import swal from 'sweetalert';
import UpdateProjectForm from "@/components/UpdateProjectForm.vue";

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
      subs_found: null,
      part_found: null,
    }
  },

  created() {
    this.getProject(this.$route.params.title);
    this.getUsers();
  },

  components: { ProjectCard, UpdateProjectForm },

  methods: {

    formatDate(date) {
      return moment(date).fromNow();
    },

    getData(data) {
      this.project = data
      this.$router.push(`/project/${this.project.title}`)
    },

    //FIND ONE
    async getProject(title) {
        try {
            const response = await projectApi.getProject(title);
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
              this.subs_found = this.subscriptions[i]
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
              this.part_found = this.subscriptions[i]
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