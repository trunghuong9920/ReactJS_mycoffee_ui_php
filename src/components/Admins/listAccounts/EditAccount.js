import { useState, useEffect } from 'react'

import './style.scss'
import config from '../../../_config'
import nobody from '../../../images/nobody_m.256x256.jpg'
import ApiController from '../../../services/apiController'
import AccountController from './AccountController'

function EditAccount({ idEdit, handleEdit, handleReloadForEdit }) {
    const port = config()
    const { create, editData } = ApiController()
    const { CheckInfo, CheckInfoEdit } = AccountController()
    const id = idEdit
    const [avata, setAvata] = useState('')
    const [dataEdit, setDataEdit] = useState([])
    const [getImgSrc, setGetImgSrc] = useState()
    const [permission, setPermission] = useState(0)
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [errorConfirmPass, setErrorConfirmPass] = useState('')
    const [error, setError] = useState('')
    const [errorAccount, setErrorAccount] = useState('')
    const [dataAccount, setDataAccount] = useState([])
    const [errorPhone, setErrorPhone] = useState('')


    const handleGetValueSelect = (e) => {
        setPermission(e.target.value)
    }

    const handleSaveEdit = () => {
        if(password === '' && confirmPass === ''){
            if (CheckInfoEdit(account, name, phone) && errorPhone === '' && errorAccount === '') {
                const formDt = {
                    account: account,
                    name: name,
                    phone: phone,
                    avata: getImgSrc,
                    permission: permission
                }
                const api = port + "/users/updateuser"
                const formData = new FormData()
                formData.append('id', id)
                formData.append('account', account.replace(/\s+/g, ''))
                formData.append('name', name)
                formData.append('phone', phone)
                formData.append('avata', getImgSrc)
                formData.append('permission', permission)
    
                editData(api, formData)
                handleReloadForEdit(id, formDt)
                handleEdit()
            }
            else {
                setError("Vui lòng nhập đủ thông tin!")
            }
        }
        else if(password != '' && confirmPass != ''){
            if(CheckInfoEdit(account, name, phone) && errorConfirmPass === ''){
                const formDt = {
                    account: account,
                    name: name,
                    phone: phone,
                    avata: getImgSrc,
                    permission: permission
                }
                const api = port + "/users/updateuserallinfo"
                const formData = new FormData()
                formData.append('id', id)
                formData.append('account', account.replace(/\s+/g, ''))
                formData.append('name', name)
                formData.append('phone', phone)
                formData.append('avata', getImgSrc)
                formData.append('permission', permission)
                formData.append('password', password)
    
                editData(api, formData)
                handleReloadForEdit(id, formDt)
                handleEdit()
            }
        }
        else{
            setError("Vui lòng nhập đủ thông tin!")

        }
    }

    //load data
    useEffect(() => {
        const api = port + '/users/edituser?id=' + id

        const options = {
            method: "GET"
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
                setDataEdit(data)
                data.map(item => {
                    setGetImgSrc(item.avata)
                    setAccount(item.account)
                    setName(item.name)
                    setPhone(item.phone)
                    setPermission(item.permission)
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    useEffect(() => {
        const api = port + '/users/getaccount'
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataAccount(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    function checkCoincidentAccount(e) {
        let count = 0
        dataAccount.map(item => {
            if (item.account === e.target.value.replace(/\s+/g, '')) {
                count += 1
            }
        })
        if (count > 0) {
            return false
        }
        return true
    }
    const handleCheckAccount = (e) => {
        setAccount(e.target.value)
        if (checkCoincidentAccount(e)) {
            setErrorAccount("")
        }
        else {
            setErrorAccount("Tài khoản đã được sử dụng!")
        }
    }

    const handleCheckPhone = (e) => {
        setPhone(e.target.value)
        if (is_phonenumber(e.target.value)) {
            setErrorPhone('')
        }
        else {
            setErrorPhone('Số điện thoại không đúng!')
        }
    }


    function is_phonenumber(phonenumber) {
        const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (phonenumber.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        return () => {
            avata && URL.revokeObjectURL(avata.preview)
        }
    }, [avata])

    const handlePreviewAvata = (e) => {
        const file = e.target.files[0]

        file.preview = URL.createObjectURL(file)    //thêm object cho file

        setAvata(file)

        e.target.value = null
    }

    const handleReloadImg = () => {
        setAvata('')
        setGetImgSrc('')
    }
    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value)

        if (e.target.value === password) {
            setErrorConfirmPass('')
        }
        else {
            setErrorConfirmPass('Mật khẩu xác nhận không chính xác!')
        }
    }
    return (
        <>
            <div className="modal_body">
                {
                    dataEdit.map((item, index) => (
                        <div key={index}>
                            <div className="form_group">
                                <h3 className="form_group_title">Ảnh:</h3>
                                <img src={getImgSrc || avata.preview || nobody} />
                                <div className='form_group_imgsrc'>
                                    <input
                                        className="form_group_input"
                                        placeholder='Chèn đường dẫn ảnh...'
                                        defaultValue={getImgSrc}
                                        onChange={e => setGetImgSrc(e.target.value)}
                                    />
                                    <input type="file"
                                        id='form_group_imgsrc_upfile'
                                        hidden={true}
                                        onChange={handlePreviewAvata}
                                    />
                                    <label htmlFor='form_group_imgsrc_upfile' className="form_group_imgsrc_upfile"><i className='ti-export'></i>Tải lên</label>
                                    <button onClick={handleReloadImg}
                                        className="form_group_imgsrc_reloadimg"
                                    ><i className='ti-reload'></i> Hủy</button>
                                </div>
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Mã nhân viên:</h3>
                                <input className="form_group_input"
                                    defaultValue={id}
                                    readOnly={true}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Tên tài khoản:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập thông tin tài khoản...'
                                    defaultValue={item.account}
                                    onChange={handleCheckAccount}
                                />
                                <p className='form_group-error'>{errorAccount}</p>
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Tên nhân viên:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập thông tin nhân viên...'
                                    defaultValue={item.name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Số điện thoại:</h3>
                                <input className="form_group_input"
                                    placeholder='Vui lòng nhập chữ số...'
                                    defaultValue={item.phone}
                                    onChange={handleCheckPhone}
                                />
                                <p className='form_group-error'>{errorPhone}</p>
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Quyền truy cập:</h3>
                                <select
                                    value={permission}
                                    onChange={handleGetValueSelect}
                                >
                                    <option value="0">Quản lý</option>
                                    <option value="1">Nhân viên</option>
                                </select>
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Mật khẩu:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập mật khẩu...'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Nhập lại mật khẩu:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập lại mật khẩu...'
                                    value={confirmPass}
                                    onChange={handleConfirmPass}
                                />
                                <p className='form_group-error'>{errorConfirmPass}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveEdit}
                    >
                        <i className='ti-save'></i>
                    </button>
                    <button
                        onClick={handleEdit}
                    >
                        <i className='ti-back-right'></i>
                    </button>
                </div>
            </div>

        </>
    )
}

export default EditAccount