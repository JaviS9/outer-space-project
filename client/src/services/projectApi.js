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

    // GET UPDATES
    async getUpdates(id) {
        return Api().get(`project/find/updates/${id}`)
    },
  
    // GET SUBS
    async getSubscriptions(id) {
        return Api().get(`project/find/subscriptions/${id}`)
    },

    // GET PART
    async getParticipations(id) {
        return Api().get(`project/find/participations/${id}`)
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
    }
}