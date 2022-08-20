<template>
  <div class="row p-3 mt-3">
    <div class="col">
      <div v-if="donations.length === 0">
        <p class="text-danger text-center h5 p-3">No hay donaciones</p>
      </div>
      <div v-else
          v-for="don in donations" :key="don.id"
          class="card bg-black text-white border border-2 rounded-pill mx-0 mb-3 p-0"
      >
        <div class="card-body m-0 p-0">
          <div class="row-flex d-flex align-items-center justify-content-center p-2">
            <!--  -->
            <div class="col-md-1 flex-column d-flex align-items-start justify-content-center">
                <p class="m-0 p-2 rounded-pill d-flex align-items-center justify-content-center orange border-orange"
                >#{{formatId(don.id)}}
                </p>
            </div>
            <div class="col-md-3 flex-column d-flex align-items-start justify-content-center">
              <div class="row-flex d-flex justify-content-center align-items-center">
                <p class="m-0">Donación: <span class="fw-bold">{{ don.donation }}</span> <i class="fa fa-euro-sign"></i></p>
              </div>
            </div>
            <div class="col-md-4 flex-column d-flex align-items-start justify-content-center">
                <p class="m-0">{{formatDate(don.date)}}</p>
            </div>
            <div class="col-md-4 flex-column d-flex align-items-start justify-content-center">
              BOTONEZZ
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subscriptionApi from '@/services/subscriptionApi';

export default {
    name:'DonationList',
    data() {
      return {
        donations: []
      }
    },

    props: {
      userid: String,
      projectid: String,
    },

    created() {
      this.getSubscriptionDonations(this.$props.userid, this.$props.projectid)
    },

    methods: {
      formatId(id){
        var zeros = "000000";
        var num = String(id)
        return zeros.substring(0, zeros.length - num.length -1) + num
      },

      formatDate(date){
        return "Fecha: " + date.substring(0, 10) + ", Hora: " +  date.substring(14, date.length - 5)
      },

      async getSubscriptionDonations(idUser, idProject) {
        try {
          const donations = await subscriptionApi.getSubscriptionDonations(idUser, idProject)
          this.donations = donations.data
        } catch (err) {
          console.log(err)
        }
      }
    }
}
</script>

<style>

</style>