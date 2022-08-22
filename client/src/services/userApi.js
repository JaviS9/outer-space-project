import Api from '@/services/Api'

export default {
    // LIST ALL
    async getUsers () {
        return Api().get('user/list');
    },

    // GET USER
    getUser(nickName) {
      return Api().get(`user/find/${nickName}`)
    },

    // GET USER ID
    async getUserId(idFounder) {
      return Api().get(`user/find/id/${idFounder}`);
    },

    // GET FUNDED PROJECTS
    getFundedProjects (id) {
      return Api().get(`user/find/projects/${id}`);
    },

    // GET SUBS
    async getOneSubscription (idUser, idProject) {
      return Api().get(`user/${idUser}/find/subscription/${idProject}`);
    },

    async getSubscriptions (id) {
      return Api().get(`user/find/subscriptions/${id}`);
    },

    // GET PART
    async getOneParticipation (idUser, idProject) {
      return Api().get(`user/${idUser}/find/participation/${idProject}`);
    },

    async getParticipations (id) {
      return Api().get(`user/find/participations/${id}`);
    },

    async getTechs (id) {
      return Api().get(`user/find/techs/${id}`);
    },

    async getDonations (id) {
      return Api().get(`user/find/donations/${id}`);
    },

    // CREATE USER
    async saveUser(userData) {
      return Api().post('user/add', userData)
    },

    // CREATE SUBS
    async saveSubscription (subscriptions) {
      return await Api().post("user/add/subscription", subscriptions);
    },

    // CREATE PART
    async saveParticipation (participations) {
      return await Api().post("user/add/participation", participations)
    },

    // CREATE TECHS
    async saveTechs (techs) {
      return await Api().post("user/add/tech", techs)
    },

    // DELETE SUBS
    async deleteSubscription(idUser, idProject) {
      return await Api().delete(`user/${idUser}/delete/subscription/${idProject}`);
    },

    // DELETE PART
    async deleteParticipation(idUser, idProject) {
      return await Api().delete(`user/${idUser}/delete/participation/${idProject}`);
    },

    // DELETE TECH
    async deleteTech(idUser, idTech) {
      return await Api().delete(`user/${idUser}/delete/tech/${idTech}`);
    },
    
    // UPDATE USER
    updateUser(id, userData) {
        return Api().put(`user/update/${id}`, userData)
    },

    // DELETE
    deleteUser(id) {
        return Api().delete(`user/delete/${id}`)
    },

    // SEARCH
    searchUser(nickName) {
        return Api().get(`user/search/${nickName}`)
    },
}

