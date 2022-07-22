//PROJECTS ROUTES
export const projectRoutes = [
    {
        path: '/projects',
        name: 'ListProject',
        component: () => import('../views/private/project/ListProject.vue')
    },
    {
        path: '/projects/view/:projectId',
        name: 'ViewProject',
        component: () => import('../views/private/project/ViewProject.vue')
    },
    {
        path: '/projects/add/:projectId',
        name: 'AddProject',
        component: () => import('../views/private/project/AddProject.vue')
    },
    {
        path: '/projects/edit/:projectId',
        name: 'EditProject',
        component: () => import('../views/private/project/EditProject.vue')
    }
]