<template>
 <div class= "addTech">
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
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description"></textarea>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="URL de imagen" v-model="photo">
          </div>
          <!--  -->
          <div class="mb-2 mt-3">
            <input
              type="submit"
              class="btn btn-outline-success btn-md"
              value="Crear proyecto"
              v-on:click="saveTech"
            >
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <img class="card-img-top tech-image" :src="this.photo" alt="tech photo">
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
    };
  },

  created () {
    this.photo = "../../../../public/img/tech/tech-1.png"
  },

  methods: {

    // --------------------------------------------------------------------
    // CREATE TECH
    async saveTech(e) {
      try {
        e.preventDefault();
        this.photo

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