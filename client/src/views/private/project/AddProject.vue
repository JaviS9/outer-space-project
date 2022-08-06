<template>
 <div class= "addProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Crea un nuevo proyecto</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-5">
        <form>
          <p>Rellena el formulario para registrar un nuevo proyecto.</p>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Titulo" v-model="title">
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description"></textarea>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="URL del repositorio" v-model="repository">
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
          <div class="mb-2">
            <input type="hidden" class="form-control">
          </div>
          <!--  -->
          <div class="mb-2 mt-3">
            <input
              type="submit"
              class="btn btn-outline-success btn-md"
              value="Crear proyecto"
              v-on:click="saveProject"
            >
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <img class="card-img-top user-image" src="../../../../public/img/project-1.png" alt="planet-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddProject",
    data() {
    return {
      title: "",
      description: "",
      repository: "",
      founder: null,
      participants: [],
      users: [],
      selected_founder: "",
      selected_participant: ""
    };
  },
 
  created() {
    this.getUsers();
  },

  methods: {
    saveFounder() {
      this.founder = this.selected_founder
      let found = false
      for(let i = 0; i < this.participants.length && found == false; i++){
        if(this.selected_founder.nickName == this.participants[i].nickName){
          found = true
        }
      }
      if (found == false && this.selected_founder != {}) {
        this.participants.push(this.selected_founder)
        console.log(this.participants)
      }
      else { console.log("ERROR: participante ya añadido") }
    },

    deleteFounder() {
      let found = -1
      for(let i = 0; i < this.participants.length && found == -1; i++){
        if(this.founder.nickName == this.participants[i].nickName){
          found = i
        }
      }
      if (found != -1) {
        this.participants.splice(found, 1)
        this.founder = {}
        console.log(this.participants)
      }
    },

    // --------------------------------------------------------------------
    //LIST ALL USERS
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/user/list");
        this.users = response.data.reverse();
        console.log(this.users)
      } catch (err) {
        console.log(err);
      }
    },
    // CREATE PROJECT
    async saveProject(e) {
      try {
        e.preventDefault();
        // let img = this.$refs.photo.files[0]
        // console.log(img)
        // let blob = new Blob([img], { type: "image/*" });
        // let buffer = await blob.arrayBuffer()
        // let base64 = Buffer.from(buffer).toString('base64')
        // console.log("buffer -- " + buffer)
        // let base64 = Buffer.from(blob).toString('base64')
        // this.photo = base64

        let response = await axios.post("http://localhost:5000/project/add",
        {
          title: this.title,
          description: this.description,
          repository: this.repository,
          founder: this.founder,
          photo: null,
          // participants: this.participants,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        this.title = "",
        this.description = "",
        this.repository = "",
        this.founder = "",
        this.photo = null,
        // this.participants = [],
        console.log(response.data);
        this.$router.push("/projects");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>