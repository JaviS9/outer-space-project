import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // *** PRIVATE ROUTES ***
  {
    path: '/manager',
    name: 'HomeAdmin',
    component: () => import('../views/private/HomeAdmin.vue')
  },
  // *** USER ROUTES ***
  {
      path: '/manager/users',
      name: 'ListUser',
      component: () => import('../views/private/user/ListUser.vue')
  },
  {
      path: '/manager/users/profile/:nickName',
      name: 'ViewUser',
      component: () => import('../views/private/user/ViewUser.vue')
  },
  {
      path: '/manager/users/add',
      name: 'AddUser',
      component: () => import('../views/private/user/AddUser.vue')
  },
  {
      path: '/manager/users/edit/:nickName',
      name: 'EditUser',
      component: () => import('../views/private/user/EditUser.vue')
  },
  // *** PROJECT ROUTES ***
  {
      path: '/manager/projects',
      name: 'ListProject',
      component: () => import('../views/private/project/ListProject.vue')
  },
  {
      path: '/manager/projects/view/:title',
      name: 'ViewProject',
      component: () => import('../views/private/project/ViewProject.vue')
  },
  {
      path: '/manager/projects/add',
      name: 'AddProject',
      component: () => import('../views/private/project/AddProject.vue')
  },
  // {
  //   path: '/projects/add/:founder',
  //   name: 'AddProject',
  //   component: () => import('../views/private/project/AddProject.vue')
  // },
  {
      path: '/manager/projects/edit/:title',
      name: 'EditProject',
      component: () => import('../views/private/project/EditProject.vue')
  },
  // *** ADMIN ROUTES ***
  {
    path: '/manager/admins',
    name: 'ListAdmin',
    component: () => import('../views/private/admin/ListAdmin.vue')
  },
  {
    path: '/manager/admins/profile/:id',
    name: 'ViewAdmin',
    component: () => import('../views/private/admin/ViewAdmin.vue')
  },
  {
    path: '/manager/admins/add',
    name: 'AddAdmin',
    component: () => import('../views/private/admin/AddAdmin.vue')
  },
  {
    path: '/manager/admins/edit/:id',
    name: 'EditAdmin',
    component: () => import('../views/private/admin/EditAdmin.vue')
  },
  // *** TECH ROUTES ***
  {
    path: '/manager/techs',
    name: 'ListTech',
    component: () => import('../views/private/tech/ListTech.vue')
  },
  {
    path: '/manager/techs/add',
    name: 'AddTech',
    component: () => import('../views/private/tech/AddTech.vue')
  },
  {
    path: '/manager/techs/edit/:tech_name',
    name: 'EditTech',
    component: () => import('../views/private/tech/EditTech.vue')
  },
  // *** SUBSCRIPTION ***
  {
    path: '/manager/subscription/user/:nickName/project/:title',
    name: 'ViewSubscription',
    component: () => import('../views/private/subscription/ViewSubscription.vue')
  },
  // *** PUBLIC ROUTES ***
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/public/HomeView.vue')
  },
  {
    path: '/start',
    name: 'LoginRegister',
    component: () => import('../views/public/LoginRegister.vue')
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/public/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotfound',
    component: () => import('../views/public/PageNotFound.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
