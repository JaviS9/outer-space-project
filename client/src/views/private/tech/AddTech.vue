<template>
 <div class= "router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Crea una nueva tecnología</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-5">
        <form>
          <p>Rellena el formulario para registrar una nueva tecnología.</p>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div v-if="errors.name == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe el nombre de la tecnología.</p>
            </div>
          <div class="mb-2">
            <select
              class="mdb-select md-form form-control"
              searchable="Busca aqui"
              aria-placeholder="Tipo de tecnología"
              v-model="type"
              v-on:change="getImage();"
            >
              <option value="" disabled selected>Elige el tipo de tecnología</option>
              <option
                v-for="tech in techs" :key="tech"
                :value="tech">{{tech}}
              </option>
            </select>
          </div>
          <div v-if="errors.type == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, selecciona un tipo de tecnología.</p>
          </div>
          <div v-if="errors.register == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Esta tecnología ya existe.</p>
          </div>
          <div class="mb-2 mt-3">
            <input
              type="submit"
              class="btn btn-outline-success btn-md"
              value="Crear tecnología"
              v-on:click="saveTech"
            >
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <div class="imagePreview__tech-logo" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import techApi from '@/services/techApi';

export default {
    name: "AddTech",
    data() {
    return {
      name: "",
      type: "",
      photo: "",
      previewImage: "",
      techs: [
        'lenguaje',
        'framework',
        'librería',
        'API'
      ],
      photos: [
        "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
        "https://cdn-icons-png.flaticon.com/512/745/745437.png",
        "https://pngfreepic.com/wp-content/uploads/2021/04/book-icon-png-freepic-15.png",
        "https://cdn-icons-png.flaticon.com/512/603/603197.png"
      ],
      errors: {
        name: false,
        type: false,
        register: false
      }
    };
  },

  methods: {

    getImage() {
      switch(this.type) {
        case 'lenguaje':
          this.previewImage = this.photos[0]
          break;
        case 'framework':
          this.previewImage = this.photos[1]
          break;
        case 'librería':
          this.previewImage = this.photos[2]
          break;
        case 'API':
          this.previewImage = this.photos[3]
          break;
      }
      console.log(this.previewImage)
    },

    // --------------------------------------------------------------------
    // CREATE TECH
    async saveTech(e) {
      try {
        e.preventDefault();
        this.errors.register = false;
        // VALID NAME
        if(!this.name) {
          this.errors.name = true;
        } else { this.errors.name = false; }
        // VALID TYPE
        if(!this.type) {
          this.errors.type = true;
        } else { this.errors.type = false; }

        if(Object.values(this.errors).every(value => value === false)) {
          let response = await techApi.saveTech({
            name: this.name,
            photo: this.previewImage,
            type: this.type,
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );
          this.name = "";
          this.type = "";
          this.photo = null;
          console.log(response.data);
          this.$router.push("/manager/techs");
        }
      } catch (err) {
        console.log(err);
        this.errors.register = true;
      }
    }
  }
}
</script>