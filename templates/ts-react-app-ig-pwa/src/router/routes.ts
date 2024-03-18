const pages = {
    auth: {
        root: 'auth',
        login: {
            name: 'login',
            path: '/auth/login'
        },
        register: {
            name: 'register',
            path: '/auth/register'
        },
    },
    clients: {
        name: 'clients',
        path: '/clients'
    },
    recommendations: {
        name: 'recommendations',
        path: '/recommendations'
    },
    recipes: {
        name: 'recipes',
        path: '/recipes'
    },
    fieldAssessment: {
        name: 'fieldAssessment',
        path: '/fieldAssessment'
    },
    quotes: {
        name: 'quotes',
        path: '/quotes'
    },
    priceLists: {
        name: 'priceLists',
        path: '/priceLists'
    },
    library: {
        name: 'library',
        path: '/library'
    },
    myAccount: {
        name: 'myAccount',
        path: '/myAccount'
    },
    status: {
        root: 'status',
        unverified: {
            name: 'unverified',
            path: '/status/unverified'
        },
        statusComingSoon: {
            name: 'coming-soon',
            path: '/status/coming-soon'
        },
        statusMaintenance: {
            name: 'maintenance',
            path: '/status/maintenance'
        },
        status404: {
            name: '404',
            path: '/status/404'
        },
        status500: {
            name: '500',
            path: '/status/500'
        },
        statusSuccess: {
            name: 'success',
            path: '/status/success'
        },
        statusFailure: {
            name: 'failure',
            path: '/status/failure'
        },
        statusCancel: {
            name: 'cancel',
            path: '/status/cancel'
        }
    }
}

export default pages;