<template>
 <div class= "addProject">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Crea un nuevo proyecto</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form>
          <p>Rellena el formulario para registrar un nuevo proyecto.</p>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Titulo">
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Descripción..."></textarea>
          </div>
          <hr>
          <p>Añade los fundadores del proyecto: </p>
          <div class="my-2">
            <input type="text" class="form-control" placeholder="Busca entre los usuarios">
          </div>
          <p>Añade participantes al proyecto: </p>
          <div class="my-2">
            <input type="text" class="form-control" placeholder="Busca entre los usuarios">
          </div>
          <!--  -->
          <div class="mb-2">
            <input type="hidden" class="form-control">
          </div>
          <!--  -->
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-success btn-md" value="Crear proyecto">
          </div>
        </form>
      </div>
      <div class="col-md-4 ml-5">
        <img class="card-img-top user-image" src="../../../../public/img/project-1.png" alt="alien-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "AddProject"
}
</script>