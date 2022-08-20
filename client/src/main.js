import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Pagination lib
// import VueAwesomePaginate from "vue-awesome-paginate";

//Font Awesome Icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

//Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

//main stylesheet
import "./style.scss"

createApp(App).use(store).use(router).mount('#app')
