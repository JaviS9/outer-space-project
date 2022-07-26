import Api from '@/services/Api'

export default {
    // LIST ALL
    getProjects() {
        return Api().get('project/list');
    },

    // GET PROJECT
    getProject(title) {
        return Api().get(`project/find/${title}`)
    },

    getProjectId(id) {
        return Api().get(`project/find/id/${id}`)
    },

    // GET UPDATES
    async getUpdates(id) {
        return Api().get(`project/find/updates/${id}`)
    },
  
    // GET SUBS
    async getSubscriptions(id) {
        return Api().get(`project/find/subscriptions/${id}`)
    },

    // GET DONATIONS
    async getDonations(id) {
        return Api().get(`project/find/donations/${id}`)
    },

    async getAllDonations() {
        return Api().get('project/all/donations')
    },

    // CREATE
    saveProject(projectData) {
        return Api().post('project/add', projectData);
    },

    // CREATE UPDATE
    saveUpdate(updateData) {
        return Api().post('project/add/update', updateData)
    },
 
    // UPDATE
    updateProject(id, projectData) {
        return Api().put(`project/update/${id}`, projectData)
    },

    // DELETE
    deleteProject(id) {
        return Api().delete(`project/delete/${id}`)
    },

    // DELETE UPDATE
    deleteUpdate (idProject, date) {
        return Api().delete(`http://localhost:5000/project/${idProject}/delete/update/${date}`)
    },

    // GET ALL UPDATES
    listAllUpdates () {
        return Api().get('project/update/list');
    },

    // SEARCH
    searchProject(title) {
        return Api().get(`project/search/${title}`)
    },

    searchUpdate(update) {
        return Api().get(`update/search/${update}`)
    },
}