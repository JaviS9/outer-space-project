<template>
<div class="addUser">
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
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Apellidos" v-model="lastName">
          </div>
          <hr>
          <p>Introduce una contraseña.</p>
          <div class="mb-2">
            <input name="password" autocomplete="on" type="password" class="form-control" placeholder="Contraseña" v-model="pass">
          </div>
          <div class="mb-2">
            <input name="repeat_password" autocomplete="on" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
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
import axios from 'axios';

export default {
  name: "AddAdmin",
  data() {
      return {
        email: "",
        name: "",
        lastName: "",
        pass: "",
        repeat_pass: "",
    };
  },

  created() {
    // this.getAlien()
  },

  methods: {

    async saveUser(e) {
      try {
        e.preventDefault();

        let response = await axios.post("http://localhost:5000/admin/add",
        {
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
        this.$router.push("/admins");
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>