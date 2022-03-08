import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './style.css'
import config from '../../_config'

function Login() {
    const navigate = useNavigate();
    const port = config()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [data, setData]= useState([])

    function checkInfo(name, password) {
        if (name === '') return false
        if (password === '') return false
        return true
    }

    const handleLogin = () => {
        const api = port + "/login/trunghuong/1"
        create(api)
    }

    const create = (api) => {
        fetch(api,{
            method:  "POST"
        })
        .then(res =>{
            res.text()
            .then(_data =>{
                console.log(_data);
                // const data = JSON.parse(_data);
                // setData(data.list)
            })
        })
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
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='box-right_inputgroup'>
                            <label><FontAwesomeIcon icon="fa-solid fa-key" /></label>
                            <input placeholder='Nhập vào mật khẩu... '
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                       
                        <p className='box-right_error'>{error}</p>
                        <button className='btn-login' type='button' onClick={handleLogin}>Đăng nhập</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login