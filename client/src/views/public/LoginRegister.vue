<template>
<div class="router-view">
    <div class="container" style="padding: 100px 0 0 0">
        <div class="row-flex d-flex align-items-center justify-content-center">
            <div class="col-md-6 flex-column d-flex justify-content-center p-3 m-0">
                <div class="card border align-self-end bg-black p-3 m-0"
                    style="width: 300px"
                >
                    <h5 class="text-center text-success">Inicia sesión</h5>
                    <form autocomplete="off">
                        <input autocomplete="username" type="text" class="form-control mt-2" v-model="id" placeholder="Introduce tu email o nickname">
                        <input autocomplete="current-password" type="password" class="form-control my-2" v-model="password" placeholder="Introduce la contraseña">
                        <div class="row mb-2 p-2">
                            <div class="col-md flex-column d-flex align-items-end justify-content-center p-0">
                                <input type="submit" class="btn btn-md btn-outline-success" value="Iniciar sesión" v-on:click="login">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-6 flex-column d-flex justify-content-center border-start p-3 m-0">
                <div class="card border align-self-start bg-black p-3 m-0"
                    style="width: 300px"
                >
                    <h5 class="text-center text-warning">Registrate</h5>
                    <RegisterForm />
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import Authentication from '@/services/Authentication';

export default {
    name: 'LoginRegister',
    data() {
        return {
            id: "",
            password: "",
            error: null
        }
    },

    components: {
        RegisterForm
    },

    methods: {
        async login() {
            try {
                console.log(this.id, this.password)
                const response = await Authentication.login({
                    id: this.id,
                    password: this.password,
                });
                console.log(response.data)
                this.$store.dispatch('setToken', response.data.token)
                if(response.data.admin) {
                    this.$store.dispatch('setAdmin', response.data.user)
                } else if (!response.data.admin) {
                    this.$store.dispatch('setUser', response.data.user)
                }
            } catch (error) {
                this.error = error.response.data.error
                console.log(this.error)
            }
        }
    }
}
</script>

<style>

</style>