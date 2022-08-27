<template>
<div class="router-view">
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
          <div class="row mb-2">
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
           <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-center">
              <label>Foto:</label>
            </div>
            <div class="col-sm-10">
              <input type="text" class="form-control" :placeholder="user.photo" v-model="user.photo" @input="getImage">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-2 d-flex flex-column align-items-start justify-content-top">
              <label class="mt-3">Tecnologías:</label>
            </div>
            <!-- TECHS -->
            <div class="col-sm-10">
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
          </div>
          <hr>
          <p>Cambiar contraseña:
            <i v-if="errors.length_pass == true"
              class="fa-solid fa-info m-0 border border-2 px-2 py-1 rounded-circle bg-danger"
              data-bs-toggle="tooltip bs-tooltip-right" data-bs-placement="right"
              title="La contraseña debe tener almenos 6 caracteres.">
            </i>
          </p>
          <div class="mb-2">
              <input name="password" autocomplete="off" type="password" class="form-control" placeholder="Nueva contraseña" v-model="pass">
          </div>
          <div class="mb-2">
              <input name="repeat_password" autocomplete="off" type="password" class="form-control" placeholder="Repite la contraseña" v-model="repeat_pass">
          </div>
          <div v-if="errors.rep_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Por favor, escribe de nuevo la contraseña.</p>
          </div>
          <div v-if="errors.equal_pass == true">
            <p class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>Las contraseñas introducidas no son iguales.</p>
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
import userApi from '@/services/userApi';
import techApi from '@/services/techApi';

import swal from 'sweetalert';

export default {
  name: "EditUser",
  data() {
    return {
      user:           {},
      pass:       "",
      repeat_pass:    "",
      previewImage:   null,
      errors: {
        rep_pass: false,
        equal_pass: false,
        length_pass: false,
      },
      selected_tech:  "",
      techs:          [],
      selected_techs: [],
      usertechs:      []

    }
  },

  created() {
    this.getUser();
  },

  methods: {

    getImage() {
      this.previewImage = this.user.photo
    },
    
    // GET USER
    async getUser() {
      try {
        const response = await userApi.getUser(this.$route.params.nickName);
        this.user = response.data[0];
        this.getUserTechs(this.user.id)
        this.getTechs()
        this.previewImage = this.user.photo
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(e) {
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
          if (this.pass != '') { this.user.password = this.pass }
          const response = await userApi.updateUser(this.user.id, {
            email: this.user.email,
            photo: this.user.photo,
            name: this.user.name,
            lastName: this.user.lastName,
            nickName: this.user.nickName,
            biography: this.user.biography,
            password: this.user.password,
          })
          console.log(response.data)
          this.saveUserTech(this.user.id)
          this.$router.push("/manager/users");
        }
      } catch (err) {
        console.log(err);
      }
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
        this.deleteUserTech(list[found].id)
        list.splice(found, 1);
        console.log(list);
      }
    },

    async getUserTechs (idUser) {
      try {
        const techs = await userApi.getTechs(idUser)
        this.selected_techs = techs.data
      } catch (err) {
        console.log(err)
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

    async saveUserTech(idUser) {
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
      }
      catch (err) {
          console.log(err);
          swal("Cuidado!", "Alguna tecnología ya ha sido añadida", "error")
      }
    },

     async deleteUserTech(idTech) {
        try {
            const response = await userApi.deleteTech(this.user.id, idTech);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
            swal("Cuidado!", "Ya existe un usuario con esos datos", "error")
        }
    },
  }
}
</script>

<style>

</style>