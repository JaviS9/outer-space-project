<template>
<div class="listTech">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de tecnologías
          <router-link :to="{name: 'AddTech'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nueva tecnología
          </router-link>
        </p>
        <p>Aquí se encuentran todas las tecnologías registradas en el sistema.</p>
        <form>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Busca una tecnología">
                </div>
                <div class="col">
                  <input type="submit" class="btn btn-outline-light" value="Buscar">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="col-md-12 d-flex flex-column align-items-center justify-content-center"
      v-if="techs.length === 0"
    >
      <p class="h5 text-danger">No se han encontrado tecnologías</p>
    </div>
    <div class="row"
      v-for="tech in techs" :key="tech.id"
    >
        <div class="col card border-light bg-black align-self-center mx-2 mb-3">
            <div class="card-body p-0 bg-black">
                <div class="row-flex d-flex justify-content-center align-items-center">
                    <div class="col-sm-2 d-flex justify-content-center">
                        <img class="card-img-top tech-image" :src="getImage(tech.name)" :alt="tech.name">
                    </div>
                    <div class="col-sm-9 d-flex flex-column justify-content-center p-2">
                      <div class="card-body p-0 bg-black">
                        <li class="list-group">
                          <ul class="list-group-item text-white bg-black border mb-2">
                            <p><span class="h4 fw-bold">{{tech.name}}</span></p>
                            <p class="my-3">{{tech.description}}</p>
                          </ul>
                        </li>
                      </div>
                    </div>
                    <div class="col-sm-1 ml-1 d-flex flex-column justify-content-center align-items-center">
                        <router-link :to="{ name: 'EditTech', params: {name: tech.name}}"
                          type="button" class="btn btn-outline-primary my-2">
                          <i class="fa fa-pen"></i>
                        </router-link>
                        <button 
                          @click="deleteTech(tech.id)"
                          class="btn btn-outline-danger my-2">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: "ListTech",
    data() {
    return {
      techs: [],
    };
  },
 
  created() {
    this.getTechs();
  },

  methods: {
    getImage(name) {
      return "../../../../public/img/" + name + ".png";
    },

    // **************************************************
    //LIST ALL
    async getTechs() {
      try {
        const response = await axios.get("http://localhost:5000/tech/list");
        this.techs = response.data.reverse();
        console.log(this.techs)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteTech(id) {
      try {
        const response = await axios.delete(`http://localhost:5000/tech/delete/${id}`);
        console.log(response.data)
        this.getTechs()
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>