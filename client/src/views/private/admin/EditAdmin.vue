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
          <p>Cambiar contraseña.</p>
          <div class="mb-2">
              <input name="password" autocomplete="on" type="password" class="form-control" placeholder="Nueva contraseña" v-model="admin.password">
          </div>
          <div class="mb-2">
              <input name="repeat_password" autocomplete="on" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
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
      repeat_pass: "",
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
        this.repeat_pass = this.admin.password
      } catch (err) {
        console.log(err);
      }
    },

    async updateAdmin(e) {
      try {
        e.preventDefault();
        
        let response = await adminApi.updateAdmin(this.admin.id, {
          email: this.admin.email,
          name: this.admin.name,
          lastName: this.admin.lastName,
          password: this.pass,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$router.push("/manager/admins");
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>