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
      <div class="col-md-4">
        <form>
          <p>Rellena el formulario para actualizar los datos de la tecnología.</p>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Nombre:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="tech.name" v-model="tech.name">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Tipo:</label>
            </div>
            <div class="col-sm-10">
              <select
                class="mdb-select md-form form-control"
                searchable="Busca aqui"
                :aria-placeholder="tech.type"
                v-model="tech.type"
                v-on:change="getImage();"
              >
                <option value="" disabled selected>Elige el tipo de tecnología</option>
                <option
                  v-for="tech in techs" :key="tech"
                  :value="tech">{{tech}}
                </option>
              </select>
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
        <div class="imagePreview__tech-logo" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "EditTech",
  data() {
    return {
      tech: {},
      previewImage: "",
      techs: [
        'lenguaje',
        'framework',
        'librería',
        'API'
      ],
      photos: [
        "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
        "https://cdn-icons-png.flaticon.com/512/745/745437.png",
        "https://pngfreepic.com/wp-content/uploads/2021/04/book-icon-png-freepic-15.png",
        "https://cdn-icons-png.flaticon.com/512/603/603197.png"
      ]
    }
  },

  created() {
    this.getTech();
  },

  methods: {

    getImage() {
      switch(this.tech.type) {
        case 'lenguaje':
          this.previewImage = this.photos[0]
          break;
        case 'framework':
          this.previewImage = this.photos[1]
          break;
        case 'librería':
          this.previewImage = this.photos[2]
          break;
        case 'API':
          this.previewImage = this.photos[3]
          break;
      }
      console.log(this.previewImage)
    },

    // ********************************************************
    // GET USER
    async getTech() {
      try {
        const response = await axios.get(`http://localhost:5000/tech/find/${this.$route.params.tech_name}`);
        this.tech = response.data[0];
        this.previewImage = this.tech.photo;
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
        this.tech.photo = this.previewImage
        let response = await axios.put(`http://localhost:5000/tech/update/${this.tech.id}`,
        {
          name: this.tech.name,
          type: this.tech.type,
          photo: this.tech.photo,
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