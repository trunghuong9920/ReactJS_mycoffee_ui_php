import {Routes, Route, Link, useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState} from 'react'
import clsx from 'clsx'


import './style.css'
import logo from '../../images/logo.png'
import nobody from '../../images/nobody_m.256x256.jpg'
import config from '../../_config'

function Header(){
    const port = config()
    const [avata, setAvata] = useState('')
    const [name, setName] = useState('')
    const [permission,setPermission] = useState('')
    const location = useLocation()
    const [hideHeaderAccount, setHideHeaderAccount] = useState()

    let activeAdmin = false
    if(location.pathname === '/admin'){
        activeAdmin = true
    }
    const getAccount = localStorage.getItem("idaccount")
    const api = port + "/info/" + getAccount
    useEffect(() =>{
        fetch(api, {
            method: "POST"
        })
        .then(res =>{
            res.text()
            .then(_data =>{
                const data = JSON.parse(_data);
                data.map(item =>{
                    setAvata(item.avata)
                    setName(item.name)
                    setPermission(item.permission)
                })
            })
        })
      }, [])
    return(
        <div className='header-main'
        >
            <div className='header'>
                <ul className='header-left'>
                    <li className='header-left_item'>
                        <Link to="/" className='header-left_link'>
                            <img className='header-logo' src={logo} alt='logo'/>
                        </Link>
                    </li>
                    <li className={clsx('header-left_item', 
                        permission == 0 ? {
                            'hidden_forpermission': false
                        }:{
                            'hidden_forpermission': true
                        }
                    )}>
                        <Link to="/admin" className={clsx('header-left_link', 'header_link-hover', {
                            'header_link-active':activeAdmin
                        })}>
                            <FontAwesomeIcon icon="fa-solid fa-user-edit" />
                        </Link>
                        <span className='header-left_item-note'><p>Admin</p></span>
                    </li>
                    <li className='header-left_item'>
                        <a href='#' className={clsx('header-left_link', 'header_link-hover')}><i className='ti-facebook'></i></a>
                        <span className='header-left_item-note'><p>Facebook</p></span>
                    </li>
                    <li className='header-left_item'>
                        <a href='#' className={clsx('header-left_link', 'header_link-hover')}><i className='ti-instagram'></i></a>
                        <span className='header-left_item-note'><p>Intagram</p></span>
                    </li>
                    <li className='header-left_item'>
                        <Link to="/support" className={clsx('header-left_link', 'header_link-hover')}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                        </Link>
                        <span className='header-left_item-note'><p>Report</p></span>
                    </li>
                </ul>
                <h2 className='header_name-app'>My Coffee</h2>
                <ul className='header-right'>
                    <li className='header-right_item'>
                        <span className={clsx('header_right-bell', 'header_link-hover')}><FontAwesomeIcon  icon="fa-solid fa-bell" /></span>
                    </li>
                    <li className='header-right_item'>
                        <label htmlFor='cb_header_account' className='header-right_link-avta'
                            onClick={()=>setHideHeaderAccount(!hideHeaderAccount)}
                        >
                            <img  className='header-avata' src={avata || nobody} alt="avata"/></label>
                        <input type="checkbox" id='cb_header_account' hidden className='cb_header_account'
                            checked = {hideHeaderAccount}
                        />
                        <div className='header_account'
                        >
                            <div className='header_account-header'>
                                <span className='header-right_link-avta'>
                                    <img  className='header-avata' src={avata || nobody} alt="avata"/>
                                </span>
                                <span className='header_account-header_name'>{name}</span>
                            </div>
                            <ul className='header_account-body'>
                                <li className='header_account-body_item'
                                    onClick={()=>setHideHeaderAccount(!hideHeaderAccount)}
                                >
                                    <Link className='header_account-body_item-text' to="/info">Tài khoản</Link>  
                                </li>
                                <li className='header_account-body_item'>
                                    <Link className='header_account-body_item-text' to="/logout">Đăng xuất</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header