import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './style.css'
import config from '../../_config'

function Login() {
    const navigate = useNavigate();
    const port = config()
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const [hidePass, setHidePass] = useState('password')


    const handleSetHidePass =()=>{
        if(hidePass === 'password'){
            setHidePass('text')
        }
        else if(hidePass === 'text'){
            setHidePass('password')

        }
    }

    function checkInfo(account, password) {
        if (account === '') return false
        if (password === '') return false
        return true
    }

    useEffect(() => {
        if (data.length > 0) {
            data.map(item => {
                if (item.status == 1) {
                    setError("Tài khoản đã bị khóa!")
                }
                if (item.status == 0) {
                    localStorage.setItem("idaccount", item.id)
                    navigate('/')
                }
            })
        }
        else {
            if (checkInfo(account, password)) {
                setError("Thông tin tài khoản hoặc mật khẩu không chính xác!")
            }
        }
    }, [data])

    const handleLogin = () => {
        if (checkInfo(account, password)) {
            setError("")
            const api = port + "/login"
            const formData = new FormData()
            formData.append('account', account)
            formData.append('password', password)

            getAccount(api, formData)
        }
        else {
            setError("Vui lòng nhập đầy đủ thông tin!")
        }

    }
    function getAccount(api, formData) {
        const options = {
            method: "POST",
            body: formData
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='login-app'>
            <div className='box-main'>
                <div className='box-left'>
                    <h1 className='name-app'>MY COFFEE</h1>
                    <h2 className='Login'>Login</h2>
                </div>
                <div className='box-right'>
                    <form>
                        <div className='box-right_inputgroup'>
                            <label><FontAwesomeIcon icon="fa-solid fa-user" /></label>
                            <input placeholder='Nhập vào tài khoản... '
                                value={account}
                                onChange={e => setAccount(e.target.value)}
                            />
                        </div>
                        <div className='box-right_inputgroup'>
                            <label><FontAwesomeIcon icon="fa-solid fa-key" /></label>
                            <input placeholder='Nhập vào mật khẩu... '
                                type= {hidePass}                               
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button  type='button' className='btn-eyes' onClick={handleSetHidePass}><i className='ti-eye'></i></button>
                        <p className='box-right_error'>{error}</p>
                        <button className='btn-login' type='button' onClick={handleLogin}>Đăng nhập</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login