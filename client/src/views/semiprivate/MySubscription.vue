<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row-flex d-flex align-items-center justify-content-start">
            <p class="h3 fw-bold m-0">Suscripción</p>
            <!--  -->
            <router-link type="button"
              :to="{ name: 'UserProfile', params: user.name }"
              style="text-decoration: none; color: inherit;"
              class="ms-3 d-flex align-items-center justify-content-start p-2 btn btn-md rounded-pill border border-2"
            >
              <span class="h3 fw-bold purple m-0"> {{ user.name }}</span>
              <div class="imagePreview__mini-image border border-2 rounded-circle my-0 ms-2" 
                :style="{ 'background-image': `url(${user.photo})` }">
              </div>
            </router-link>
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
            <!--  -->
        </div>
        <div class="row-flex d-flex align-items-center justify-content-start mt-3 mx-0">
          <button type="button" 
            class="btn btn-md btn-outline-green rounded-pill"
            data-bs-toggle="modal" data-bs-target="#AddDonationModal">
            <i class="fa-solid fa-coins"></i> Hacer donacion
          </button>
          <!-- MODAL -->
          <div class="modal fade" 
            id="AddDonationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content bg-black border border-2 text-white p-3">
                <div class="modal-header">
                  <h5 class="modal-title fw-bold" id="staticBackdropLabel">Haz una donación</h5>
                  <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
                    <i class="fa fa-xmark"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <AddDonationForm :userid="user.id" :projectid="project.id" />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <DonationList :userid="user.id" :projectid="project.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';
import DonationList from '@/components/DonationList.vue';
import AddDonationForm from '@/components/AddDonationForm.vue';

export default {
    name: "MySubscription",
    data() {
        return {
            user: null,
            project: null,
        };
    },
    created() {
        this.getUser();
        this.getProject();
    },
    methods: {
        async getUser() {
            try {
                const response = await userApi.getUser(this.$route.params.nickName);
                this.user = response.data[0];
            }
            catch (err) {
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
    },
    
    components: { DonationList, AddDonationForm }
}
</script>

<style>

</style>