<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Mi perfil</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom border-3 mt-3">
    <!-- USER INFO -->
    <div class="row m-0 pt-3">
      <UserCard :user="user"/>
    </div>
    <!-- BUTTONS -->
    <div v-if="$store.state.isUserLoggedIn"
      class="row-flex d-flex align-items-center justify-content-start py-2 px-0 m-0"
    >
      <button type="button"
        class="rounded-top button-section fw-bold"
        :class="{'selected': button_state.editProfile, 'notselected': !button_state.editProfile}"
        v-on:click="openClose('EditProfile')"
      >Editar perfil
      </button>
      <button type="button"
        class="rounded-top ms-2 button-section fw-bold" 
        :class="{'selected': button_state.fundedProject, 'notselected': !button_state.fundedProject}"
        v-on:click="openClose('FundedProjects')"
      >Mis proyectos
      </button>
      <button type="button"
        class="rounded-top ms-2 button-section fw-bold" 
        :class="{'selected': button_state.subscription, 'notselected': !button_state.subscription}"
        v-on:click="openClose('Subscriptions')"
      >Suscripciones
      </button>
      <button type="button"
        class="rounded-top ms-2 button-section fw-bold" 
        :class="{'selected': button_state.participation, 'notselected': !button_state.participation}"
        v-on:click="openClose('Participations')"
      >Participaciones
      </button>
    </div>
  </div>

  <!-- USER SECTIONS -->
  <div v-if="$store.state.isUserLoggedIn">
    <!-- EDIT PROFILE -->
    <div v-if="button_state.editProfile"
      id="EditProfilePanel" 
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5 pb-3 text-center text-primary fw-bold">Actualiza los datos de tu perfil</p>
      <UpdateUserForm :userinfo="user"/>
    </div>
    <!-- MY PROJECTS -->
    <div v-if="button_state.fundedProject"
      id="ProjectsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5">Mis proyectos</p>
    </div>
    <!-- SUBS -->
    <div v-if="button_state.subscription"
      id="SuscriptionsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5">Suscripciones</p>
    </div>
    <!-- PART -->
    <div v-if="button_state.participation"
      id="ParticipationsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5">Participaciones</p>
    </div>
  </div>

  <!-- ADMIN SECTION -->
  <div v-if="$store.state.isAdminLoggedIn"
      id="EditProfilePanel" 
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5 pb-3 text-center text-primary fw-bold">Actualiza los datos de tu perfil de administrador</p>
      <UpdateUserForm :userinfo="user"/>
  </div>
</div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import UpdateUserForm from '@/components/UpdateUserForm.vue';
import userApi from '@/services/userApi';
import adminApi from '@/services/adminApi';

export default {
    name: "MyProfile",
    data() {
        return {
            profile: null,
            user: null,
            button_state: {
              editProfile: false,
              fundedProject: false,
              subscription: false,
              participation: false,
            }
        };
    },
    created() {
        if (this.$store.state.isUserLoggedIn) {
          this.profile = this.$store.state.user;
          this.getUser(this.profile.id)
        } else if (this.$store.state.isAdminLoggedIn) {
          this.profile = this.$store.state.admin;
           this.getAdmin(this.profile.id)
        }            
    },

    components: { UserCard, UpdateUserForm },

    methods: {

      async getUser(id) {
        try {
          const user = await userApi.getUserId(id)
          this.user = user.data[0]
          console.log(this.user)
        } catch (err) {
          console.log(err)
        }
      }, 

      async getAdmin(id) {
        try {
          const admin = await adminApi.getAdminId(id)
          this.user = admin.data[0]
          console.log(this.user)
        } catch (err) {
          console.log(err)
        }
      }, 

      openClose (section) {
        switch(section) {
          case 'EditProfile': 
            if (!this.button_state.editProfile) {
              Object.keys(this.button_state).forEach(key => {this.button_state[key] = false;});
              this.button_state.editProfile = true
            } else {this.button_state.editProfile = false}
            break;
          case 'FundedProjects':
            if (!this.button_state.fundedProject) {
              Object.keys(this.button_state).forEach(key => {this.button_state[key] = false;});
              this.button_state.fundedProject = true
            } else {this.button_state.fundedProject = false}
            break;
          case 'Subscriptions':
            if (!this.button_state.subscription) {
              Object.keys(this.button_state).forEach(key => {this.button_state[key] = false;});
              this.button_state.subscription = true
            } else {this.button_state.subscription = false}
            break;
          case 'Participations':
            if (!this.button_state.participation) {
              Object.keys(this.button_state).forEach(key => {this.button_state[key] = false;});
              this.button_state.participation = true
            } else {this.button_state.participation = false}
            break;
        }
      },
    }
}
</script>

<style>

</style>