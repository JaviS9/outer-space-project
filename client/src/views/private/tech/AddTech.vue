<template>
 <div class= "addTech">
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
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description"></textarea>
          </div>
          <!-- <div class="mb-2">
            <input type="text" class="form-control" placeholder="URL de imagen" v-model="photo" v-on:change="getImage">
          </div> -->
          <!--  -->
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
        <img v-if="imagePreview === ''" class="user-image" src="../../../../public/img/tech/tech-1.png" alt="tech_photo">
        <div v-else class="user-image" :style="{ 'background-image': `url(${imagePreview})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddTech",
    data() {
    return {
      name: "",
      description: "",
      photo: "",
      imagePreview: "",
    };
  },

  methods: {

    getImage() {
      this.imagePreview = this.photo
    },

    // --------------------------------------------------------------------
    // CREATE TECH
    async saveTech(e) {
      try {
        e.preventDefault();
        this.photo = this.imagePreview

        let response = await axios.post("http://localhost:5000/tech/add",
        {
          name: this.name,
          description: this.description,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        this.name = "",
        this.description = "",
        console.log(response.data);
        this.$router.push("/techs");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>