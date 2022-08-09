<template>
<div class="viewUser">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de usuario</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <div v-if="user.photo === null" class="bg-black border border-2 m-2 rounded-circle pt-5" style="width: 250px; height: 250px;">
          <p class="text-center mt-5 text-danger text-photo">Foto no encontrada</p>
        </div>
        <div v-else class="imagePreview__user-image" :style="{ 'background-image': `url(${user.photo})` }"></div>
        <!-- <img class="card-img-top icon-image-big" src="../../../../public/img/user/user-1.png" alt="alien-1"> -->
      </div>
      <div class="col-md-6 mx-3 flex-column justify-content-center">
        <div class="card border-light bg-black py-1">
          <div class="card-body bg-black px-0">
            <li class="list-group" v-if="user === null">
              <ul class="list-group-item bg-black text-white text-center mt-4"><p class="text-danger">No hay datos</p></ul>
            </li>
            <li class="list-group p-0" v-else>
              <ul class="list-group-item m-0 text-white bg-black"><p>Email: <span class="fw-bold"> {{user.email}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Nombre: <span class="fw-bold"> {{user.name}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Apellidos: <span class="fw-bold"> {{user.lastName}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Nickname: <span class="fw-bold"> {{user.nickName}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black"><p>Biografía: <span class="fw-bold"> {{user.biography}}</span></p></ul>
              <ul class="list-group-item m-0 text-white bg-black border-top"><p>Contraseña: <span class="fw-bold"> {{user.password}}</span></p></ul>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/users" type="button" class="btn btn-outline-light">
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
                  <router-link :to="{name: 'AddProject'}"
                    type="button" class="ms-2 btn btn-success text-white border border-2 btn-sm rounded-circle">
                    <i class="fa fa-plus"></i>
                  </router-link>
                </div>
              </div>
            </ul>
            <ul v-if="projectsFunded.length === 0" class="list-group-item text-white border-light border bg-black mb-2">
              <p class="text-danger text-center">No hay proyectos fundados</p>
            </ul>
            <ul v-else v-for="pro in projectsFunded" :key="pro"
              class="list-group-item text-white border-light border bg-black mb-2 p-3">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                  <div class="imagePreview__mini-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span>{{pro.title}}</span>
                </div>
                <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                  <router-link :to="{ name: 'ViewProject', params: {title: pro.title}}"
                    type="button" class="btn btn-outline-warning">
                    <i class="fa fa-eye"></i>
                  </router-link>
                </div>
              </div>
            </ul>
          </li>
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
                  <!-- BUTTON MODAL -->
                  <button type="button" class="ms-2 btn btn-success text-white border border-2 btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#ModalSubscriptions">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <!-- MODAL SUBSCRIPTIONS -->
              <div class="modal fade modal modal-lg" id="ModalSubscriptions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content bg-black border-warning p-3">
                    <div class="row-flex d-flex align-items-start my-2">
                      <p class="modal-title text-warning" id="exampleModalLabel">Suscripciones</p>
                      <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="row-flex d-flex align-items-center my-2">
                      <select 
                        class="mdb-select md-form form-control"
                        searchable="Busca aqui"
                        v-model="selected_project"
                      >
                        <option value="" disabled selected>Elige los proyectos a suscribir</option>
                        <option
                            v-for="pro in projects" :key="pro.id"
                            :value="pro">{{pro.title}}
                        </option>
                      </select>
                      <button 
                        type="button"
                        class="btn btn-sm btn-outline-success rounded-circle ms-2"
                        v-on:click="saveProject(selected_projects)"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                    <div v-if="selected_projects.length === 0" class="row my-2">
                      <p class="text-danger text-center">No seleccionado</p>
                    </div>
                    <div v-else class="row my-2">
                      <div class="col d-flex justify-content-start align-items-center">
                        <button
                          v-for="(subs) in selected_projects" :key="subs.id" 
                          type="button"
                          class="btn btn-danger btn-sm rounded-pill p-2 me-2"
                          v-on:click="deleteProject(subs.title, selected_projects)"
                        >
                        {{ subs.title }} <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                      </div>
                    </div>
                    <!--  -->
                    <div class="row-flex d-flex justify-content-end align-items-center mt-2 p-2">
                      <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" v-on:click="cancel">Cancelar</button>
                      <button type="button" class="btn btn-outline-warning btn-sm ms-2" v-on:click="saveSubscription">Suscribirse</button>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
            <ul v-if="subscriptions.length === 0" class="list-group-item text-white border-light border bg-black mb-2">
              <p class="text-danger text-center">No hay suscripciones</p>
            </ul>
            <ul v-else v-for="pro in subscriptions" :key="pro"
              class="list-group-item text-white border-light border bg-black mb-2 p-3">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                  <div class="imagePreview__mini-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span>{{pro.title}}</span>
                </div>
                <div class="col-sm-2 flex-column d-flex justify-content-center align-items-end">
                  <div class="row-flex d-flex justify-content-center align-items-center">
                    <router-link :to="{ name: 'ViewProject', params: {title: pro.title} }"
                      type="button" class="btn btn-outline-warning">
                      <i class="fa fa-eye"></i>
                    </router-link>
                    <button
                      @click="deleteSubscription(pro.id)"
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
                  <!-- BUTTON MODAL -->
                  <button type="button" class="btn btn-success text-white border border-light border-2 btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#ModalParticipation">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <!-- MODAL PARTICIPATIONS -->
              <div class="modal fade modal modal-lg" id="ModalParticipation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content bg-black border-primary p-3">
                    <div class="row-flex d-flex align-items-start my-2">
                      <p class="modal-title text-primary" id="exampleModalLabel">Participaciones</p>
                      <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="row-flex d-flex align-items-center my-2">
                      <select 
                        class="mdb-select md-form form-control"
                        searchable="Busca aqui"
                        v-model="selected_project"
                      >
                        <option value="" disabled selected>Elige los proyectos a participar</option>
                        <option
                            v-for="pro in projects" :key="pro.id"
                            :value="pro">{{pro.title}}
                        </option>
                      </select>
                      <button 
                        type="button"
                        class="btn btn-sm btn-outline-success rounded-circle ms-2"
                        v-on:click="saveProject(selected_projects)"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                    <div v-if="selected_projects.length === 0" class="row my-2">
                      <p class="text-danger text-center">No seleccionado</p>
                    </div>
                    <div v-else class="row my-2">
                      <div class="col d-flex justify-content-start align-items-center">
                        <button
                          v-for="(subs) in selected_projects" :key="subs.id" 
                          type="button"
                          class="btn btn-danger btn-sm rounded-pill p-2 me-2"
                          v-on:click="deleteProject(subs.title, selected_projects)"
                        >
                        {{ subs.title }} <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                      </div>
                    </div>
                    <!--  -->
                    <div class="row-flex d-flex justify-content-end align-items-center mt-2 p-2">
                      <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" v-on:click="cancel">Cancelar</button>
                      <button type="submit" class="btn btn-outline-primary btn-sm ms-2" v-on:click="saveParticipation">Participar</button>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
            <ul v-if="participations.length === 0" class="list-group-item text-white border-light border bg-black mb-2">
              <p class="text-danger text-center">No hay participaciones</p>
            </ul>
            <ul v-else v-for="pro in participations" :key="pro"
              class="list-group-item text-white border-light border bg-black mb-2 p-3">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-2 flex-column d-flex justify-content-center align-items-start">
                  <div class="imagePreview__mini-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
                </div>
                <div class="col-sm-7 flex-column d-flex justify-content-center align-items-start">
                  <span>{{pro.title}}</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <div class="row-flex d-flex justify-content-center align-items-center">
                    <router-link :to="{ name: 'ViewProject', params: {title: pro.title}}"
                      type="button" class="btn btn-outline-warning">
                      <i class="fa fa-eye"></i>
                    </router-link>
                    <button 
                      @click="deleteParticipation(pro.id)"
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
</template>

<script>
import axios from 'axios';

export default {
  name: "ViewUser",
  data() {
    return {
      user: null,
      selected_project: null,
      imagePreview: null,
      projects: [],
      selected_projects: [],
      subscriptions: [],
      projectsFunded: [],
      participations: []
    };
  },
 
  created() {
    this.getProfile();
    this.getProjects();
  },

  methods: {
    //FIND ONE
    async getProfile() {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/${this.$route.params.nickName}`);
        this.user = response.data[0];
        this.imagePreview = this.user.photo
        this.getSubscriptions(this.user.id);
        this.getFundedProjects(this.user.id);
        this.getParticipations(this.user.id);
      } catch (err) {
        console.log(err);
      }
    },

    async getProjects() {
      try {
        const response = await axios.get("http://localhost:5000/project/list");
        this.projects = response.data.reverse();
      } catch (err) {
        console.log(err);
      }
    },

    async getFundedProjects (id) {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/projects/${id}`);
        this.projectsFunded = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getSubscriptions (id) {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/subscriptions/${id}`);
        this.subscriptions = response.data;
        console.log("SUBSCRIPTIONS: " + response.data)
      } catch (err) {
        console.log(err);
      }
    },

    async getParticipations (id) {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/participations/${id}`);
        this.participations = response.data;
        console.log("PARTICIPATIONS: " + response.data)
      } catch (err) {
        console.log(err);
      }
    },

    async saveSubscription (e) {
      try {
        e.preventDefault();
        for(let i = 0; i < this.selected_projects.length; i++){
          this.subscriptions[i] = {idUser: this.user.id, idProject: this.selected_projects[i].id}
        }
        let response = await axios.post("http://localhost:5000/user/add/subscription",
        {
          subscriptions: this.subscriptions,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data)
        this.selected_projects = [];
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },

    async saveParticipation (e) {
      try {
        e.preventDefault();
        for(let i = 0; i < this.selected_projects.length; i++){
          this.participations[i] = {idUser: this.user.id, idProject: this.selected_projects[i].id}
        }
        let response = await axios.post("http://localhost:5000/user/add/participation",
        {
          participations: this.participations,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data)
        this.selected_projects = [];
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },

    async deleteSubscription(idProject) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${this.user.id}/delete/subscription/${idProject}`);
        console.log(response.data)
        this.getSubscriptions(this.user.id)
      } catch (err) {
        console.log(err);
      }
    },

    async deleteParticipation(idProject) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${this.user.id}/delete/participation/${idProject}`);
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