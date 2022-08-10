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
    async getSubscriptions (id) {
      return Api().get(`user/find/subscriptions/${id}`);
    },

    // GET PART
    async getParticipations (id) {
      return Api().get(`user/find/participations/${id}`);
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

    // DELETE SUBS
    async deleteSubscription(idUser, idProject) {
      return await Api().delete(`user/${idUser}/delete/subscription/${idProject}`);
    },

    // DELETE PART
    async deleteParticipation(idUser, idProject) {
      return await Api().delete(`user/${idUser}/delete/participation/${idProject}`);
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

