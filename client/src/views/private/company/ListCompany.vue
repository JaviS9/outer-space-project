<template>
<div class="listCompany">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Listado de empresas
          <router-link to="/companies/add/:companyId" type="button" class="btn btn-outline-success mx-2">
            <i class="fa fa-plus-circle"></i> Nueva empresa
          </router-link>
        </p>
        <p>Registrar nuevas empresas.</p>
        <form>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Busca una empresa">
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
      <div class="col-md-4 p-4 d-flex flex-column align-users-center justify-content-center">
        <div class="card mx-4 border-light bg-black">
          <div class="card-body p-0 text-center">
            <ul class="list-group">
              <li class="list-group-item bg-black">
                <img class="card-img-top user-image my-3" src="../../../../public/img/ship-1.png" alt="alien-1">
              </li>
              <li class="list-group-item bg-black text-white">
                <span class="fw-bold mb-3">Nombre empresa</span>
              </li>
              <li class="list-group-item bg-black border-bottom text-white">
                <p>Sector</p>
              </li>
              <!-- BUTTONS -->
              <li class="list-group-item bg-black">
                <div class="row my-3">
                  <div class="col-sm-4">
                    <router-link to="/companies/view/:companyId" type="button" class="btn btn-outline-warning">
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <router-link to="/companies/edit/:companyId" type="button" class="btn btn-outline-primary">
                      <i class="fa fa-pen"></i>
                    </router-link>
                  </div>
                  <div class="col-sm-4">
                    <button class="btn btn-outline-danger">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "ListCompany"
}
</script>

<style>

</style>