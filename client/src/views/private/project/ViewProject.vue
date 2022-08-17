<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center mt-5">
        <p v-if="project === null" class="h2 fw-bold">No hay datos</p> 
        <p v-else class="h2 fw-bold">{{project.title}}</p> 
      </div>
    </div>
  </div>
  <div class="container mt-5 border-bottom border-1">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <div class="imagePreview__icon-image-big" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
      <div class="col-md-8 align-items-center justify-content-center">
        <div class="row">
          <div class="card bg-black align-self-center"></div>
            <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <div class="card blockquote p-3 border-light border-2 rounded-circle bg-black text-center justify-content-center" style="width: 220px; height: 220px;">
                  <span class="card-title mb-0">Suscripciones</span>
                  <p class="number-score mt-0">{{num_subscriptions}}</p>
                </div>              
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <div class="card blockquote p-3 border-light border-2 rounded-circle bg-black text-center justify-content-center" style="width: 220px; height: 220px;">
                <span class="card-title mb-0">Donaciones</span>
                <p class="number-score mt-0">{{donations}}</p>
              </div>
            </div>
            <div class="col flex-column justify-content-center align-items-center mt-3">
              <div class="card-body p-0 bg-black">
                <li class="list-group" v-if="project === null">
                  <ul class="list-group-item bg-black text-center mt-4"><p class="text-danger">No hay datos</p></ul>
                </li>
                <li class="list-group" v-else>
                  <ul class="list-group-item text-white border bg-black mb-2 pb-0 pt-3">
                    <p class="mb-5">{{project.description}}</p>
                    <p v-if="founder === null"><span class="fw-bold"> Fundador: </span>No hay datos</p>
                    <p v-else><span class="fw-bold"> Fundador: </span>{{founder.nickName}}</p>
                    <p><span class="fw-bold"> Repositorio: </span>{{project.repository}}</p>
                  </ul>
                  <ul class="list-group-item text-white bg-black m-0 pb-0 border"><p>Desde <span class="fw-bold">{{project.startDate.substring(0, 10)}}</span></p></ul>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <router-link to="/manager/projects" type="button" class="btn btn-outline-light">
            <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
          </router-link>
        </div>
      </div>
  </div>
  <div class="container my-3">
    <div class="row d-flex justify-content-center align-items-center p-0">
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
    <div class="row d-flex justify-content-center align-items-center p-0 mb-3">
      <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
      <div v-else v-for="update in updates" :key="update"  class="card bg-black border border-2 update mb-2">
        <div class="card-body bg-black py-3 px-0">
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
    <div class="row d-flex justify-content-center align-items-top p-0 border-top pt-5">
      <!-- Suscripciones -->
      <div class="col-md-6 flex-column justify-content-center align-items-center p-0">
        <div class="card bg-black border border-2 rounded me-1">
          <div class="row-flex d-flex p-3">
            <span class="fw-bold ms-2 text-warning">Suscripciones</span>
            <ModalForm :id="'ModalSubscription'"
              :title="'suscripciones'" :type="'user'" :list="users" 
              @selected_items="saveSubscription"
            />
          </div>
          <div class="row-flex d-flex p-3">
            <div class="card-body p-0 bg-black">
              <li class="list-group">
                <ul v-if="subscriptions.length === 0" class="list-group-item text-white border-light border bg-black mb-2">
                  <p class="text-danger text-center">No hay suscripciones</p>
                </ul>
                <ul v-else v-for="user in subscriptions" :key="user.id"
                  class="list-group-item text-white border-light border bg-black mb-2 p-3">
                  <div class="row-flex d-flex justify-content-center align-items-center p-0">
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                      <div class="imagePreview__mini-image" :style="{ 'background-image': `url(${user.photo})` }"></div>
                    </div>
                    <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                      <span>{{user.nickName}}</span>
                    </div>
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                      <div class="row-flex d-flex justify-content-center align-items-center">
                        <router-link :to="{ name: 'ViewUser', params: {nickName: user.nickName} }"
                          type="button" class="btn btn-outline-warning">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <button
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
        </div>
      </div>
      <div class="col-md-6 flex-column justify-content-center align-items-center p-0">
        <div class="card bg-black border border-2 rounded ms-1">
          <div class="row-flex d-flex p-3">
            <span class="fw-bold ms-2 text-primary">Participaciones</span>
            <ModalForm :id="'ModalParticipation'"
              :title="'participaciones'" :type="'user'" :list="users"
              @selected_items="saveParticipation"
            />
          </div>
          <div class="row-flex d-flex p-3">
            <div class="card-body p-0 bg-black">
              <li class="list-group">
                <ul v-if="participations.length === 0" class="list-group-item text-white border-light border bg-black mb-2">
                  <p class="text-danger text-center">No hay participaciones</p>
                </ul>
                <ul v-else v-for="user in participations" :key="user.id"
                  class="list-group-item text-white border-light border bg-black mb-2 p-3">
                  <div class="row-flex d-flex justify-content-center align-items-center p-0">
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                      <div class="imagePreview__mini-image" :style="{ 'background-image': `url(${user.photo})` }"></div>
                    </div>
                    <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                      <span>{{user.nickName}}</span>
                    </div>
                    <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                      <div class="row-flex d-flex justify-content-center align-items-center">
                        <router-link :to="{ name: 'ViewUser', params: {nickName: user.nickName} }"
                          type="button" class="btn btn-outline-warning">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <button
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
</div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import projectApi from "@/services/projectApi";
import userApi from "@/services/userApi";
import ModalForm from "@/components/ModalForm.vue";

