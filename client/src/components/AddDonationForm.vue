<template>
<div class="router-view">
    <form autocomplete="off">
        <div class="row-flex d-flex align-items-center justify-content-start">
            <div class="col-md-3 d-flex align-items-center justify-content-center">
                <input type="number" min="1" step="any" class="form-control m-0" placeholder="_ _ , _ _" v-model="donation">
                <i class="fa fa-euro-sign ms-1"></i>
                <p v-if="error != ''" class="text-danger"><i class="fa-solid fa-circle-exclamation mt-2 me-2"></i>{{ error }}</p>
            </div>
            <div class="col-md-9 d-flex align-items-center justify-content-start ps-3">
                <button type="submit" 
                    class="btn btn-md btn-outline-green" 
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
        donation: null,
        error: ""
    }
  },

  props: {
    userid: String,
    projectid: String,
  },

  methods: {
        async saveDonation() {
            try {
                if (this.donation != null) {
                    const donation = await subscriptionApi.saveDonation({
                        idUser: this.$props.userid,
                        idProject: this.$props.projectid,
                        donation: this.donation
                    })
                    console.log(donation)
                } else {  this.error = "Por favor, escribe una cantidad a donar" }
            } catch (err) {
                console.log(err)
            }
        }
  }
}
</script>

<style>

</style>