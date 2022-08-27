<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p v-if="$store.state.isUserLoggedIn && (this.user.id === this.profile.id)"
          class="h3 fw-bold">Mi perfil
        </p>
        <p v-else class="h3 fw-bold">Perfil de {{ user.nickName }}</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom border-3 mt-3">
    <!-- USER INFO -->
    <div class="row m-0 py-3">
      <UserCard 
      :key="componentuser"
      :user="user"
      :num_subscriptions="num_subscriptions"
      :num_donations="num_donations"
    />
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
      <UpdateUserForm :userinfo="user" @updatedUser="getProfile"/>
    </div>
    <!-- MY FUNDED PROJECTS -->
    <div v-if="button_state.fundedProject"
      id="ProjectsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <p class="ms-3 mb-3 d-flex">
        <span class="fw-bold h5 text-info me-2">Mis proyectos</span>
        <CreateProjectForm :user="profile" @signal="getMyProjects"/>
      </p>
      <div class="row-flex d-flex align-items-top justify-content-center">
        <div class="col-8">
          <ProjectList 
            :key="componentfundedProjects" 
            :user="user" 
            :listName="'fundedProjects'"
            @signal="getMyProjects"
          />
        </div>
      </div>
    </div>
    <!-- SUBS -->
    <div v-if="button_state.subscription"
      id="SuscriptionsPanel"
      class="container border rounded border-3 mt-2 p-3 mb-5"
    >
      <div class="row-flex d-flex align-items-center justify-content-start mb-3">
        <p class="h5 ms-3 me-2 fw-bold text-warning">Mis suscripciones</p>
        <ModalForm 
          :id="'ModalSubscription'"
          :title="'suscripciones'" 
          :type="'project'" 
          :list="projects" 
          @selected_items="saveSubscription"
          :key="componentmodal"
        />
      </div>
      <div class="row-flex d-flex align-items-top justify-content-center">
        <div class="col-8">
          <ProjectList
            :key="componentsubscriptions" 
            :user="user" 
            :listName="'subscriptions'"
            @num_subscriptions="getNumSubscriptions"
            @signal="getMyProjects"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- PUBLIC SECTION -->
  <div v-if="(!$store.state.isAdminLoggedIn && !$store.state.isUserLoggedIn) || (this.user.id != this.profile.id)"
    class="container mt-3 mb-5"
  >
    <div class="row-flex d-flex align-items-top justify-content-center p-0 m-0">
      <div class="col-md-6 card bg-black text-white border border-3 p-2 border-info">
        <p class="fw-bold ms-3 mt-2 text-info">Proyectos fundados</p>
        <div class="col px-5">
          <ProjectList :key="componentfundedProjects" :user="user" :listName="'fundedProjects'" />
        </div>
      </div>
      <div class="col-md-6 card bg-black text-white border border-3 border-warning p-2 ms-3">
        <p class="fw-bold ms-3 mt-2 text-warning">Subscripciones</p>
        <div class="col px-5">
          <ProjectList 
            :key="componentsubscriptions"
            :user="user" 
            :listName="'subscriptions'" 
            @num_subscriptions="getNumSubscriptions"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import UpdateUserForm from '@/components/UpdateUserForm.vue';
import ProjectList from '@/components/ProjectList.vue';
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import ModalForm from '@/components/ModalForm.vue';

import projectApi from '@/services/projectApi';
import userApi from '@/services/userApi';
import adminApi from '@/services/adminApi';

import { ref } from 'vue';
import swal from 'sweetalert';

export default {
    name: "MyProfile",
    data() {
        return {
            profile: null,
            user: null,
            projects: [],
            donations: [],
            subscriptions: [],
            num_subscriptions: 0,
            num_donations: 0,
            button_state: {
              editProfile: false,
              fundedProject: false,
              subscription: false,
              participation: false,
            }
        };
    },

    setup() {
      const componentfundedProjects = ref(0);
      const componentsubscriptions = ref(0);
      const componentmodal = ref(0)
      const componentuser = ref(0);

      const rerenderfundedProjects = () => {
        componentfundedProjects.value += 1;
      };

      const rerendersubscriptions = () => {
        componentsubscriptions.value += 1;
      };

      const rerendermodal = () => {
        componentmodal.value += 1;
      };

      const rerenderuser = () => {
        componentuser.value += 1;
      };

      return {
        componentfundedProjects,
        componentsubscriptions,
        componentmodal,
        componentuser,

        rerenderfundedProjects,
        rerendersubscriptions,
        rerendermodal,
        rerenderuser
      }
    },

    created() {
        if (this.$store.state.isUserLoggedIn) {
          this.profile = this.$store.state.user;
          this.getUser(this.$route.params.nickName)
          this.getProjects();
        } else if (this.$store.state.isAdminLoggedIn) {
          this.profile = this.$store.state.admin;
          this.getAdmin(this.$route.params.nickName)
          this.getProjects();
        } else { 
          this.getUser(this.$route.params.nickName) 
        }
    },

    components: { UserCard, UpdateUserForm, ProjectList, CreateProjectForm, ModalForm },

    methods: {

      getProfile(data) {
        this.user = data
        this.rerenderuser()
      },

      getMyProjects(data) {
        if (data != 0) {
          this.getProjects()
          this.rerenderfundedProjects()
        }
      },

      async getUser(nickName) {
        try {
          const user = await userApi.getUser(nickName)
          this.user = user.data[0]
          this.getDonations(this.user.id)
          this.getSubscriptions(this.user.id)
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
          this.rerendermodal()
        } catch (err) {
          console.log(err);
        }
      },

      getNumSubscriptions(num_subscriptions) {
        this.num_subscriptions = num_subscriptions
        this.rerenderuser()
      },

      async getSubscriptions (id) {
        try {
            const response = await userApi.getSubscriptions(id);
            this.num_subscriptions = response.data.length
            this.rerenderuser()
        } catch (err) {
            console.log(err);
        }
      },

      async getDonations(id) {
        try {
          const response = await userApi.getDonations(id);
          this.donations = response.data;

          let sum = 0;
          if(this.donations.length > 0) {
            this.donations.forEach(key => {
                sum += key.donation;
            });
          }
          this.num_donations = sum
          this.rerenderuser()
        }
        catch (err) {
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
          document.getElementById('close').click(); 
          swal("Bien hecho!", "Te has suscrito con exito", "success")
          this.getSubscriptions()
          this.rerendersubscriptions()
        } catch (err) {
          console.log(err);
          swal("Ha habido algún error!", "Ya estas suscrito a alguno de estos proyectos", "error")
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
        }
      },
    }
}
</script>

<style>

</style>