import Api from '@/services/Api'

export default {
    // LIST ALL
    async getDonations () {
        return Api().get('donation/list');
    },

    // GET
    async getSubscriptionDonations(idUser, idProject) {
      return Api().get(`subcription/find/donations/user/${idUser}/project/${idProject}`);
    },

    // CREATE
    async saveDonation(donationData) {
      return Api().post('donation/add', donationData)
    },

    // DELETE
    deleteDonation(id, idUser, idProject) {
        return Api().delete(`/donation/${id}/delete/user/${idUser}/project/${idProject}`)
    },
}