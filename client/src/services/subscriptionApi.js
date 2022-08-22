import Api from '@/services/Api'

export default {
    // LIST ALL
    async getDonations () {
        return Api().get('donation/list');
    },

    // GET
    async getSubscription (id) {
      return Api().get(`subscription/find/${id}`);
    },

    async getSubscriptionDonations(id) {
      return Api().get(`subscription/find/donations/${id}`);
    },

    // CREATE
    async saveDonation(donationData) {
      return Api().post('donation/add', donationData)
    },

    // DELETE
    deleteDonation(idSubscription, idDonation) {
        return Api().delete(`subscription/${idSubscription}/delete/donation/${idDonation}`)
    },
}