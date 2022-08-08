<template>
<div class="editTech">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Actualizar datos de la tecnología</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form>
          <p>Rellena el formulario para actualizar los datos de la tecnología.</p>
          <div class="row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Nombre:</label>
            </div>
            <div class="col-sm-9">
              <input type="text" class="form-control" :placeholder="tech.name" v-model="tech.name">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3 d-flex flex-column align-items-start justify-content-center">
              <label>Descripción:</label>
            </div>
            <div class="col-sm-9">
              <textarea class="form-control" rows="3" :placeholder="tech.description" v-model="tech.description"></textarea>
            </div>
          </div>
          <hr>
          <!--  -->
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-primary btn-md" value="Actualizar" @click="updateTech">
          </div>
        </form>
      </div>
      <div class="col-md-3 d-flex flex-column justify-content-top align-items-center">
        <!-- FOTO -->
        <img class="card-img-top user-image" src="../../../../public/img/tech/tech-1.png" alt="tech_photo">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { Buffer } from 'buffer';

export default {
  name: "EditTech",
  data() {
    return {
      tech: {},
      previewImage: null
    }
  },

  created() {
    this.getTech();
  },

  methods: {

    selectImage () {
        this.$refs.photo.click()
    },

    updatePhoto(files) {
      if (!files.length) {
        let reader = new FileReader
        this.photo = reader.readAsArrayBuffer(this.previewImage)
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

    getImage() {
      try {
        let img = this.tech.photo
        if(img != null) {
          let buffer = Buffer.from(img.data)
          // let blob = new Blob([img], { type: "image/jpeg" });
          // let url =  URL.createObjectURL(blob)
          let base64 = Buffer.from(buffer).toString('base64')
          let url = "data:image/png;base64," + base64
          // let url = 'data:image/jpeg;base64,' + blob
          this.previewImage = url
        }
      } catch (e) {
        console.log(e)
      }
    },
    // ********************************************************
    // GET USER
    async getTech() {
      try {
        const response = await axios.get(`http://localhost:5000/tech/find/${this.$route.params.tech_name}`);
        this.tech = response.data[0];
      } catch (err) {
        console.log(err);
      }
    },

    async updateTech(e) {
      try {
        e.preventDefault();
        // let img = this.$refs.photo.files[0]
        // console.log(img)
        // let blob = new Blob([img], { type: "image/*" });
        // let buffer = await blob.arrayBuffer()
        // let base64 = Buffer.from(buffer).toString('base64')
        // console.log("buffer -- " + buffer)
        // this.photo = base64
        
        let response = await axios.put(`http://localhost:5000/tech/update/${this.tech.id}`,
        {
          name: this.tech.name,
          description: this.tech.description,
          // photo: null,
        },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data);
        this.$router.push("/techs");
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>