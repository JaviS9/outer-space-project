import { createRouter, createWebHistory } from 'vue-router'
// import userRoutes from './user'
// import projectRoutes from './project'
// import companyRoutes from './company'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotfound',
    component: () => import('../views/PageNotFound.vue')
  },
  // *** USER ROUTES ***
  {
      path: '/users',
      name: 'ListUser',
      component: () => import('../views/private/user/ListUser.vue')
  },
  {
      path: '/users/profile/:nickName',
      name: 'ViewUser',
      component: () => import('../views/private/user/ViewUser.vue')
  },
  {
      path: '/users/add/',
      name: 'AddUser',
      component: () => import('../views/private/user/AddUser.vue')
  },
  {
      path: '/users/edit/:nickName',
      name: 'EditUser',
      component: () => import('../views/private/user/EditUser.vue')
  },
  // *** PROJECT ROUTES ***
  {
      path: '/projects',
      name: 'ListProject',
      component: () => import('../views/private/project/ListProject.vue')
  },
  {
      path: '/projects/view/:title',
      name: 'ViewProject',
      component: () => import('../views/private/project/ViewProject.vue')
  },
  {
      path: '/projects/add/:title',
      name: 'AddProject',
      component: () => import('../views/private/project/AddProject.vue')
  },
  {
      path: '/projects/edit/:title',
      name: 'EditProject',
      component: () => import('../views/private/project/EditProject.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // userRoutes,
  // projectRoutes,
  // companyRoutes
})

export default router
