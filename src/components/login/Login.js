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

    useEffect(()=>{
        if(data.length >0){
            data.map(item=>{
                if(item.status == 1){
                    setError("Tài khoản đã bị khóa!")
                }
                if(item.status == 0){
                    localStorage.setItem("idaccount", item.id)
                    navigate('/')
                }
            })
        }
        else{
            if(checkInfo(name, password)){
            setError("Thông tin tài khoản hoặc mật khẩu không chính xác!")

            }
        }
    }, [data])

    const handleLogin = () => {
        if(checkInfo(name, password)){
            setError("")
            const api = port +"/login/"+name+"/" + password
            create(api)
            
        }
        else{
            setError("Vui lòng nhập đầy đủ thông tin!")
        }

    }

    const create = (api) => {
        fetch(api, {
            method: "POST"
        })
        .then(res =>{
            res.text()
            .then(_data =>{
                const data = JSON.parse(_data);
                setData(data);
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