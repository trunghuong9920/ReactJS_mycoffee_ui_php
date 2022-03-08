import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import config from '../../_config'
import './style.css'
import './style.scss'
import ListAccount from './listAccounts/ListAccount'
import ListTable from './listTables/ListTable'
import ListCategory from './listCategorys/ListCategory'
import ListProduct from './listProducts/ListProduct'

const tabs = [
    {
        id: '1',
        name: 'Danh mục tài khoản'
    },
    {
        id: '2',
        name: 'Danh mục bàn'
    },
    {
        id: '3',
        name: 'Loại sản phẩm'
    }
    , {
        id: '4',
        name: 'Sản phẩm'
    }
    , {
        id: '5',
        name: 'Thống kê'
    }
]

function Admin() {
    const port = config()
    const [tabActive, setTabActive] = useState('1')
    const [data, setData] = useState([])

    let type = 'users'
    let component = <ListAccount/>

    switch (tabActive) {
        case '1':
            component = <ListAccount />
            type = "users"
            break
        case '2':
            component = <ListTable />
            type = "tables"
            break
        case '3':
            component = <ListCategory/>
            type = "categorys"
            break
        case '4':
            component = <ListProduct/>
            type = "products"
            break
        default:
            component = <ListAccount/>
    }
    return (
        <div className="admin ">
            <div className="admin-title">
                <div className="order_header">
                    <Link to="/" className="order_header-link">
                        <i className="ti-home order_header-link_icon"></i>
                        Trang chủ
                    </Link>
                    <i className="order_header-icon">/</i>
                    <Link to="/admin" className="order_header-link">
                        Trang quản trị
                    </Link>
                </div>
            </div>
            <div className="admin_body row">
                <div className="col l-2">
                    <div className="admin-col_right">
                        <ul className="admin-col_right-list">
                            {
                                tabs.map((item, index) => (
                                    <li key={index} className="admin-col_right-item">
                                        <button
                                            className={clsx('admin-col_right-tab',
                                                tabActive === item.id ? {
                                                    'admin-col_right-tab_active': true
                                                } : {
                                                    'admin-col_right-tab_active': false
                                                }
                                            )}
                                            onClick={() => setTabActive(item.id)}
                                        >
                                            <i className='ti-angle-right'></i>
                                            <h3>{item.name}</h3>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="col l-10">
                    <div className="colRight">
                        {component}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Admin