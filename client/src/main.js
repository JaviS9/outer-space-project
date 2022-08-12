import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomePaginate from "vue-awesome-paginate";

// Session management
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// axios.defaults.withCredentials = true;
// req.session.destroy(); Para cerrar la sesion

//Font Awesome Icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

//Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

//main stylesheet
import "./style.scss"

createApp(App).use(store).use(router).use(VueAwesomePaginate).mount('#app')
