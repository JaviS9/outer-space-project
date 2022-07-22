<template>
<div class="addUser">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Crea un nuevo usuario</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form>
          <p>Rellena el formulario para registrar un nuevo usuario.</p>
          <div class="mb-2">
            <input type="email" class="form-control" placeholder="Email" v-model="user_email">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="user_name">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Apellidos" v-model="user_lastname">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nick name" v-model="user_nickName">
          </div>
          <!-- <div class="mb-2">
            <select class="form-control" name="Rol-selected" id="Rol-selected">
              <option value="">Selecciona un rol</option>
            </select>
          </div> -->
          <!-- INSERTAR FOTOS -->
          <div class="mb-2">
              <input type="hidden" class="form-control" v-model="user_photo">
          </div>
          <!-- <div class="mb-2">
            <input type="text" class="form-control" placeholder="Empresa">
          </div> -->
          <hr>
          <p>Introduce una contraseña.</p>
          <div class="mb-2">
            <input type="password" class="form-control" placeholder="Contraseña" v-model="user_pass">
          </div>
          <div class="mb-2">
            <input type="password" class="form-control" placeholder="Repite la contraseña" v-model="user_repeat_pass">
          </div>
          <div class="mb-2 mt-3">
            <!-- <button class="btn btn-outline-success btn-md" @click="saveUser">Registrar</button> -->
            <input type="submit" class="btn btn-outline-success btn-md" value="Registrar" @click="saveUser">
          </div>
        </form>
      </div>
      <div class="col-md-4 ml-5">
        <img class="card-img-top user-image" src="../../../../public/img/user-1.png" alt="alien-1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddUser",
    data() {
    return {
      email: "",
      name: "",
      lastname: "",
      nickName: "",
      photo: null,
      pass: "",
    };
  },
  methods: {

    async saveUser() {
      try {
        if (this.user_pass == this.user_repeat_pass) {
          console.log("Saving user...")
          let res = await axios.post("http://localhost:5000/user/add",
          {
            email: this.user_email,
            photo: null,
            name: this.user_name,
            lastname: this.user_lastname,
            nickName: this.user_nickName,
            pass: this.user_pass
          });
          this.user_email = "";
          this.user_name = "";
          this.user_lastname = "";
          this.user_pass = "";
          this.user_nickName = "",
          this.user_photo = null,
          this.user_repeat_pass = "";
          console.log(res.data)
          this.$router.push("/users");
        }
      } catch (err) {
        console.log(err);
        console.log(res.data)
      }
    },
  },
}
</script>

<style>

</style>