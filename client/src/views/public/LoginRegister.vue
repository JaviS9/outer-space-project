<template>
<div class="router-view m-0">
    <div style="padding: 100px 0 0 0">
        <div class="row-flex d-flex align-items-center justify-content-center m-0">
            <div class="col-md-6 flex-column d-flex justify-content-center p-3 m-0">
                <div class="card border align-self-end bg-black p-3 m-0"
                    style="width: 300px"
                >
                    <h5 class="text-center text-success">Inicia sesión</h5>
                    <form autocomplete="off">
                        <input autocomplete="username" type="text" class="form-control mt-2" v-model="id" placeholder="Introduce tu email o nickname">
                        <input autocomplete="current-password" type="password" class="form-control my-2" v-model="password" placeholder="Introduce la contraseña">
                        <p v-if="error != null" class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>{{ error }}</p>
                        <div class="row-flex d-flex justify-content-end my-3">
                            <input type="button" class="btn btn-md btn-outline-success" value="Iniciar sesión" v-on:click="login">
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
                this.error = null
                const response = await Authentication.login({
                    id: this.id,
                    password: this.password,
                });
                if(response.data.admin == true) {
                    this.$store.dispatch('setAdmin', response.data.user)
                } else if (response.data.admin == false) {
                    this.$store.dispatch('setUser', response.data.user)
                }
                this.$store.dispatch('setToken', response.data.token)
                Authentication.setUserLogged(response.data.token);
                if(this.$store.state.isAdminLoggedIn) {
                    this.$router.push('/manager')
                } else {
                    this.$router.push('/')
                }
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style scoped>

</style>