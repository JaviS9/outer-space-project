import Api from '@/services/Api'

export default {
    register (userData) {
        return Api().post('register', userData)
    },

    login (credentials) {
        return Api().get(`login/${credentials.id}/${credentials.password}`)
    }
}