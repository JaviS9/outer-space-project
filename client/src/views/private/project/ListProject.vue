<template>
<div class="listProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de proyectos
          <router-link to="/projects/add/:projectId" type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nuevo proyecto
          </router-link>
        </p>
        <p>Registrar nuevos proyectos.</p>
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
    <div class="row">
        <div class="col card border-light bg-black align-self-center mx-2">
            <div class="card-body p-0 bg-black">
                <div class="row align-items-center">
                    <div class="col-sm-3 d-flex justify-content-center">
                        <img class="card-img-top project-image" src="../../../../public/img/project-1.png" alt="alien-1">
                    </div>
                    <div class="col-sm-8 d-flex flex-column justify-content-center">
                      <div class="card-body p-0 border-start border-end bg-black">
                        <li class="list-group">
                          <ul class="list-group-item text-white bg-black"><p><span class="h4 fw-bold"> Title</span></p></ul>
                          <ul class="list-group-item text-white bg-black border-bottom"><p>Description</p></ul>
                          <ul class="list-group-item text-white bg-black"><p>Desde <span class="fw-bold">Start Date</span></p></ul>
                        </li>
                      </div>
                    </div>
                    <div class="col-sm-1 ml-1 d-flex flex-column justify-content-center align-items-center">
                        <router-link to="/projects/view/:projectId" type="button" class="btn btn-outline-warning my-2">
                            <i class="fa fa-eye"></i>
                        </router-link>
                        <router-link to="/projects/edit/:userId" type="button" class="btn btn-outline-primary my-2">
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
export default {
    name: "ListProject"
}
</script>

<style>

</style>