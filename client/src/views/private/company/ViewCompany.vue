<template>
<div class="viewCompany">
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center mt-5">
        <p class="h2 fw-bold">Company name</p>
      </div>
    </div>
  </div>
  <div class="container mt-5 border-bottom border-1">
    <div class="row">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img class="card-img-top icon-image-big" src="../../../../public/img/ship-1.png" alt="alien-1">
      </div>
      <div class="col-md-8 align-items-center justify-content-center">
        <div class="row">
          <div class="card bg-black align-self-center"></div>
            <div class="col px-3 d-flex flex-column justify-content-center align-items-center">
              <div class="card p-5 bg-black border-light border-2 rounded-circle text-center" style="width: 190px;">
                <span class="h5 fw bold">Usuarios</span>
                <p>Users</p>
              </div>
            </div>
            <div class="card-body my-2 bg-black">
              <li class="list-group">
                <ul class="list-group-item text-white bg-black"><p>Description</p></ul>
                <ul class="list-group-item text-white bg-black border-bottom"><p><span class="fw-bold">Sector</span></p></ul>
                <ul class="list-group-item text-white bg-black"><p>Web: <span class="fw-bold">website</span></p></ul>
              </li>
            </div>
          </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/companies" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
        <div class="col">

        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ViewCompany',
  
};
</script>