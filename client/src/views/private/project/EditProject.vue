<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Actualizar datos del proyecto</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form>
          <p>Rellena el formulario para actualizar los datos del proyecto.</p>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Titulo:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="project.title" v-model="project.title">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Descripción:</label>
            </div>
            <div class="col-sm-9">
              <textarea class="form-control" rows="3" :placeholder="project.description" v-model="project.description"></textarea>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Repositorio:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="project.repository" v-model="project.repository">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Foto:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" placeholder="Foto de proyecto" v-model="project.photo" @input="getImage">
            </div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-start">
            <p class="m-0">Financiación: </p>
            <input type="number" min="1" step="any" class="form-control ms-2" placeholder="               _ _ , _ _" v-model="project.financiation">
            <i class="fa fa-euro-sign ms-1"></i>
          </div>
          <hr>
          <div class="m-0 p-0">
            <div class="row-flex d-flex align-items-center justify-content-start py-3">
                <p class="me-3 p-0 my-0">Añade al fundador del proyecto: </p>
                <p v-if="founder === null" class="text-danger">No seleccionado</p>
                <button v-else 
                  type="button"
                  class="btn btn-danger btn-md rounded-pill p-2"
                  v-on:click="deleteFounder"
                >
                  {{ founder.nickName }}<i class="fa-solid fa-circle-xmark"></i>
                </button>
            </div>
            <div class="row">
              <div class="col-md-10 d-flex flex-column justify-content-center">
                <!-- SELECT FOUNDER -->
                <select class="mdb-select md-form form-control"
                  searchable="Busca aqui"
                  v-model="selected_founder"
                >
                  <option value="" disabled selected>Elige al fundador</option>
                  <option v-for="user in users" :key="user.id"
                    :value="user">{{user.nickName}}
                  </option>
                </select>
              </div>
              <div class="col-md-1 ms-2 d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-md btn-outline-success rounded-circle"
                  v-on:click="saveFounder"
                >
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-primary btn-md" value="Actualizar" @click="updateProject">
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import projectApi from '@/services/projectApi';
import userApi from '@/services/userApi';

import swal from 'sweetalert';

export default {
  name: "EditProject",
  data() {
    return {
      project: {},
      users: [],
      selected_founder: "",
      founder: null,
      previewImage: null,
    }
  },

  created() {
    this.getProject();
    this.getUsers();
  },

  methods: {

    getImage() {
      this.previewImage = this.project.photo
    },

    saveFounder() {
      this.founder = this.selected_founder
    },

    deleteFounder() {
      this.founder = null
    },

    // GET USER
    async getProject() {
      try {
        const response = await projectApi.getProject(this.$route.params.title);
        this.project = response.data[0];
        this.previewImage = this.project.photo
        this.getFounder();
      } catch (err) {
        console.log(err);
      }
    },

    async getFounder() {
      try {
        const response = await userApi.getUserId(this.project.projectFounder);
        this.founder = response.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async getUsers() {
      try {
        const response = await userApi.getUsers();
        this.users = response.data.reverse();
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    },

    async updateProject(e) {
      try {
        e.preventDefault();

        let response = await projectApi.updateProject(this.project.id, {
          title: this.project.title,
          description: this.project.description,
          repository: this.project.repository,
          founder: this.founder,
          photo: this.previewImage,
          financiation: this.project.financiation
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$router.push("/manager/projects");
      } catch (err) {
        console.log(err);
        swal("Cuidado!", "Ya existe un proyecto con ese mismo nombre", "error")
      }
    },
  }
}
</script>