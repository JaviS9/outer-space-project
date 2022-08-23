<template>
<div class="router-view">
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
            <!-- ERROR -->
            <div v-if="errors.email == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe un email.</p>
            </div>
            <div v-if="errors.valid_email == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe un email valido.</p>
            </div>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Nombre" v-model="name">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Apellidos" v-model="lastName">
          </div>
          <div class="mb-2">
            <div class="input-group">
              <span class="input-group-text">@</span>
              <input type="text" class="form-control" placeholder="Nickname" v-model="nickName">
            </div>
            <!-- ERROR -->
            <div v-if="errors.nickName == true">
              <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe un nombre de usuario.</p>
            </div>
          </div>
          <div class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Biografía" v-model="biography"></textarea>
          </div>
          <!-- INSERTAR FOTOS -->
          <div class="mb-2">
            <!-- <input 
              ref="photo"
              class="form-control"
              type="file" accept="image/*"
              @input="pickFile"
            > -->
            <input type="text" class="form-control" placeholder="Foto de usuario" v-model="photo" @input="getImage">
          </div>
          <!-- TECHS -->
          <div class="my-2">
            <div class="row-flex d-flex align-items-center my-2">
              <select
                class="mdb-select md-form form-control"
                aria-placeholder="Elige las tecnologías del usuario"
                v-model="selected_tech"
              >
              <option value="" disabled selected>Elige las tecnologías del usuario</option>
              <option
                  v-for="item in techs" :key="item.id"
                  :value="item">{{item.name}}
              </option>
              </select>
              <button 
                type="button"
                class="btn btn-sm btn-outline-success rounded-circle ms-2"
                v-on:click="saveTech(selected_techs)"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
            <div v-if="selected_techs.length === 0" class="row my-2">
              <p class="text-danger text-center">No seleccionado</p>
            </div>
            <div v-else class="row my-2">
              <div class="col d-flex justify-content-start align-items-center">
                <button
                  v-for="(item) in selected_techs" :key="item.id"
                  type="button"
                  class="btn btn-danger btn-sm rounded-pill p-2 me-2"
                  v-on:click="deleteTech(item.name, selected_techs)"
                  >
                  {{ item.name }}<i class="fa-solid fa-circle-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <!--  -->
          <hr>
          <p>Introduce una contraseña.
            <i v-if="errors.length_pass == true"
              class="fa-solid fa-info m-0 border border-2 px-2 py-1 rounded-circle bg-danger"
              data-bs-toggle="tooltip bs-tooltip-right" data-bs-placement="right"
              title="La contraseña debe tener almenos 6 caracteres.">
            </i>
          </p>
          <div class="row-flex d-flex align-items-center mb-2">
            <input name="password" autocomplete="on" type="password" class="form-control" placeholder="Contraseña" v-model="pass">
          </div>
          <!-- ERROR -->
          <div v-if="errors.pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe una contraseña.</p>
          </div>
          <div class="mb-2">
            <input name="repeat_password" autocomplete="on" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
          </div>
          <!-- ERROR -->
          <div v-if="errors.rep_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe de nuevo la contraseña.</p>
          </div>
          <div v-if="errors.equal_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Las contraseñas introducidas no son iguales.</p>
          </div>
          <div class="mb-2 mt-3">
            <input type="submit" class="btn btn-outline-success btn-md" value="Registrar" @click="saveUser">
          </div>
        </form>
      </div>
      <div class="col-md-4 ml-5">
        <!-- <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div> -->
        <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import userApi from '@/services/userApi';
import techApi from '@/services/techApi';

import swal from 'sweetalert';

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
        selected_tech: "",
        techs: [],
        selected_techs: [],
        usertechs: [],
        aliens: [
          "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
          "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
          "https://cdn-icons-png.flaticon.com/512/6695/6695137.png" 
        ],
        errors: {
          email: false,
          valid_email: false,
          nickName: false,
          pass: false,
          rep_pass: false,
          equal_pass: false,
          length_pass: false,
        }
    };
  },

  created() {
    this.getAlien()
    this.getTechs()
  },

  methods: {

    getImage() {
      this.previewImage = this.photo
    },

    getAlien() {
      this.previewImage = this.aliens[Math.floor(Math.random() * 3)]
    },

    selectImage () {
        this.$refs.photo.click()
    },

    saveTech(list) {
      let found = false;
      for (let i = 0; i < list.length && found == false; i++) {
        if (this.selected_tech.name == list[i].name) {
            found = true;
        }
      }
      if (found == false && this.selected_tech != {}) {
        list.push(this.selected_tech);
        console.log(list);
      }
      else {
        swal("Cuidado!", "Elemento ya añadido", "error");
      }
    },

    deleteTech (atrib, list) {
      let found = -1;
      for (let i = 0; i < list.length && found == -1; i++) {
        if (atrib == list[i].name) {
            found = i;
        }
      }
      if (found != -1) {
        list.splice(found, 1);
        console.log(list);
      }
    },

    async getTechs() {
      try {
        const techs = await techApi.getTechs()
        this.techs = techs.data
      } catch (err) {
        console.log(err)
      }
    },

    async saveTechs(idUser) {
      try {
          for (let i = 0; i < this.selected_techs.length; i++) {
              this.usertechs[i] = { idUser: idUser, idTech: this.selected_techs[i].id };
          }
          const response = await userApi.saveTechs({
              techs: this.usertechs,
          }, {
              headers: { "Content-Type": "application/json; charset=UTF-8" }
          });
          console.log(response.data);
          this.selected_techs = [];
      }
      catch (err) {
          console.log(err);
          swal("Cuidado!", "Alguna de las tecnologías ya esta registrada en el perfil", "error")
      }
    },

    async saveUser(e) {
      try {
        e.preventDefault();
        this.errors.register = false;

        // VALID EMAIL
        if(!this.email) {
          this.errors.email = true;
        } else {
          this.errors.email = false;
          if(!this.email.includes('@') || !this.email.includes('.')){
            this.errors.valid_email = true;
          } else { this.errors.valid_email = false; }
        }
        //VALID NICK
        if(!this.nickName) {
          this.errors.nickName = true;
        } else { this.errors.nickName = false; }
        
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
          const response = await userApi.saveUser({
            email: this.email,
            photo: this.previewImage,
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
          this.saveTechs(response.data.id)
          console.log(response.data);
          this.$router.push("/manager/users");
        }
      } catch (err) {
        console.log(err);
        swal("Cuidado!", "Ya existe un usuario con esos datos", "error")
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>