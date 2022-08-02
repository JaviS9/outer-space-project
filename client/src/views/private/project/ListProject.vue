<template>
<div class="listProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de proyectos
          <router-link :to="{name: 'AddProject'}"
            type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nuevo proyecto
          </router-link>
        </p>
        <p>Listado de proyectos.</p>
        <form>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Busca un proyecto">
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
      v-if="projects.length === 0"
      >
      <p class="h5 text-danger">No se han encontrado proyectos</p>
    </div>
    <div class="row"
      v-for="project in projects" :key="project.id"
    >
        <div class="col card border-light bg-black align-self-center mx-2">
            <div class="card-body p-0 bg-black">
                <div class="row align-items-center">
                    <div class="col-sm-3 d-flex justify-content-center">
                        <img class="card-img-top project-image" src="../../../../public/img/project-1.png" alt="planet-1">
                    </div>
                    <div class="col-sm-8 d-flex flex-column justify-content-center">
                      <div class="card-body p-0 border-start border-end bg-black">
                        <li class="list-group">
                          <ul class="list-group-item text-white bg-black"><p><span class="h4 fw-bold">{{project.title}}</span></p></ul>
                          <ul class="list-group-item text-white bg-black"><p>{{project.description}}</p></ul>
                          <ul class="list-group-item text-white bg-black border-top"><p>Desde <span class="fw-bold">{{project.startDate}}</span></p></ul>
                        </li>
                      </div>
                    </div>
                    <div class="col-sm-1 ml-1 d-flex flex-column justify-content-center align-items-center">
                        <router-link :to="{ name: 'ViewProject', params: {title: project.title}}"
                          type="button" class="btn btn-outline-warning my-2">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <router-link :to="{ name: 'EditProject', params: {title: project.title}}"
                          type="button" class="btn btn-outline-primary my-2">
                          <i class="fa fa-pen"></i>
                        </router-link>
                        <button class="btn btn-outline-danger my-2">
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
import { Buffer } from 'buffer';

export default {
    name: "ListProject",
    data() {
    return {
      projects: [],
    };
  },
 
  created() {
    this.getProjects();
  },

  methods: {
    getImage(photo) {
      // var base64 = Buffer.from(photo, "binary").toString("base64")
      // let url = "data:image/jpeg;base64," + photo;
      try {
        // var blob = new Blob([photo.data], { type: "image/png" });
        // var imageUrl = URL.createObjectURL(blob);
        // console.log("URL -- " + imageUrl)
        // return imageUrl;
        let buffer = Buffer.from(photo.data)
        let base64 = Buffer.from(buffer, "binary").toString("base64")
        let img = 'data:image/png;base64,'+ base64
        // console.log(img)
        return img
        // let reader = new FileReader
        // reader.readAsDataURL(photo)
        // console.log("URL -- " + photo)
        // return photo
      } catch (e) {
        console.log(e)
      }
    },

    // **************************************************
    //LIST ALL
    async getProjects() {
      try {
        const response = await axios.get("http://localhost:5000/project/list");
        this.projects = response.data;
        console.log(this.projects)
      } catch (err) {
        console.log(err);
      }
    },
 
    //DELETE
    async deleteProject(title) {
      try {
        const response = await axios.delete(`http://localhost:5000/project/delete/${title}`);
        console.log(response.data)
        this.getProjects()
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>