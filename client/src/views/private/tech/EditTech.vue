<template>
<div class="editProject">
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
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Titulo:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="project.title" v-model="project.title">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Descripción:</label>
            </div>
            <div class="col-sm-9">
              <textarea class="form-control" rows="3" :placeholder="project.description" v-model="project.description"></textarea>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Repositorio:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="project.repository" v-model="project.repository">
            </div>
          </div>
          <hr>
          <div class="my-2">
            <div class="d-flex flex-row mb-3">
                <p class="me-3">Añade al fundador del proyecto: </p>
                <p v-if="founder === null" class="text-danger">No seleccionado</p>
                <button v-else 
                  type="button"
                  class="btn btn-danger btn-md rounded-pill p-2"
                  v-on:click="deleteFounder"
                >
                  {{ founder.nickName }} <i class="fa-solid fa-circle-xmark"></i>
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
              <div class="col-md-1 ms-4 d-flex justify-content-center">
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
        <img class="card-img-top user-image" src="../../../../public/img/project/project-1.png" alt="planet-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { Buffer } from 'buffer';

export default {
  name: "EditProject",
  data() {
    return {
      project: {},
      users: [],
      selected_founder: "",
      founder: null,
      previewImage: null
    }
  },

  created() {
    this.getProject();
    this.getUsers();
  },

  methods: {

    selectImage () {
        this.$refs.photo.click()
    },

    updatePhoto(files) {
      if (!files.length) {
        let reader = new FileReader
        this.photo = reader.readAsArrayBuffer(this.previewImage)
      }
    },

    pickFile () {
      try {
        let input = this.$refs.photo
        let file = input.files
        let reader = new FileReader
        if (file && file[0]) {
          this.photo = file[0]
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      } catch (e) {
        console.log(e)
      }
    },

    getImage() {
      try {
        let img = this.project.photo
        if(img != null) {
          let buffer = Buffer.from(img.data)
          // let blob = new Blob([img], { type: "image/jpeg" });
          // let url =  URL.createObjectURL(blob)
          let base64 = Buffer.from(buffer).toString('base64')
          let url = "data:image/png;base64," + base64
          // let url = 'data:image/jpeg;base64,' + blob
          this.previewImage = url
        }
      } catch (e) {
        console.log(e)
      }
    },
    // ********************************************************
    // GET USER
    async getProject() {
      try {
        const response = await axios.get(`http://localhost:5000/project/find/${this.$route.params.title}`);
        this.project = response.data[0];
        this.getFounder();
      } catch (err) {
        console.log(err);
      }
    },

    async getFounder() {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/id/${this.project.projectFounder}`);
        this.founder = response.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/user/list");
        this.users = response.data.reverse();
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    },

    saveFounder() {
      this.founder = this.selected_founder
    },

    deleteFounder() {
      this.founder = null
    },

    async updateProject(e) {
      try {
        e.preventDefault();
        // let img = this.$refs.photo.files[0]
        // console.log(img)
        // let blob = new Blob([img], { type: "image/*" });
        // let buffer = await blob.arrayBuffer()
        // let base64 = Buffer.from(buffer).toString('base64')
        // console.log("buffer -- " + buffer)
        // this.photo = base64
        
        let response = await axios.put(`http://localhost:5000/project/update/${this.project.id}`,
        {
          title: this.project.title,
          description: this.project.description,
          repository: this.project.repository,
          founder: this.founder,
          photo: null,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$router.push("/projects");
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>