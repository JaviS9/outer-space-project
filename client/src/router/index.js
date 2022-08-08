import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/users/add',
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
      path: '/projects/add',
      name: 'AddProject',
      component: () => import('../views/private/project/AddProject.vue')
  },
  {
      path: '/projects/edit/:title',
      name: 'EditProject',
      component: () => import('../views/private/project/EditProject.vue')
  },
  // *** ADMIN ROUTES ***
  {
    path: '/admins',
    name: 'ListAdmin',
    component: () => import('../views/private/admin/ListAdmin.vue')
  },
  {
    path: '/admins/profile/:id',
    name: 'ViewAdmin',
    component: () => import('../views/private/admin/ViewAdmin.vue')
  },
  {
    path: '/admins/add',
    name: 'AddAdmin',
    component: () => import('../views/private/admin/AddAdmin.vue')
  },
  {
    path: '/admins/edit/:id',
    name: 'EditAdmin',
    component: () => import('../views/private/admin/EditAdmin.vue')
  },
  // *** TECH ROUTES ***
  {
    path: '/techs',
    name: 'ListTech',
    component: () => import('../views/private/tech/ListTech.vue')
  },
  {
    path: '/techs/add',
    name: 'AddTech',
    component: () => import('../views/private/tech/AddTech.vue')
  },
  {
    path: '/techs/edit/:id',
    name: 'EditTech',
    component: () => import('../views/private/tech/EditTech.vue')
  },
  // *** SUBSCRIPTION ***
  {
    path: '/subscription/user/:nickName/project/:title',
    name: 'EditTech',
    component: () => import('../views/private/subscription/ViewSubscription.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
