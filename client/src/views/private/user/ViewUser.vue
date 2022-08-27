<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de usuario</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <!-- USER CARD -->
    <UserCard 
      :key="componentuser"
      :user="user"
      :num_subscriptions="num_subscriptions"
      :num_donations="num_donations"
    />
    <!--  -->
    <div class="row mb-3">
      <div class="col">
        <router-link to="/manager/users" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
  <div class="container mt-4 p-2 mb-3">
    <div class="row-flex d-flex justify-content-center align-items-top">
      <div class="col-md-6 mx-1 d-flex flex-column card bg-black">
        <div class="card-body p-0 bg-black">
          <li class="list-group">
            <ul class="list-group-item text-black text-center border-info bg-info mb-2 p-2">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-1 flex-column d-flex justify-content-center align-items-start">
                  <i class="fa fa-rocket rounded-circle border border-info p-2"></i>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span class="fw-bold ms-2">Proyectos fundados</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <CreateProjectForm :user="user"  @signal="getMyProjects"/>
                </div>
              </div>
            </ul>
          </li>
          <ProjectList 
            :key="componentfundedProjects" 
            :user="user" 
            :listName="'fundedProjects'"
            @signal="getMyProjects"
          />
        </div>
      </div>
      <div class="col-md-6 mx-1 d-flex flex-column card bg-black">
        <div class="card-body p-0 bg-black">
          <li class="list-group">
            <ul class="list-group-item text-black text-center border-warning bg-warning mb-2 p-2">
              <div class="row-flex d-flex justify-content-center align-items-center p-0">
                <div class="col-sm-1 flex-column d-flex justify-content-center align-items-start">
                  <i class="fa-solid fa-star border rounded-circle border-warning p-2"></i>
                </div>
                <div class="col-sm-8 flex-column d-flex justify-content-center align-items-start">
                  <span class="fw-bold ms-2">Suscripciones</span>
                </div>
                <div class="col-sm-3 flex-column d-flex justify-content-center align-items-end">
                  <ModalForm 
                    :id="'ModalSubscription'"
                    :title="'suscripciones'" 
                    :type="'project'" 
                    :list="projects"
                    :key="componentmodal"
                    @selected_items="saveSubscription"
                  />
                </div>
              </div>
            </ul>
          </li>
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
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

import ModalForm from '@/components/ModalForm.vue';
import UserCard from '@/components/UserCard.vue';
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';

import swal from 'sweetalert';
import { ref } from 'vue';

export default {
  name: "ViewUser",
  data() {
    return {
      user: null,
      previewImage: null,
      num_subscriptions: 0,
      num_donations: 0,
      projects: [],
      selected_projects: [],
      techs: [],
      subscriptions: [],
      projectsFunded: [],
    };
  },
 
  created() {
    this.getProfile();
    this.getProjects();
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
      rerenderuser,
    }
  },

  components: {
    ModalForm,
    UserCard,
    CreateProjectForm,
    ProjectList
  },

  methods: {
    //FIND ONE
    async getProfile() {
      try {
        const response = await userApi.getUser(this.$route.params.nickName);
        this.user = response.data[0];
        this.previewImage = this.user.photo
        this.getTechs(this.user.id)
      } catch (err) {
        console.log(err);
      }
    },

    async getTechs(id) {
        try {
            const techs = await userApi.getTechs(id)
            this.techs = techs.data
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

    getMyProjects(data) {
      if (data != 0) {
        this.getProjects()
        this.rerenderfundedProjects()
      }
    },

    getNumSubscriptions(num_subscriptions) {
      this.num_subscriptions = num_subscriptions
      this.getProjects()
      this.rerenderuser()
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
      }
      catch (err) {
        console.log(err);
      }
    },

    async saveSubscription (selected_items) {
      try {
        this.selected_projects = selected_items
        for(let i = 0; i < this.selected_projects.length; i++){
          this.subscriptions[i] = {idUser: this.user.id, idProject: this.selected_projects[i].id}
        }
        let response = await userApi.saveSubscription({
          subscriptions: this.subscriptions,
        }, {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
        );
        console.log(response.data)
        this.selected_projects = []
        document.getElementById('close').click();
        this.rerendersubscriptions()
      } catch (err) {
        console.log(err);
        swal("Cuidado!", "Ya esta suscrito a alguno de estos proyectos", "error")
      }
    },
  }
}
</script>

<style>

</style>