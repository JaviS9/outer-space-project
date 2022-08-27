<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center mt-5">
        <p v-if="project === null" class="h2 fw-bold">No hay datos</p> 
        <p v-else class="h2 fw-bold">Proyecto <span class="orange">{{project.title}}</span></p> 
      </div>
    </div>
  </div>
  <div class="container mt-5 border-bottom border-1">
    <!-- PROJECT INFO -->
    <ProjectCard
      :projectinfo="project"
      :founder="founder"
      :num_subscriptions="num_subscriptions"
      :num_donations="num_donations"
      :num_subs="null"
      :key="componentproject"
    /> 
    <div class="row mb-3">
      <div class="col">
        <router-link to="/manager/projects" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container my-3">
    <div class="row d-flex justify-content-center align-items-top p-0">
      <div class="col-md-7 flex-column justify-content-center align-items-center p-2 mt-2">
        <!-- Actualizaciones -->
        <div class="col-md flex-column justify-content-center align-items-start mb-4 mt-0">
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
                    <button type="button" class="btn btn-outline-success btn-sm ms-2" data-bs-dismiss="modal" v-on:click="saveUpdate">
                      Enviar <i class="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center p-0 mb-2 mx-2">
          <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
          <div v-else v-for="update in updates" :key="update"  class="card bg-black border border-2 update mb-2">
            <div class="card-body bg-black py-4 px-0">
              <button class="btn btn-outline-danger btn-sm rounded-circle" @click="deleteUpdate(update.update_date)">
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
      <!-- Suscripciones -->
      <div class="col-md-5 flex-column justify-content-center align-items-center p-0">
        <div class="card bg-black border border-3 border-warning rounded p-1">
          <div class="row-flex d-flex p-3">
            <span class="fw-bold ms-2 mb-0 text-warning">Suscripciones</span>
            <ModalForm 
              :id="'ModalSubscription'"
              :title="'suscripciones'" 
              :type="'user'" 
              :list="users" 
              @selected_items="saveSubscription"
            />
          </div>
          <div class="card-body p-0 bg-black">
            <div class="row-flex d-flex p-3 mb-2 mt-0 mx-2">
              <div class="col p-0 m-0">
                <UserList 
                  :key="componentsubscriptions" 
                  :project="project" 
                  @num_subscriptions="getNumSubscriptions"
                />
              </div>
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
import swal from 'sweetalert';
import { ref } from 'vue';

import projectApi from "@/services/projectApi";
import userApi from "@/services/userApi";

import ModalForm from "@/components/ModalForm.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import UserList from "@/components/UserList.vue";

export default {
    name: "ViewProject",
    data() {
        return {
            founder: null,
            project: null,
            selected_user: null,
            selected_users: [],
            users: [],
            description: "",
            num_subscriptions: 0,
            num_donations: 0,
            subscriptions: [],
            donations: [],
            updates: [],
        };
    },
    created() {
        this.getProject();
        this.getUsers();
    },

    setup() {
      const componentsubscriptions = ref(0);
      const componentproject = ref(0)

      const rerendersubscriptions = () => {
        componentsubscriptions.value += 1;
      };

      const rerenderproject = () => {
        componentproject.value += 1;
      };

      return {
        componentsubscriptions,
        componentproject,

        rerendersubscriptions,
        rerenderproject
      }
    },

    components: { ModalForm, ProjectCard, UserList },

    methods: {
        //FIND ONE
        async getProject() {
            try {
                const response = await projectApi.getProject(this.$route.params.title);
                this.project = response.data[0];
                this.previewImage = this.project.photo;
                this.getFounder();
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
            }
            catch (err) {
                console.log(err);
            }
        },

        getNumSubscriptions(num_subscriptions) {
          this.num_subscriptions = num_subscriptions
          this.rerenderproject()
        },

        async getUpdates(id) {
            try {
                const response = await projectApi.getUpdates(id);
                this.updates = response.data.reverse();
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

        async getFounder() {
            try {
                const response = await userApi.getUserId(this.project.projectFounder);
                this.founder = response.data[0];
            }
            catch (err) {
                console.log(err);
            }
        },

        async saveSubscription(selected_items) {
            try {
                this.selected_users = selected_items;
                for (let i = 0; i < this.selected_users.length; i++) {
                    this.subscriptions[i] = { idUser: this.selected_users[i].id, idProject: this.project.id };
                }
                const response = await userApi.saveSubscription({
                    subscriptions: this.subscriptions,
                }, {
                    headers: { "Content-Type": "application/json; charset=UTF-8" }
                });
                console.log(response.data);
                this.selected_users = []
                document.getElementById('close').click();                
                this.rerendersubscriptions()
            }
            catch (err) {
                console.log(err);
                swal("Cuidado!", "Alguno de estos usuarios ya esta suscrito al proyectos", "error")
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
        
        // HELPERS
        formatDate(date) {
            return moment(date).fromNow();
        },
    },
};
</script>