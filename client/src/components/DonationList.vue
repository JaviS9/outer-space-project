<template>
  <div class="row p-3 mt-3">
    <div class="col-12 border-bottom border-top border-2 pt-3 mb-3">
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
            <div class="col-md-2 flex-column d-flex align-items-start justify-content-center">
                <p class="m-0 p-2 rounded-pill d-flex align-items-center justify-content-center orange border-orange">
                  #{{formatId(don.id)}}
                </p>
            </div>
            <!--  -->
           <div class="flex-column d-flex justify-content-center"
              :class="{'col-md-2 align-items-start': $store.state.isAdminLoggedIn, 'col-md-3 align-items-end': !$store.state.isAdminLoggedIn}"
           >
              <div class="row-flex d-flex justify-content-center align-items-center p-2">
                <p class="m-0">Donación: <span class="fw-bold">{{ don.donation }}</span> <i class="fa fa-euro-sign"></i></p>
              </div>
            </div>
            <!--  -->
            <div class="flex-column d-flex justify-content-center"
              :class="{'col-md-2 align-items-start': $store.state.isAdminLoggedIn, 'col-md-3 align-items-end': !$store.state.isAdminLoggedIn}"
            >
                {{formatName(don.cardName)}}
            </div>
            <div class="col-md-2 flex-column d-flex align-items-start justify-content-center">
                {{formatNumber(don.cardNumber)}}
            </div>
            <!--  -->
            <div class="col-md-2 flex-column d-flex align-items-start justify-content-center">
                <p class="m-0">{{formatDate(don.date)}}</p>
            </div>
            <!--  -->
            <div v-if="$store.state.isAdminLoggedIn"
              class="col-md-2 flex-column d-flex align-items-end justify-content-center">
              <button type="button" v-on:click="deleteDonation(don.id)"
                class="btn btn-md btn-danger rounded-pill text-black"
              ><i class="fa fa-trash"></i>
              </button>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <div class="row-flex d-flex align-items-center justify-content-start">
      <div class="col-4 border border-2 rounded-pill py-3 px-4">
        <p class="m-0 p-0">TOTAL de donaciones: <span class="fw-bold greenyellow">{{num_donations}} <i class="fa fa-euro-sign"></i></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import subscriptionApi from '@/services/subscriptionApi';
import CryptoJS from 'crypto-js';

export default {
    name:'DonationList',
    data() {
      return {
        donations: [],
        num_donations: 0
      }
    },

    props: {
      subscriptionid: String,
    },

    created() {
      this.getSubscriptionDonations(this.$props.subscriptionid)
    },

    methods: {
      formatId(id){
        var zeros = "000000";
        var num = String(id)
        return zeros.substring(0, zeros.length - num.length) + num
      },

      formatName(name) {
        return CryptoJS.AES.decrypt(name, "SecretPassphrase").toString(CryptoJS.enc.Utf8)
      },

      formatNumber(number) {
        var dec = CryptoJS.AES.decrypt(number, "SecretPassphrase").toString(CryptoJS.enc.Utf8)
        return "**** **** **** " + dec.substring(15, 19)
      },

      formatDate(date){
        return "Fecha: " + date.substring(0, 10).replaceAll('-', '/') + ", Hora: " +  date.substring(14, date.length - 5)
      },

      async getSubscriptionDonations(idSubscription) {
        try {
          const donations = await subscriptionApi.getSubscriptionDonations(idSubscription)
          this.donations = donations.data
          console.log(this.donations)
          let sum = 0;
          if(this.donations.length > 0) {
            this.donations.forEach(key => {
                sum += key.donation;
            });
          }
          this.num_donations = sum
        } catch (err) {
          console.log(err)
        }
      },

      async deleteDonation(idDonation) {
        try {
          const response = await subscriptionApi.deleteDonation(this.$props.subscriptionid, idDonation)
          console.log(response)
          this.getSubscriptionDonations(this.$props.subscriptionid)
        } catch (err) {
          console.log(err)
        }
      }

    }
}
</script>

<style>

</style>