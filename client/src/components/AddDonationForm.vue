<template>
<div>
    <button
        type="button" 
        class="btn btn-md btn-outline-green rounded-pill"
        data-bs-toggle="modal" data-bs-target="#AddDonationModal">
        <i class="fa-solid fa-coins"></i> Hacer donacion
    </button>
    <!-- MODAL -->
    <div class="modal fade" 
        id="AddDonationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
        aria-labelledby="staticBackdropLabel" aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content bg-black border border-2 text-white p-3">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Haz una donación</h5>
                    <button type="button" id="close" class="btn btn-outline-danger" data-bs-dismiss="modal">
                        <i class="fa fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
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
                        <div class="row-flex d-flex align-items-center justify-content-start">
                            <div class="col-lg-6 p-0">
                                <div class="row-flex d-flex mb-3 justify-content-start">
                                    <div class="form-group col-md-5 align-items-center justify-content-center pe-3 border-end border-1">
                                        <label class="mb-2" for="cvv">CVV/CVC</label>
                                        <input class="form-control" id="cvv" type="text" placeholder="123" v-model="donationinfo.cvv">
                                    </div>
                                    <div class="form-group col-md-6 align-items-center justify-content-center ps-3 pe-2">
                                        <label class="mb-2" for="monthyear">mes / año</label>
                                        <input class="form-control" id="monthyear" type="text" placeholder="mm/yy" v-model="donationinfo.expire_date">
                                    </div>
                                </div>
                                <div class="row-flex d-flex align-items-center justify-content-start">
                                    <div class="col-md-11 d-flex align-items-center justify-content-start">
                                        <input type="number" min="1" step="any" class="form-control m-0" placeholder="Cantidad a donar" v-model="donationinfo.donation">
                                        <i class="fa fa-euro-sign ms-1"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center justify-content-center p-0">
                                <button type="button" 
                                    class="btn btn-md btn-outline-green ms-2 border-green border-2 rounded-circle"
                                    style="width: 90px; height: 90px"
                                    v-on:click="saveDonation"
                                >Donar<i class="fa-solid fa-circle-dollar-to-slot"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import subscriptionApi from '@/services/subscriptionApi';
import swal from 'sweetalert';

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
                    this.$props.subscriptionid = ""
                    this.donationinfo.card_name = ""
                    this.donationinfo.card_number = ""
                    this.donationinfo.expire_date = ""
                    this.donationinfo.donation = ""
                    console.log(donation)
                    document.getElementById('close').click();
                    this.$emit("subs", this.$props.subscriptionid)
                } else {  
                    swal("Algo ha ido mal!", "Asegurate de rellenar todos los campos", "error")
                }
            } catch (err) {
                console.log(err)
            }
        }
  }
}
</script>

<style>

</style>