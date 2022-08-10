<template>
<div class="LoginUser">
    <div class="container" style="padding: 200px 0 0 0">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-8 flex-column d-flex align-items-center justify-content-center p-0 m-0">
                <div class="card border bg-black px-4 py-3 m-0">
                    <h5 class="text-center mx-2 mt-3 mb-4 text-warning">Inicia sesión</h5>
                    <form>
                        <div class="row mb-2">
                            <div class="col-md-3 d-flex flex-column align-items-start justify-content-center">
                                <label>Email:</label>
                            </div>                          
                            <div class="col-md-9">
                                <input type="text" class="form-control ms-2" v-model="email" placeholder="Introduce tu email">
                            </div> 
                        </div>                           
                        <div class="row mb-2">
                            <div class="col-md-3 d-flex flex-column align-items-start justify-content-center">
                                <label>Contraseña:</label>
                            </div>                          
                            <div class="col-md-9">
                                <input type="text" class="form-control ms-2" v-model="password" placeholder="Introduce la contraseña">
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md flex-column d-flex align-items-end justify-content-center p-1">
                                <input type="submit" class="btn btn-md btn-outline-success" value="Iniciar sesión">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    name: 'LoginUser',

}
</script>

<style>

</style>