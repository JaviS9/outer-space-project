<template>
<div class="router-view">
    <div class="container" style="padding: 200px 0 0 0">
        <div class="row-flex d-flex align-items-center justify-content-center">
            <div class="col-md-6 flex-column d-flex justify-content-center p-3 m-0">
                <div class="card border align-self-end bg-black p-3 m-0"
                    style="width: 400px;"
                >
                    <h5 class="text-center text-warning">Inicia sesión</h5>
                    <form>
                        <div class="row mb-2 p-2">
                            <label class="ms-1 p-0">Email:</label>
                            <input type="text" class="form-control mt-2" v-model="email" placeholder="Introduce tu email">
                        </div>                           
                        <div class="row mb-2 p-2">
                            <label class="ms-1 p-0">Contraseña:</label>
                            <input type="text" class="form-control my-2" v-model="password" placeholder="Introduce la contraseña">
                        </div>
                        <div class="row mb-2 p-2">
                            <div class="col-md flex-column d-flex align-items-end justify-content-center p-0">
                                <input type="submit" class="btn btn-md btn-outline-success" value="Iniciar sesión">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-6 flex-column d-flex border-start justify-content-center p-3 m-0">
                <div class="card border align-self-start bg-black p-3 m-0"
                    style="width: 400px;"
                >
                    <h5 class="text-center text-info">Registrate</h5>
                    <form>
                        <div class="row mb-2 p-2">
                            <label class="ms-1 p-0">Email:</label>
                            <input type="text" class="form-control mt-2" v-model="email" placeholder="Introduce tu email">
                        </div>                           
                        <div class="row mb-2 p-2">
                            <label class="ms-1 p-0">Contraseña:</label>
                            <input type="text" class="form-control my-2" v-model="password" placeholder="Introduce la contraseña">
                            <input type="text" class="form-control" v-model="rep_password" placeholder="Repite la contraseña">
                        </div>
                        <div class="row mb-2 p-2">
                            <div class="col-md flex-column d-flex align-items-end justify-content-center p-0">
                                <input type="submit" class="btn btn-md btn-outline-success" value="Registrate">
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
    name: 'LoginRegister',
    data() {
        return {
            email: "",
            password: "",
            rep_password: ""
        }
    }

}
</script>

<style>

</style>