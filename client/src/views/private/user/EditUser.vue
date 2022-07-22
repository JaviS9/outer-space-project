<template>
<div class="editUser">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Edita los datos del usuario</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form>
          <p>Actualizar datos del usuario.</p>
          <div class="mb-2">
            <input type="email" class="form-control" placeholder="e-mail">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre completo">
          </div>
          <div class="mb-2">
            <select class="form-control" name="Rol-selected" id="Rol-selected">
              <option value="">Selecciona un rol</option>
            </select>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Empresa">
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
        <img class="card-img-top user-image" src="../../../../public/img/user-1.png" alt="alien-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "EditUser"
}
</script>

<style>

</style>