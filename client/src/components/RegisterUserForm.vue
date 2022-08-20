<template>
<div class="row-flex d-flex m-2">
  <div class="col">
    <form autocomplete="off">
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
        <!-- <div v-if="$store.state.isAdminLoggedIn" class="mb-2">
            <textarea class="form-control" rows="3" placeholder="Biografía" v-model="biography"></textarea>
        </div> -->
        <!-- INSERTAR FOTOS -->
        <!-- <div v-if="$store.state.isAdminLoggedIn" class="mb-2">
            <input type="text" class="form-control" placeholder="Foto de usuario" v-model="photo" @input="getImage">
        </div> -->
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

        <div class="mb-2 mt-3 row-flex d-flex justify-content-end">
            <input type="button" class="btn btn-outline-warning btn-md" value="Registrar" @click="saveUser">
        </div>
    </form>
  </div>
  <!-- <div v-if="$store.state.isAdminLoggedIn" class="col-md-6 m-3">
    <div class="imagePreview__user-image" :style="{ 'background-image': `url(${previewImage})` }"></div>
  </div> -->
</div>
</template>

<script>
import Authentication from '@/services/Authentication';

export default {
  name: "RegisterForm",
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

    async saveUser(e) {
      try {
        e.preventDefault();

        // VALID EMAIL
        if(!this.email) {
          this.errors.email = true;
        } else {
          this.errors.email = false;
          if(!this.email.includes('@') || !this.email.includes('.')){
            this.errors.valid_email = true;
          } else { this.errors.valid_email = false; }
        }
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
          const response = await Authentication.register({
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
          this.$store.dispatch('setUser', response.data.user)
          this.$store.dispatch('setToken', response.data.token)
          this.email = "";
          this.name = "";
          this.lastName = "";
          this.pass = "";
          this.nickName = "",
          this.photo = null,
          this.repeat_pass = "";
          console.log(response.data);
          this.$router.push("/");
        } else { window.alert("ERROR: Hay algun campo que no es correcto") } 
      } catch (err) {
        window.alert(err)
        console.log(err);
      }
    },
  },
}
</script>

<style>

</style>