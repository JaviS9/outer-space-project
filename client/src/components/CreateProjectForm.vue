<template>
 <div class= "router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-7">
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
            <input type="text" class="form-control" placeholder="Foto de proyecto" v-model="photo" @input="getImage">
          </div>
          <div class="col-8 d-flex align-items-center justify-content-start">
            <p class="m-0">Financiación: </p>
            <input type="number" min="1" step="any" class="form-control ms-2" placeholder="        _ _ , _ _" v-model="financiation">
            <i class="fa fa-euro-sign ms-1"></i>
          </div>
          <div v-if="errors.financiation == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor introduzca una cifra.</p>
          </div>
          <hr>
          <div class="my-2">
            <div class="d-flex flex-row align-items-center justify-content-start mb-3">
                <p class="me-3 my-0">Añade al fundador del proyecto: </p>
                <p v-if="founder === null" class="text-danger">No seleccionado</p>
                <button v-else 
                  type="button" disabled
                  class="btn btn-success btn-md rounded-pill p-2"
                >{{ founder.nickName }}
                </button>
            </div>
          </div>
          <div class="mb-2 mt-3">
            <input
              type="button"
              class="btn btn-outline-success btn-md"
              value="Crear proyecto"
              v-on:click="saveProject"
            >
          </div>
        </form>
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import projectApi from '@/services/projectApi';
import swal from 'sweetalert';

export default {
    name: "CreateProjectForm",
    data() {
    return {
      title: "",
      description: "",
      repository: "",
      photo: "",
      founder: null,
      previewImage: "",
      planets: [
        "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
        "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
        "https://cdn-icons-png.flaticon.com/512/1374/1374275.png"
      ],
      errors: {
          title: false,
          financiation: false
      }
    };
  },

  props: {
    user: {}
  },
 
  created() {
    this.founder = this.$props.user
    this.getPlanet();

  },

  methods: {

    getImage() {
      this.previewImage = this.photo
    },

    getPlanet() {
      this.previewImage = this.planets[Math.floor(Math.random() * 3)]
    },

    // CREATE PROJECT
    async saveProject(e) {
      try {
        e.preventDefault();
        
        if(!this.financiation || this.financiation <= 0 || this.financiation === null) {
          this.errors.financiation = true;
        } else { this.errors.financiation = false; }
        // VALID TITLE
        if(!this.title) {
          this.errors.title = true;
        } else { this.errors.title = false; }

        if(Object.values(this.errors).every(value => value === false)) {
          let response = await projectApi.saveProject({
            title: this.title,
            description: this.description,
            repository: this.repository,
            founder: this.founder,
            photo: this.previewImage,
            financiation: this.financiation
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );

          this.title = "",
          this.description = "",
          this.repository = "",
          this.founder = "",
          this.photo = null,

          console.log(response.data);
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        swal("Cuidado!", "Ya existe un proyecto con ese mismo nombre", "error")
      }
    }
  }
}
</script>