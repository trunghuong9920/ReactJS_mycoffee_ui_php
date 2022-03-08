import Table from './components/tables/Table'
import Order from './components/orders/Order'
import Admin from './components/Admins/Admin'
import Info from './components/Info/Info'
import Logout from './components/logout/logout'

export const AdminRoute = [

    {
        path: '/',
        component: <Table/>
    },
    {
        path: '/order',
        component: <Order/>
    },
    {
        path: '/admin',
        component: <Admin/>
    },
    {
        path: '/info',
        component: <Info/>
    },
    {
        path: '/logout',
        component: <Logout/>
    }
]