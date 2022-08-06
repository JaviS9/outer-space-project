<template>
<div class="viewProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center mt-5">
        <p v-if="project === null" class="h2 fw-bold">No hay datos</p> 
        <p v-else class="h2 fw-bold">{{project.title}}</p> 
      </div>
    </div>
  </div>
  <div class="container mt-5 border-bottom border-1">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img class="card-img-top icon-image-big" src="../../../../public/img/project-1.png" alt="alien-1">
      </div>
      <div class="col-md-8 align-items-center justify-content-center">
        <div class="row">
          <div class="card bg-black align-self-center"></div>
            <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <div class="card blockquote p-3 border-light border-2 rounded-circle bg-black text-center justify-content-center" style="width: 220px; height: 220px;">
                  <span class="card-title mb-0">Suscripciones</span>
                  <p class="number-score mt-0">00</p>
                </div>              
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <div class="card blockquote p-3 border-light border-2 rounded-circle bg-black text-center justify-content-center" style="width: 220px; height: 220px;">
                <span class="card-title mb-0">Donaciones</span>
                <p class="number-score mt-0">00</p>
              </div>
            </div>
            <div class="col flex-column justify-content-center align-items-center mt-3">
              <div class="card-body p-0 bg-black">
                <li class="list-group" v-if="project === null">
                  <ul class="list-group-item bg-black text-center mt-4"><p class="text-danger">No hay datos</p></ul>
                </li>
                <li class="list-group" v-else>
                  <ul class="list-group-item text-white border bg-black mb-2 pb-0 pt-3">
                    <p class="mb-5">{{project.description}}</p>
                    <p v-if="founder === null"><span class="fw-bold"> Fundador: </span>No hay datos</p>
                    <p v-else><span class="fw-bold"> Fundador: </span>{{founder.nickName}}</p>
                    <p><span class="fw-bold"> Repositorio: </span>{{project.repository}}</p>
                  </ul>
                  <ul class="list-group-item text-white bg-black m-0 pb-0 border"><p>Desde <span class="fw-bold">{{project.startDate.substring(0, 10)}}</span></p></ul>
                </li>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/projects" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container mb-5">
    <div class="row">
        <div class="col">
          <!-- Actualizaciones,  participantes y suscripciones-->
          
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewProject',
  data() {
    return {
      founder: null,
      project: null,
    };
  },
 
  created() {
    this.getProject();
  },

  methods: {
    //FIND ONE
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

    // ----------------------------------------------
    // HELPERS


  },
};
</script>