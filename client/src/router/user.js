//USER ROUTES
export const userRoutes = [
    {
        path: '/users',
        name: 'ListUser',
        component: () => import('../views/private/user/ListUser.vue')
    },
    {
        path: '/users/profile/:userId',
        name: 'ViewUser',
        component: () => import('../views/private/user/ViewUser.vue')
    },
    {
        path: '/users/add/:userId',
        name: 'AddUser',
        component: () => import('../views/private/user/AddUser.vue')
    },
    {
        path: '/users/edit/:userId',
        name: 'EditUser',
        component: () => import('../views/private/user/EditUser.vue')
    }
]