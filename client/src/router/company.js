//COMPANY ROUTES
export const companyRoutes = [
    {
        path: '/companies',
        name: 'ListCompany',
        component: () => import('../views/private/company/ListCompany.vue')
    },
    {
        path: '/companies/view/:companyId',
        name: 'ViewCompany',
        component: () => import('../views/private/company/ViewCompany.vue')
    },
    {
        path: '/companies/add/:companyId',
        name: 'AddCompany',
        component: () => import('../views/private/company/AddCompany.vue')
    },
    {
        path: '/companies/edit/:companyId',
        name: 'EditCompany',
        component: () => import('../views/private/company/EditCompany.vue')
    }
]