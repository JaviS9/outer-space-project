import Api from '@/services/Api'
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default {
    setUserLogged(userLogged) {
        Cookies.set("userLogged", userLogged);
    },

    getUserLogged() {
        return Cookies.get("userLogged");
    },

    deleteUserLogged() {
        Cookies.remove('userLogged');
    },

    decodeJwt (token) {
        return jwt_decode(token);
    },

    register (userData) {
        return Api().post('register', userData)
    },

    login (credentials) {
        return Api().get(`login/${credentials.id}/${credentials.password}`)
    }
}