import Api from '@/services/Api'

export default {
    // LIST ALL
    getTechs () {
        return Api().get('tech/list');
    },

    // GET TECH
    getTech(name) {
      return Api().get(`tech/find/${name}`)
    },

    // GET TECH ID
    getTechId(id) {
      return Api().get(`tech/find/id/${id}`);
    },
    
    // CREATE
    saveTech(techData) {
        return Api().post('tech/add', techData)
    },

    // UPDATE
    updateTech(id, techData) {
        return Api().put(`tech/update/${id}`, techData)
    },

    // DELETE
    deleteTech(id) {
        return Api().delete(`tech/delete/${id}`)
    },

    // SEARCH
    searchTech(name) {
        return Api().get(`tech/search/${name}`)
    },
}