export default {
    name: "ViewProject",
    data() {
        return {
            founder: null,
            project: null,
            selected_user: null,
            previewImage: null,
            selected_users: [],
            users: [],
            subscriptions: [],
            updates: [],
            participations: [],
            description: "",
            num_subscriptions: 0,
            donations: 0
        };
    },
    created() {
        this.getProject();
        this.getUsers();
    },

    components: { ModalForm },

    methods: {
        //FIND ONE
        async getProject() {
            try {
                const response = await projectApi.getProject(this.$route.params.title);
                this.project = response.data[0];
                this.previewImage = this.project.photo;
                this.getFounder();
                this.getSubscriptions(this.project.id);
                this.getUpdates(this.project.id);
                this.getParticipations(this.project.id);
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
        async getUpdates(id) {
            try {
                const response = await projectApi.getUpdates(id);
                this.updates = response.data.reverse();
            }
            catch (err) {
                console.log(err);
            }
        },
        async getSubscriptions(id) {
            try {
                const response = await projectApi.getSubscriptions(id);
                this.subscriptions = response.data;
                this.num_subscriptions = this.subscriptions.length;
                console.log("SUBSCRIPTIONS: " + response.data);
            }
            catch (err) {
                console.log(err);
            }
        },
        async getParticipations(id) {
            try {
                const response = await projectApi.getParticipations(id);
                this.participations = response.data;
                console.log("PARTICIPATIONS: " + response.data);
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
                this.selected_projects = [];
                window.location.reload();
            }
            catch (err) {
                console.log(err);
            }
        },
        
        async saveParticipation(selected_items) {
            try {
                this.selected_users = selected_items;
                for (let i = 0; i < this.selected_users.length; i++) {
                    this.participations[i] = { idUser: this.selected_users[i].id, idProject: this.project.id };
                }
                const response = await userApi.saveParticipation({
                    participations: this.participations,
                }, {
                    headers: { "Content-Type": "application/json; charset=UTF-8" }
                });
                console.log(response.data);
                this.selected_projects = [];
                window.location.reload();
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
        async deleteSubscription(idUser) {
            try {
                const response = await userApi.deleteSubscription(idUser, this.project.id);
                console.log(response.data);
                this.getSubscriptions(this.project.id);
            }
            catch (err) {
                console.log(err);
            }
        },
        async deleteParticipation(idUser) {
            try {
                const response = await userApi.deleteParticipation(idUser, this.project.id);
                console.log(response.data);
                this.getParticipations(this.project.id);
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
        cancel() {
            this.selected_users = [];
        },
        saveUser(list) {
            let found = false;
            for (let i = 0; i < list.length && found == false; i++) {
                if (this.selected_user.nickName == list[i].nickName) {
                    found = true;
                }
            }
            if (found == false && this.selected_user != {}) {
                list.push(this.selected_user);
                console.log(list);
            }
            else {
                console.log("ERROR: elemente ya añadido");
            }
        },
        deleteUser(nickName, list) {
            let found = -1;
            for (let i = 0; i < list.length && found == -1; i++) {
                if (nickName == list[i].nickName) {
                    found = i;
                }
            }
            if (found != -1) {
                list.splice(found, 1);
                console.log(list);
            }
        },
    },
};
</script>