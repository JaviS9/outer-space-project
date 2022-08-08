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
            <input type="email" class="form-control" placeholder="Email" v-model="email">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Apellidos" v-model="lastName">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nickname" v-model="nickName">
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Biografía" v-model="biography"></textarea>
          </div>
          <!-- INSERTAR FOTOS -->
          <!-- <div class="mb-2">
              <input ref="photo" class="form-control" type="file" accept="image/*"
              @change="updatePhoto($event.target.files)"
              @input="pickFile">
          </div> -->
          <!-- <div class="mb-2">
            <input type="text" class="form-control" placeholder="Empresa">
          </div> -->
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
      <div class="col-md-4 ml-5">
        <!-- <div class="imagePreview" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div> -->
        <img class="user-image" src="../../../../public/img/user/user-1.png">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { Buffer } from 'buffer';

export default {
  name: "AddUser",
  data() {
      return {
        email: "",
        name: "",
        lastName: "",
        nickName: "",
        biography: "",
        photo: null,
        pass: "",
        repeat_pass: "",
        previewImage: "",
        aliens: [
          "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
          "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
          "https://cdn-icons-png.flaticon.com/512/6695/6695137.png" 
        ]
    };
  },

  created() {
    // this.getAlien()
  },

  methods: {
    selectImage () {
        this.$refs.photo.click()
    },

    updatePhoto(files) {
      if (!files.length) {
        // Store the file data
        let buffer = Buffer.from(this.$refs.photo.data)
        let base64 = Buffer.from(buffer).toString('base64')
        this.photo = base64
      }
    },

    getAlien() {
      // return "https://cdn-icons-png.flaticon.com/512/6695/6695211.png"
      let alien = this.aliens[Math.floor(Math.random() * 3)]
      this.getImage(alien)
      return alien
    },

    async getImage(image) {
      try {
        let response = await axios.get(image, {
          responseType: "arraybuffer"
        })
        // let response = await axios.get(this.previewImage)
        let base64 = Buffer.from(response.data).toString('base64')
        this.photo = base64
      } catch (err) {
        console.log(err);
      }
    },

    pickFile () {
      try {
        let input = this.$refs.photo
        let file = input.files
        let reader = new FileReader
        if (file && file[0]) {
          this.photo = file[0]
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      } catch (e) {
        console.log(e)
      }
    },

    async saveUser(e) {
      try {
        e.preventDefault();
        // let img = this.$refs.photo.files[0]
        // console.log(img)
        // let blob = new Blob([img], { type: "image/*" });
        // let buffer = await blob.arrayBuffer()
        // let base64 = Buffer.from(buffer).toString('base64')
        // console.log("buffer -- " + buffer)
        // let base64 = Buffer.from(blob).toString('base64')
        // this.photo = base64

        let response = await axios.post("http://localhost:5000/user/add",
        {
          email: this.email,
          photo: this.photo,
          name: this.name,
          lastName: this.lastName,
          nickName: this.nickName,
          biography: this.biography,
          password: this.pass,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        this.email = "";
        this.name = "";
        this.lastName = "";
        this.pass = "";
        this.nickName = "",
        this.photo = null,
        this.repeat_pass = "";
        console.log(response.data);
        this.$router.push("/users");
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>