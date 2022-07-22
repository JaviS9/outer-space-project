<template>
  
    <p class="h2 fw-bold my-3 ml-2">Actualizaciones
      <button
          class="btn mx-2"
          :class="{ 'btn-outline-success ': !showForm, 'btn-outline-danger': showForm}"
          @click="openCloseForm"
      >
          <i class="fa"
          :class="{ 'fa-plus-circle': !showForm, 'fa-circle-xmark': showForm,}"
          ></i>
          {{!showForm ? "Nueva actualización" : "Cerrar formulario"}}
      </button>
    </p>
</template> 

<script>
export default {
    props: {
        showForm: Boolean,
        openCloseForm: Function,
    },
};
</script>

<style>

</style>