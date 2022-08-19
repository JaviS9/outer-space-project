<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row-flex d-flex align-items-center justify-content-start">
            <p class="h3 fw-bold m-0">Suscripción con</p>
            <router-link type="button" 
              :to="{ name: 'ProjectPage', params: project.title }"
              style="text-decoration: none; color: inherit;"
              class="ms-3 d-flex align-items-center justify-content-start p-2 btn btn-md rounded-pill border border-2"
            >
              <span class="h3 fw-bold orange m-0"> {{ project.title }}</span>
              <div class="imagePreview__mini-image border border-2 rounded-circle my-0 ms-2" 
                :style="{ 'background-image': `url(${project.photo})` }">
              </div>
            </router-link> 
        </div>
    </div>
    <div class="container mt-3 border-top">
      <div class="row">
        <div class="col-6">
          
        </div>
      </div>
    </div>
    <div class="container mt-3 border-top">
      <div class="row">
        <div class="col-6">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';

export default {
 name: 'MySubscription',
 data() {
  return {
    user: null,
    project: null,
  }
 },

 created() {
  this.getUser()
  this.getProject()
 },

 methods: {
  async getUser() {
    try {
      const response = await userApi.getUser(this.$route.params.nickName);
      this.user = response.data[0];
    } catch (err) {
      console.log(err);
    }
  },
  
  async getProject() {
      try {
          const response = await projectApi.getProject(this.$route.params.title);
          this.project = response.data[0];
      }
      catch (err) {
          console.log(err);
      }
  },
 }
}
</script>

<style>

</style>