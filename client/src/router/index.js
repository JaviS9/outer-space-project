import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  // *** PRIVATE ROUTES ***
  {
    path: '/manager',
    name: 'HomeAdmin',
    component: () => import('../views/private/HomeAdmin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  // *** USER ROUTES ***
  {
    path: '/manager/users',
    name: 'ListUser',
    component: () => import('../views/private/user/ListUser.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/users/profile/:nickName',
    name: 'ViewUser',
    component: () => import('../views/private/user/ViewUser.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/users/add',
    name: 'AddUser',
    component: () => import('../views/private/user/AddUser.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/users/edit/:nickName',
    name: 'EditUser',
    component: () => import('../views/private/user/EditUser.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  // *** PROJECT ROUTES ***
  {
    path: '/manager/projects',
    name: 'ListProject',
    component: () => import('../views/private/project/ListProject.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/projects/view/:title',
    name: 'ViewProject',
    component: () => import('../views/private/project/ViewProject.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/projects/add',
    name: 'AddProject',
    component: () => import('../views/private/project/AddProject.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/projects/edit/:title',
    name: 'EditProject',
    component: () => import('../views/private/project/EditProject.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  // *** ADMIN ROUTES ***
  {
    path: '/manager/admins',
    name: 'ListAdmin',
    component: () => import('../views/private/admin/ListAdmin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/admins/profile/:email',
    name: 'ViewAdmin',
    component: () => import('../views/private/admin/ViewAdmin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/admins/add',
    name: 'AddAdmin',
    component: () => import('../views/private/admin/AddAdmin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/admins/edit/:id',
    name: 'EditAdmin',
    component: () => import('../views/private/admin/EditAdmin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  // *** TECH ROUTES ***
  {
    path: '/manager/techs',
    name: 'ListTech',
    component: () => import('../views/private/tech/ListTech.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/techs/add',
    name: 'AddTech',
    component: () => import('../views/private/tech/AddTech.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/manager/techs/edit/:tech_name',
    name: 'EditTech',
    component: () => import('../views/private/tech/EditTech.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && !store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  // *** SUBSCRIPTION (PRIVATE) ***
  {
    path: '/subscription/:subscription',
    name: 'ViewSubscription',
    component: () => import('../views/private/subscription/ViewSubscription.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && (!store.state.isAdminLoggedIn && !store.state.isUserLoggedIn)) next({ name: 'LoginRegister' })
      else next()
    },
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
    path: '/explore',
    name: 'ExploreProjects',
    component: () => import('../views/public/ExploreProjects.vue')
  },
  {
    path: '/news',
    name: 'NewsProjects',
    component: () => import('../views/public/NewsProjects.vue')
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/public/AboutView.vue')
  },
  {
    path: '/project/:title',
    name: 'ProjectPage',
    component: () => import('../views/public/ProjectPage.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
  },
  {
    path: '/user/:nickName',
    name: 'UserProfile',
    component: () => import('../views/public/UserProfile.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'LoginRegister' && store.state.isAdminLoggedIn) next({ name: 'LoginRegister' })
      else next()
    },
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
