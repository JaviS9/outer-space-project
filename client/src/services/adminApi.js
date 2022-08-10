import Api from '@/services/Api'

export default {
    // LIST ALL
    async getAdmins () {
        return Api().get('admin/list');
    },

    // GET USER ID
    async getAdminId(idFounder) {
      return Api().get(`admin/find/id/${idFounder}`);
    },

    // CREATE ADMIN
    async saveAdmin(adminData) {
      return Api().post('admin/add', adminData)
    },
    
    // UPDATE 
    updateAdmin(id, adminData) {
        return Api().put(`admin/update/${id}`, adminData)
    },

    // DELETE
    deleteAdmin(id) {
        return Api().delete(`admin/delete/${id}`)
    },

    // SEARCH
    searchAdmin(nickName) {
        return Api().get(`admin/search/${nickName}`)
    },
}

