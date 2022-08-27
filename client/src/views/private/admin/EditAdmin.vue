<template>
<div class="router-view">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Edita los datos del administrador</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form>
          <p>Actualizar datos del administrador.</p>
          <div class="row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Email:</label>
            </div>
            <div class="col-sm-9">
              <input type="email" class="form-control" :placeholder="admin.email" v-model="admin.email">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Nombre:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="admin.name" v-model="admin.name">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Apellidos:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="admin.lastName" v-model="admin.lastName">
            </div>
          </div>
          <hr>
          <p>Cambiar contraseña.
            <i v-if="errors.length_pass == true"
              class="fa-solid fa-info m-0 border border-2 px-2 py-1 rounded-circle bg-danger"
              data-bs-toggle="tooltip bs-tooltip-right" data-bs-placement="right"
              title="La contraseña debe tener almenos 6 caracteres.">
            </i>
          </p>
          <div class="mb-2">
              <input autocomplete="off" type="password" class="form-control" placeholder="Nueva contraseña" v-model="pass">
          </div>
          <div class="mb-2">
              <input autocomplete="off" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
          </div>
          <div v-if="errors.rep_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe de nuevo la contraseña.</p>
          </div>
          <div v-if="errors.equal_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Las contraseñas introducidas no son iguales.</p>
          </div>
          <div class="mb-2 mt-3">
            <!-- BUTTON -->
            <input type="submit" class="btn btn-outline-primary btn-md" value="Actualizar" @click="updateAdmin">
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
  name: "EditAdmin",
  data() {
    return {
      admin: {},
      pass: "",
      repeat_pass: "",
      errors: {
        rep_pass: false,
        equal_pass: false,
        length_pass: false,
      },
    }
  },

  created() {
    this.getAdmin();
  },

  methods: {
    // GET USER
    async getAdmin() {
      try {
        const response = await adminApi.getAdminId(this.$route.params.id);
        this.admin = response.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async updateAdmin(e) {
      try {
        e.preventDefault();

        // VALID PASSWORD
        if(this.pass) {
          if(this.pass.length <= 5) {
            this.errors.length_pass = true;
          } else { this.errors.length_pass = false;}
          if(!this.repeat_pass) {
            this.errors.rep_pass = true;
          } else {
            this.errors.rep_pass = false;
            if(this.pass != this.repeat_pass) {
              this.errors.equal_pass = true;
            } else { this.errors.equal_pass = false; }
          }
        }
        
        if(Object.values(this.errors).every(value => value === false)) {
          if (this.pass != '') { this.admin.password = this.pass }
          let response = await adminApi.updateAdmin(this.admin.id, {
            email: this.admin.email,
            name: this.admin.name,
            lastName: this.admin.lastName,
            password: this.admin.pass,
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );
          console.log(response.data);
          this.$router.push("/manager/admins");
        }
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>