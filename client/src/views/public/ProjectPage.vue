<template>
  <div class="router-view">
    <div class="container my-3 pt-0 pb-5 border-bottom border-2">
      <div class="row mb-4">
          <div class="col">
              <p class="h3 fw-bold text-center mt-3">Proyecto <span class="orange">{{ project.title }}</span></p>
          </div>
      </div>
      <div class="row">
        <div class="col">
          <ProjectCard
            :projectinfo="project"
            :founder="founder"
            :num_subscriptions="num_subscriptions"
            :num_participations="num_participations"
            :num_donations="num_donations"
          /> 
        </div>
      </div>
    </div>
    <!-- Comparar el id logeado con el projectFounder -->
    <div class="container" >

    </div>
  </div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'ProjectPage',
  data() {
    return {
      project: {},
      founder: "",
      num_subscriptions: 0,
      num_participations: 0,
      num_donations: 0,
      subscriptions: [],
      participations: [],
      donations: [],
      updates: [],
    }
  },

  created() {
    this.getProject();
    this.getUsers();
  },

  components: { ProjectCard },

  methods: {
    //FIND ONE
    async getProject() {
        try {
            const response = await projectApi.getProject(this.$route.params.title);
            this.project = response.data[0];
            this.getFounder();
            this.getSubscriptions(this.project.id);
            this.getUpdates(this.project.id);
            this.getParticipations(this.project.id);
            this.getDonations(this.project.id)
        }
        catch (err) {
            console.log(err);
        }
    },

    async getUsers() {
        try {
          const response = await userApi.getUsers();
          this.users = response.data.reverse();
        }
        catch (err) {
          console.log(err);
        }
    },

    async getFounder() {
      try {
        const response = await userApi.getUserId(this.project.projectFounder);
        this.founder = response.data[0];
      }
      catch (err) {
        console.log(err);
      }
    },

    async getUpdates(id) {
      try {
        const response = await projectApi.getUpdates(id);
        this.updates = response.data.reverse();
      }
      catch (err) {
        console.log(err);
      }
    },

    async getSubscriptions(id) {
      try {
        const response = await projectApi.getSubscriptions(id);
        this.subscriptions = response.data;
        this.num_subscriptions = this.subscriptions.length
      }
      catch (err) {
        console.log(err);
      }
    },

    async getParticipations(id) {
      try {
        const response = await projectApi.getParticipations(id);
        this.participations = response.data;
        this.num_participations = this.participations.length
      }
      catch (err) {
        console.log(err);
      }
    },

    async getDonations(id) {
      try {
        const response = await projectApi.getDonations(id);
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
    }
  }
}
</script>

<style>
</style>