<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Crea un nuevo administrador</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-5">
        <form>
          <p>Rellena el formulario para registrar un nuevo administrador.</p>
          <div class="mb-2">
            <input type="email" class="form-control" placeholder="Email" v-model="email">
          </div>
          <div v-if="errors.email == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe un email.</p>
            </div>
          <div v-if="errors.valid_email == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>El email debe tener la terminación '@osp-company.com'.</p>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Apellidos" v-model="lastName">
          </div>
          <hr>
          <p>Introduce una contraseña.
            <i v-if="errors.length_pass == true"
              class="fa-solid fa-info m-0 border border-2 px-2 py-1 rounded-circle bg-danger"
              data-bs-toggle="tooltip bs-tooltip-right" data-bs-placement="right"
              title="La contraseña debe tener almenos 6 caracteres.">
            </i>
          </p>
          <div class="mb-2">
            <input name="password" autocomplete="on" type="password" class="form-control" placeholder="Contraseña" v-model="pass">
          </div>
          <div v-if="errors.pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe una contraseña.</p>
          </div>
          <div class="mb-2">
            <input name="repeat_password" autocomplete="on" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
          </div>
          <div v-if="errors.rep_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe de nuevo la contraseña.</p>
          </div>
          <div v-if="errors.equal_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Las contraseñas introducidas no son iguales.</p>
          </div>
          <div v-if="errors.register == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Este admniistrador ya existe.</p>
          </div>
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-success btn-md" value="Registrar" @click="saveUser">
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import adminApi from '@/services/adminApi';

export default {
  name: "AddAdmin",
  data() {
      return {
        email: "",
        name: "",
        lastName: "",
        pass: "",
        repeat_pass: "",
        errors: {
          email: false,
          valid_email: false,
          pass: false,
          rep_pass: false,
          equal_pass: false,
          length_pass: false,
          register: false,
        }
    };
  },

  methods: {

    async saveUser(e) {
      try {
        e.preventDefault();
        this.errors.register = false;
        // VALID EMAIL
        if(!this.email) {
          this.errors.email = true;
        } else {
          this.errors.email = false;
          if(!this.email.includes('@osp-company.com')){
            this.errors.valid_email = true;
          } else { this.errors.valid_email = false; }
        }
        
        // VALID PASSWORD
        if(!this.pass) {
          this.errors.pass = true;
        } else {
          this.errors.pass = false;
          if(this.pass.length <= 5) {
            this.errors.length_pass = true;
          } else { this.errors.length_pass = false;}
        }
        if(!this.repeat_pass) {
          this.errors.rep_pass = true;
        } else {
          this.errors.rep_pass = false;
          if(this.pass != this.repeat_pass) {
            this.errors.equal_pass = true;
          } else { this.errors.equal_pass = false; }
        }
        if(Object.values(this.errors).every(value => value === false)) {
          let response = await adminApi.saveAdmin({
            email: this.email,
            name: this.name,
            lastName: this.lastName,
            password: this.pass,
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );
          this.email = "";
          this.name = "";
          this.lastName = "";
          this.pass = "";
          this.repeat_pass = "";
          console.log(response.data);
          this.$router.push("/manager/admins");
        }
      } catch (err) {
        console.log(err);
        this.errors.register = true;
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>