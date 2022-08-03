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
      <div class="col-md-4">
        <form>
          <p>Rellena el formulario para registrar un nuevo proyecto.</p>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Titulo" v-model="title">
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description"></textarea>
          </div>
          <div class="mb-2">
            <input type="url" class="form-control" placeholder="URL del repositorio" v-model="repository">
          </div>
          <hr>
          <p>Añade al fundador del proyecto: </p>
          <div class="my-2">
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
          <p>Añade participantes al proyecto: </p>
          <div class="my-2">
            <div class="row">
              <div class="col-md-10 d-flex flex-column justify-content-center">
                <!-- SELECT PART -->
                <select class="mdb-select md-form form-control"
                  searchable="Busca aqui"
                  v-model="selected_participant"
                >
                  <option value="" disabled selected>Elige a los participantes</option>
                  <option v-for="user in users" :key="user.id"
                    :value="user">{{user.nickName}}
                  </option>
                </select>
              </div>
              <div class="col-md-1 ms-4 d-flex justify-content-center">
                <button 
                  type="button"
                  class="btn btn-md btn-outline-success rounded-circle"
                  v-on:click="saveParticipant"
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
      <div class="col-md-4 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <img class="card-img-top user-image" src="../../../../public/img/project-1.png" alt="alien-1">
      </div>
      <div class="col-md-4 border-start">
        <div class="row">
          <div class="col-sm-6 d-flex flex-column justify-content-top align-items-center">
            <p class="fw-bold">Fundador</p>
              <p v-if="Object.keys(founder).length === 0" class="text-danger text-center">No seleccionado</p>
              <button v-else 
                type="button"
                class="btn btn-danger btn-sm rounded-pill p-3"
                v-on:click="deleteFounder"
              >
                {{ founder.nickName }} <i class="fa-solid fa-circle-xmark"></i>
              </button>
          </div>
          <div class="col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <p class="fw-bold">Participantes</p>
              <p v-if="participants.length === 0" class="text-danger text-center">No seleccionado</p>
              <div v-else class="col">
                <div v-for="(part) in participants" :key="part" class="row mb-2">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm rounded-pill p-3"
                    style="width: 100%;"
                    v-on:click="deleteParticipant(part.nickName)"
                  >
                    {{ part.nickName }} <i class="fa-solid fa-circle-xmark"></i>
                  </button>
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
import axios from 'axios';

export default {
    name: "AddProject",
    data() {
    return {
      title: "",
      description: "",
      repository: "",
      founder: {},
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

    saveParticipant() {
      let found = false
      for(let i = 0; i < this.participants.length && found == false; i++){
        if(this.selected_participant.nickName == this.participants[i].nickName){
          found = true
        }
      }
      if (found == false && this.selected_participant != {}) { 
        this.participants.push(this.selected_participant)
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

    deleteParticipant(nickName) {
      let found = -1
      for(let i = 0; i < this.participants.length && found == -1; i++){
        if(nickName == this.participants[i].nickName){
          found = i
        }
      }
      if (found != -1) {
        if(this.participants[found].nickName == this.founder.nickName) {this.founder = {}}
        this.participants.splice(found, 1)
        console.log(this.participants)
      }
    },

    // --------------------------------------------------------------------
    //LIST ALL
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
          participants: this.participants,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        this.title = "",
        this.description = "",
        this.repository = "",
        this.founder = "",
        this.photo = null,
        this.participants = [],
        console.log(response.data);
        this.$router.push("/projects");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>