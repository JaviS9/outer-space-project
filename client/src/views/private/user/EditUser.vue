<template>
<div class="editUser">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Edita los datos del usuario</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form>
          <p>Actualizar datos del usuario.</p>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Email:</label>
            </div>
            <div class="col-sm-10">
              <input type="email" class="form-control" :placeholder="user.email" v-model="user.email">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Nombre:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="user.name" v-model="user.name">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Apellidos:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="user.lastName" v-model="user.lastName">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Nickname:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="user.nickName" v-model="user.nickName">
            </div>
          </div>
          <div class=" row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Biografía:</label>
            </div>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3" :placeholder="user.biography" v-model="user.biography"></textarea>
            </div>
          </div>
          <!-- <div class="mb-2">
              <input ref="photo" class="form-control" type="file" accept="image/*"
              @change="updatePhoto($event.target.files)"
              @input="pickFile">
          </div> -->
           <div class=" row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Foto:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="user.photo" v-model="user.photo" @input="getImage">
            </div>
          </div>
          <hr>
          <p>Cambiar contraseña.</p>
          <div class="mb-2">
              <input name="password" autocomplete="on" type="password" class="form-control" placeholder="Nueva contraseña" v-model="user.password">
          </div>
          <div class="mb-2">
              <input name="repeat_password" autocomplete="on" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
          </div>
          <div class="mb-2 mt-3">
            <!-- BUTTON -->
            <input type="submit" class="btn btn-outline-primary btn-md" value="Actualizar" @click="updateUser">
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "EditUser",
  data() {
    return {
      user: {},
      repeat_pass: "",
      previewImage: null,
    }
  },

  created() {
    this.getUser();
  },

  methods: {

    getImage() {
      this.previewImage = this.photo
    },
    
    // ********************************************************
    // GET USER
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:5000/user/find/${this.$route.params.nickName}`);
        this.user = response.data[0];
        this.repeat_pass = this.user.password
        this.previewImage = this.user.photo
        // this.getImage()
      } catch (err) {
        console.log(err);
      }
    },

    async updateUser(e) {
      try {
        e.preventDefault();
        // let img = this.$refs.photo.files[0]
        // console.log(img)
        // let blob = new Blob([img], { type: "image/*" });
        // let buffer = await blob.arrayBuffer()
        // let base64 = Buffer.from(buffer).toString('base64')
        // console.log("buffer -- " + buffer)
        // this.photo = base64
        this.photo = this.previewImage
        let response = await axios.put(`http://localhost:5000/user/update/${this.user.id}`,
        {
          email: this.user.email,
          photo: this.photo,
          name: this.user.name,
          lastName: this.user.lastName,
          nickName: this.user.nickName,
          biography: this.user.biography,
          password: this.pass,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$router.push("/users");
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>