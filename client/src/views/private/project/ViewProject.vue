<template>
<div class="viewProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center mt-5">
        <p class="h2 fw-bold">Title</p>
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
            <div class="col-md-12 flex-column justify-content-center align-items-center">
              <div class="card-body p-0 bg-black border-top">
                <li class="list-group">
                  <ul class="list-group-item text-white bg-black"><p class="font-italic">Description of the project</p></ul>
                  <ul class="list-group-item text-white bg-black"><p><span class="fw-bold"> Fundadores: </span></p></ul>
                  <ul class="list-group-item text-white bg-black border-bottom"><p><span class="fw-bold"> Participantes: </span></p></ul>
                  <ul class="list-group-item text-white bg-black"><p>Desde <span class="fw-bold">Start Date</span></p></ul>
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
          <AddUpdate :openCloseForm="openCloseForm" :showForm="showForm"/>
          <UpdateForm :showForm="showForm" :reloadUpdates="reloadUpdates" :openCloseForm="openCloseForm"/>
          <!-- <ListUpdate :showForm="showForm" :reloadUpdates="reloadUpdates" :openCloseForm="openCloseForm"/> -->
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from "vue";
import AddUpdate from "../../../components/AddUpdate.vue"
import UpdateForm from "../../../components/UpdateForm.vue";
import useFormUpdate from "../../../hooks/useFormUpdate";
// import ListUpdate from "../../../components/ListUpdate.vue";
import { getUpdatesApi } from "../../../api/update";

export default {
  name: 'ViewProject',
  components: {
    AddUpdate,
    UpdateForm,
    // ListUpdate,
},
  setup() {
    let updates = ref(getUpdatesApi().reverse());

    const reloadUpdates = () => {
      updates.value = getUpdatesApi().reverse();
    }

    return {
      ...useFormUpdate(),
      updates,
      reloadUpdates,
    };
  },
};
</script>