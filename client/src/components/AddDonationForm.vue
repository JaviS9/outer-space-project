<template>
<div class="router-view">
    <form autocomplete="off">
        <div class="row row-flex d-flex mb-3">
            <div class="form-group">
                <label class="mb-2" for="name">Nombre completo de la tarjeta</label>
                <input class="form-control" id="name" type="text" placeholder="Introduce tu nombre" v-model="donationinfo.card_name">
            </div>
        </div>
        <div class="row-flex d-flex mb-3">
            <div class="form-group">
                <label class="mb-2" for="ccnumber">Numero de tarjeta</label>
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="0000 0000 0000 0000" autocomplete="off" v-model="donationinfo.card_number">
                    <span class="input-group-text">
                        <i class="fa-solid fa-credit-card"></i>
                    </span>
                </div> 
            </div>
        </div>
        <div class="row-flex d-flex mb-3 justify-content-start">
                <div class="form-group col-sm-3 pe-3 border-end border-1">
                    <label class="mb-2" for="cvv">CVV/CVC</label>
                    <input class="form-control" id="cvv" type="text" placeholder="123" v-model="donationinfo.cvv">
                </div>
                <div class="form-group col-sm-3 ps-3">
                    <label class="mb-2" for="monthyear">mes / año</label>
                    <input class="form-control " id="monthyear" type="text" placeholder="mm/yy" v-model="donationinfo.expire_date">
                </div>
        </div>
        <div class="row-flex d-flex align-items-center justify-content-start">
            <div class="col-md-6 d-flex align-items-center justify-content-center">
                <input type="number" min="1" step="any" class="form-control m-0" placeholder="Cantidad a donar" v-model="donationinfo.donation">
                <i class="fa fa-euro-sign ms-1"></i>
                <p v-if="error != ''" class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>{{ error }}</p>
            </div>
            <div class="col-md-3 d-flex align-items-center justify-content-end p-0">
                <button type="button" 
                    class="btn btn-md btn-outline-green ms-2" 
                    v-on:click="saveDonation"
                ><i class="fa-solid fa-circle-dollar-to-slot"></i> Donar
                </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import subscriptionApi from '@/services/subscriptionApi';

export default {
  name: "EditUser",
  data() {
    return {
        donationinfo: {
            card_name: "",
            card_number: "",
            cvv: "",
            expire_date: "",
            donation: "",
        },
        error: ""
    }
  },

  props: {
    subscriptionid: String,
  },

  methods: {
        async saveDonation() {
            try {
                if(Object.values(this.donationinfo).every(value => value != "")) {
                    const donation = await subscriptionApi.saveDonation({
                        idSubscription: this.$props.subscriptionid,
                        cardName: this.donationinfo.card_name,
                        cardNumber: this.donationinfo.card_number,
                        cardExpirationDate: this.donationinfo.expire_date,
                        donation: this.donationinfo.donation
                    })
                    console.log(donation)
                } else {  this.error = "Por favor, rellena todos los campos" }
            } catch (err) {
                console.log(err)
            }
        }
  }
}
</script>

<style>

</style>