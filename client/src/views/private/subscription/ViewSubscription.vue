<template>
  <div class="router-view">
    <div class="container mt-3">
      <div class="row-flex d-flex align-items-center justify-content-start">
        <p class="h3 fw-bold my-0 me-3">
          Suscripción <span class="text-info">#{{formatId(this.$route.params.subscription)}}</span>
        </p>
        <!--  -->
        <router-link type="button"
          :to=" $store.state.isAdminLoggedIn ? `/manager/users/profile/${user.nickName}` : `/user/${user.nickName}`"
          style="text-decoration: none; color: inherit;"
          class="ms-3 d-flex align-items-center justify-content-start p-2 btn btn-md rounded-pill border border-2"
        >
          <span class="h3 fw-bold purple m-0"> {{ user.name }}</span>
          <div class="imagePreview__mini-image border border-2 rounded-circle my-0 ms-2" 
            :style="{ 'background-image': `url(${user.photo})` }">
          </div>
        </router-link>
        <i class="fa-solid fa-arrows-rotate fa-2xl ms-2"></i>
        <router-link type="button" 
          :to=" $store.state.isAdminLoggedIn ? `/manager/projects/view/${project.title}` : `/project/${project.title}`"
          style="text-decoration: none; color: inherit;"
          class="ms-2 d-flex align-items-center justify-content-start p-2 btn btn-md rounded-pill border border-2"
        >
          <span class="h3 fw-bold orange m-0"> {{ project.title }}</span>
          <div class="imagePreview__mini-image border border-2 rounded-circle my-0 ms-2" 
            :style="{ 'background-image': `url(${project.photo})` }">
          </div>
        </router-link> 
        <!--  -->
      </div>
      <div class="row-flex d-flex align-items-center justify-content-start mt-3 mx-0">
        <button v-if="($store.state.isUserLoggedIn && $store.state.user.id == user.id)"
          type="button" 
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
                <AddDonationForm :subscriptionid="subs.numSubs" @subs="getSubs"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <DonationList :subscriptionid="subs.numSubs" :key="componentKey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/services/userApi';
import projectApi from '@/services/projectApi';
import subscriptionApi from '@/services/subscriptionApi';

import DonationList from '@/components/DonationList.vue';
import AddDonationForm from '@/components/AddDonationForm.vue';

import { ref } from 'vue';

export default {
    name: "SubscriptionInfo",
    data() {
        return {
            subs: null,
            user: null,
            project: null,
        };
    },

    setup() {
    const componentKey = ref(0);

      const forceRerender = () => {
        componentKey.value += 1;
        console.log(componentKey.value)
      };

      return {
        componentKey,
        forceRerender
      }
    },

    created() {
        this.getSubs(this.$route.params.subscription)
    },

    methods: {

        formatId(id){
          var zeros = "000000";
          var num = String(id)
          return zeros.substring(0, zeros.length - num.length) + num
        },

        async getSubs(subs) {
          try {
              const response = await subscriptionApi.getSubscription(subs);
              this.subs = response.data[0];
              this.forceRerender()
              this.getUser(this.subs.idUser);
              this.getProject(this.subs.idProject);
          }
          catch (err) {
              console.log(err);
          }
        },

        async getUser(id) {
            try {
                const response = await userApi.getUserId(id);
                this.user = response.data[0];
            }
            catch (err) {
                console.log(err);
            }
        },
        async getProject(id) {
            try {
                const response = await projectApi.getProjectId(id);
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