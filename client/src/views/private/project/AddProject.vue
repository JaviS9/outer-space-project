<template>
 <div class= "router-view">
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
          <div v-if="errors.title == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe un titulo de proyecto.</p>
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description"></textarea>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="URL del repositorio" v-model="repository">
          </div>
          <div class="mb-2">
            <!-- <input 
              ref="photo"
              class="form-control"
              type="file" accept="image/*"
              @input="pickFile"
            > -->
            <input type="text" class="form-control" placeholder="Foto de proyecto" v-model="photo" @input="getImage">
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
            <div v-if="errors.founder == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, selecciona un fundador.</p>
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
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
        <!-- <img class="card-img-top user-image" src="../../../../public/img/project/project-1.png" alt="planet-1"> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import projectApi from '@/services/projectApi';
import userApi from '@/services/userApi';

export default {
    name: "AddProject",
    data() {
    return {
      title: "",
      description: "",
      repository: "",
      photo: "",
      founder: null,
      users: [],
      selected_founder: "",
      previewImage: "",
      planets: [
        "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
        "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
        "https://cdn-icons-png.flaticon.com/512/1374/1374275.png"
      ],
      errors: {
          title: false,
          founder: false,
      }
    };
  },
 
  created() {
    this.getUsers();
    this.getPlanet();

  },

  methods: {

    getImage() {
      this.previewImage = this.photo
    },

    getPlanet() {
      this.previewImage = this.planets[Math.floor(Math.random() * 3)]
    },

    saveFounder() {
      this.founder = this.selected_founder
    },

    deleteFounder() {
      this.founder = null
    },

    //LIST ALL USERS
    async getUsers() {
      try {
        const response = await userApi.getUsers();
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
        
        // VALID TITLE
        if(!this.title) {
          this.errors.title = true;
        } else { this.errors.title = false; }
        // VALID FOUNDER
        if(!this.founder) {
          this.errors.founder = true;
        } else { this.errors.founder = false; }

        if(Object.values(this.errors).every(value => value === false)) {
          let response = await projectApi.saveProject({
            title: this.title,
            description: this.description,
            repository: this.repository,
            founder: this.founder,
            photo: this.previewImage,
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );

          this.title = "",
          this.description = "",
          this.repository = "",
          this.founder = "",
          this.photo = null,

          console.log(response.data);
          this.$router.push("/manager/projects");
        } else { window.alert("ERROR: Hay algun campo que no es correcto") } 
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>