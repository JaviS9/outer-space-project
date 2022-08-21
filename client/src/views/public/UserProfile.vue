<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Mi perfil</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom border-2 mt-3">
    <!-- USER INFO -->
    <div class="row m-0 pt-3">
      <UserCard :user="user"/>
    </div>
    <!-- BUTTONS -->
    <div v-if="$store.state.isUserLoggedIn && (this.user.id === this.profile.id)"
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
  <div v-if="$store.state.isUserLoggedIn && (this.user.id === this.profile.id)">
    <!-- EDIT PROFILE -->
    <div v-if="button_state.editProfile"
      id="EditProfilePanel" 
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5 ms-3 mb-5 fw-bold">Actualiza los datos de tu perfil</p>
      <UpdateUserForm :userinfo="user"/>
    </div>
    <!-- MY FUNDED PROJECTS -->
    <div v-if="button_state.fundedProject"
      id="ProjectsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="h5 ms-3 fw-bold text-info">Mis proyectos
        <button type="button" 
          class="btn btn-sm btn-success text-white border border-2 rounded-pill"
          data-bs-toggle="modal" data-bs-target="#MyProjectsModal">
          <i class="fa fa-plus"></i>
        </button>
      </p>
      <!-- MODAL -->
      <div class="modal fade modal-lg" 
        id="MyProjectsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-black border border-2 text-white p-3">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="staticBackdropLabel">Crea un nuevo proyecto</h5>
              <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
                <i class="fa fa-xmark"></i>
              </button>
            </div>
            <div class="modal-body">
              <CreateProjectForm :user="profile" />
            </div>
          </div>
        </div>
      </div>
      <div class="row-flex d-flex align-items-center justify-content-center">
        <div class="col-10">
          <ProjectList :user="user.nickName" :listName="'fundedProjects'" />
        </div>
      </div>
    </div>
    <!-- SUBS -->
    <div v-if="button_state.subscription"
      id="SuscriptionsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <div class="row-flex d-flex align-items-center justify-content-start">
        <p class="h5 ms-3 me-2 fw-bold text-warning">Mis suscripciones</p>
        <ModalForm 
          :id="'ModalSubscription'"
          :title="'suscripciones'" :type="'project'" :list="projects" 
          @selected_items="saveSubscription"
        />
      </div>
      <div class="row-flex d-flex align-items-center justify-content-center">
        <div class="col-10">
          <ProjectList :user="user.nickName" :listName="'subscriptions'" />
        </div>
      </div>
    </div>
    <!-- PART -->
    <div v-if="button_state.participation"
      id="ParticipationsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <div class="row-flex d-flex align-items-center justify-content-start">
        <p class="h5 ms-3 me-2 fw-bold text-primary">Mis participaciones</p>
        <ModalForm 
          :id="'ModalParticipation'"
          :title="'participaciones'" :type="'project'" :list="projects"
          @selected_items="saveParticipation"
        />
      </div>
      <div class="row-flex d-flex align-items-center justify-content-center">
        <div class="col-10">
          <ProjectList :user="user.nickName" :listName="'participations'" />
        </div>
      </div>
    </div>
  </div>

  <!-- ADMIN SECTION -->
  <div v-if="$store.state.isAdminLoggedIn && (this.user.id === this.profile.id)"
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
import ProjectList from '@/components/ProjectList.vue';
import CreateProjectForm from '@/components/CreateProjectForm.vue';

import projectApi from '@/services/projectApi';
import userApi from '@/services/userApi';
import adminApi from '@/services/adminApi';
import ModalForm from '@/components/ModalForm.vue';

export default {
    name: "MyProfile",
    data() {
        return {
            profile: null,
            user: null,
            projects: [],
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
          this.getUser(this.$route.params.nickName)
        } else if (this.$store.state.isAdminLoggedIn) {
          this.profile = this.$store.state.admin;
          this.getAdmin(this.$route.params.nickName)
        } else { 
          this.getUser(this.$route.params.nickName) 
        }
        this.getProjects();
    },

    components: { UserCard, UpdateUserForm, ProjectList, CreateProjectForm, ModalForm },

    methods: {

      async getUser(nickName) {
        try {
          console.log(nickName)
          const user = await userApi.getUser(nickName)
          this.user = user.data[0]
          console.log(this.user)
        } catch (err) {
          console.log(err)
        }
      }, 

      async getAdmin(email) {
        try {
          const admin = await adminApi.getAdmin(email)
          this.user = admin.data[0]
          console.log(this.user)
        } catch (err) {
          console.log(err)
        }
      },

      async getProjects() {
        try {
          const projects = await projectApi.getProjects();
          this.projects = projects.data.reverse();
        } catch (err) {
          console.log(err);
        }
      },

      async saveSubscription (selected_items) {
        try {
          var subscriptions = []
          for(let i = 0; i < selected_items.length; i++){
            subscriptions[i] = {idUser: this.profile.id, idProject: selected_items[i].id}
          }
          let response = await userApi.saveSubscription({
            subscriptions: subscriptions,
          }, {
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );
          console.log(response.data)
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      },

      async saveParticipation (selected_items) {
        try {
          var participations = []
          for(let i = 0; i < selected_items.length; i++){
            participations[i] = {idUser: this.profile.id, idProject: selected_items[i].id}
          }

          let response = await userApi.saveParticipation({
            participations: participations,
          }, {
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
          );

          console.log(response.data)
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      },

      async deleteSubscription(idProject) {
        try {
          const response = await userApi.deleteSubscription(this.profile.id, idProject);
          console.log(response.data)
          this.getSubscriptions(this.profile.id)
        } catch (err) {
          console.log(err);
        }
      },

      async deleteParticipation(idProject) {
        try {
          const response = await userApi.deleteParticipation(this.profile.id, idProject);
          console.log(response.data)
          this.getParticipations(this.profile.id);
        } catch (err) {
          console.log(err);
        }
      },

      // HELPERS
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