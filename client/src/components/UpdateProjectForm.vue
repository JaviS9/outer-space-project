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
            <div class="col-sm-4 d-flex flex-column align-items-start justify-content-center">
              <label>Titulo:</label>
            </div>
            <div class="col-sm-8">
              <input type="text" class="form-control" :placeholder="project.title" v-model="title">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-4 d-flex flex-column align-items-start justify-content-center">
              <label>Descripción:</label>
            </div>
            <div class="col-sm-8">
              <textarea class="form-control" rows="3" :placeholder="project.description" v-model="description"></textarea>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-4 d-flex flex-column align-items-start justify-content-center">
              <label>Repositorio:</label>
            </div>
            <div class="col-sm-8">
              <input type="text" class="form-control" :placeholder="project.repository" v-model="repository">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-4 d-flex flex-column align-items-start justify-content-center">
              <label>Foto:</label>
            </div>
            <div class="col-sm-8">
              <input type="text" class="form-control" placeholder="Foto de proyecto" v-model="photo" @input="getImage">
            </div>
          </div>
          <div class="col-sm-12 d-flex align-items-center justify-content-start">
            <p class="m-0">Financiación: </p>
            <input type="number" min="1" step="any" class="form-control ms-3" placeholder="               _ _ , _ _" v-model="financiation">
            <i class="fa fa-euro-sign ms-1"></i>
          </div>
          <hr>
          <div class="m-0 p-0">
            <div class="row-flex d-flex align-items-center justify-content-start py-3">
                <p class="me-3 p-0 my-0">Fundador del proyecto: </p>
                <p v-if="!founder" class="text-danger">No seleccionado</p>
                <button v-else 
                  type="button"
                  class="btn btn-success btn-md rounded-pill p-2"
                  disabled
                >{{ founder.nickName }}
                </button>
            </div>
          </div>
          <!--  -->
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-primary btn-md" data-bs-dismiss="modal" value="Actualizar" @click="updateProject">
          </div>
        </form>
      </div>
      <div class="col-md-2 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${project.photo})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import projectApi from '@/services/projectApi';

import swal from 'sweetalert';

export default {
  name: "EditProject",
  data() {
    return {
      project: null,
      id: "",
      title: "",
      description: "",
      repository: "",
      photo: "",
      financiation: "",
    }
  },

  props: {
    founder: Object,
    projectinfo: Object,
  },

  created() {
    this.project = this.$props.projectinfo
    console.log("FOUNDER: " + this.$props.founder)

    this.id = this.project.id
    this.title = this.project.title
    this.description = this.project.description
    this.repository = this.project.repository
    this.photo = this.project.photo
    this.financiation = this.project.financiation
  },

  methods: {

    // GET USER
    async updateProject(e) {
      try {
        e.preventDefault();

        const updatedData = {
          title: this.title,
          description: this.description,
          repository: this.repository,
          photo: this.photo,
          founder : this.$props.founder,
          financiation: this.financiation
        }

        let response = await projectApi.updateProject(this.id, updatedData,
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$emit('updatedProject', this.title)
      } catch (err) {
        console.log(err);
        swal("Cuidado!", "Ya existe un proyecto con ese mismo nombre", "error")
      }
    },
  }
}
</script>