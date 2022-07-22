<template>
<div class="editCompany">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Edita los datos de la empresa</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form>
          <p>Actualizar datos de la empresa.</p>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre de la empresa">
          </div>
          <div class="mb-2">
            <select class="form-control" name="Sector-selected" id="Sector-selected">
              <option value="">Selecciona un sector</option>
            </select>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Página web">
          </div>
          <div class="mb-2">
            <input type="hidden" class="form-control">
          </div>
          <hr>
          <p>Cambiar contraseña.</p>
          <div class="mb-2">
            <input type="password" class="form-control" placeholder="Contraseña">
          </div>
          <div class="mb-2">
            <input type="password" class="form-control" placeholder="Repite la contraseña">
          </div>
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-primary btn-md" value="Actualizar">
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img class="card-img-top user-image" src="../../../../public/img/ship-1.png" alt="ship-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "EditCompany"
}
</script>

<style>

</style>