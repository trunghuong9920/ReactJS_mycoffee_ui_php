import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

import config from '../../_config'
import "./style.scss"
import EditAvata from "./editAvata/EditAvata"
import ApiController from '../../services/apiController'

function Info() {
    const port = config()
    const { editData } = ApiController()
    const [data, setData] = useState([])
    const getAccount = localStorage.getItem("idaccount")
  
    const api = port + "/info?id="+getAccount

    const [id, setId] = useState('')
    const [avata, setAvata] = useState('')
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [permission, setPermission] = useState('')
    const [errorAccout, setErrorAccount] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [errorPass, setErrorPass] = useState('')

    useEffect(() => {
        const options = {
            method: "GET"
        }
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
                setData(data)
                data.map(item => {
                    setId(item.id)
                    setAvata(item.avata)
                    setAccount(item.account)
                    setName(item.name)
                    setPhone(item.phone)
                    setOldPass("000000")
                    setPermission(item.permission)
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    const [editAccount, setEditAccount] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const targetInputAc = useRef();
    const targetInputName = useRef();
    const targetInputPhone = useRef();
    const targetInputPass = useRef();

    const handleEditAccount = () => {
        setEditAccount(!editAccount)
        targetInputAc.current.focus()
    }
    const handleEditName = () => {
        setEditName(!editName)
        targetInputName.current.focus()
    }
    const handleEditPhone = () => {
        setEditPhone(!editPhone)
        targetInputPhone.current.focus()
    }
    const handleEditPassword = () => {
        setEditPassword(!editPassword)
        targetInputPass.current.focus()
    }
    const handleCloseAccount = () => {
        setEditAccount(!editAccount)
        setErrorAccount("")
        data.map(item => {
            setAccount(item.account)
        })
    }
    const handleCloseName = () => {
        setEditName(!editName)
        setErrorName("")
        data.map(item => {
            setName(item.name)
        })
    }
    const handleClosePhone = () => {
        setEditPhone(!editPhone)
        setErrorPhone("")
        data.map(item => {
            setPhone(item.phone)
        })
    }
    const handleClosePass = () => {
        setEditPassword(!editPassword)
        setErrorPass("")
        data.map(item => {
            setOldPass(item.password)
        })
    }
    const handleSaveAvataToData = (urlAvata) => {
        setAvata(urlAvata)
        const formData = {
            account: account,
            name: name,
            phone: phone,
            avata: urlAvata,
            permission: permission,
            password: oldPass
        }
        const api = port + "/users/" + id
        editData(api, formData)
    }
    const handleSaveAccount = () => {
        if (account !== '') {
            const formData = {
                account: account,
                name: name,
                phone: phone,
                avata: avata,
                permission: permission,
                password: oldPass
            }
            const api = port + "/users/" + id
            editData(api, formData)
            localStorage.setItem("account", account)
            setErrorAccount("")
            setEditAccount(!editAccount)
        }
        else {
            setErrorAccount("Vui lòng nhập tên tài khoản!")
        }
    }

    const handleSaveName = () => {
        if (name !== '') {
            const formData = {
                account: account,
                name: name,
                phone: phone,
                avata: avata,
                permission: permission,
                password: oldPass
            }
            const api = port + "/users/" + id
            editData(api, formData)
            setErrorName("")
            setEditName(!editName)
        }
        else {
            setErrorName("Vui lòng nhập họ tên!")
        }
    }
    const handleSavePhone = () => {
        if (phone !== '') {
            const formData = {
                account: account,
                name: name,
                phone: phone,
                avata: avata,
                permission: permission,
                password: oldPass
            }
            const api = port + "/users/" + id
            editData(api, formData)
            setErrorPhone("")
            setEditPhone(!editPhone)
        }
        else {
            setErrorPhone("Vui lòng nhập số điên thoại là các chữ số!")
        }
    }


    return (
        <div className="info">
            <div className="info_header">
                <div className="order_header">
                    <Link to="/" className="order_header-link">
                        <i className="ti-home order_header-link_icon"></i>
                        Trang chủ
                    </Link>
                    <i className="order_header-icon">/</i>
                    <Link to="/admin" className="order_header-link">
                        Thông tin cá nhân
                    </Link>
                </div>
            </div>
            <div className="info_body">
                <div>
                    <EditAvata
                        apiSrc={avata}

                        idStaff={id}
                        handleSaveAvataToData={handleSaveAvataToData}
                    />

                </div>
                <div className="editInfo">
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>Tên tài khoản:</h2>
                            <div className="editInfo_group_title_edit">
                                <button
                                    style={
                                        editAccount ? {
                                            display: 'none'
                                        } :
                                            {
                                                display: 'block'
                                            }
                                    }
                                    onClick={handleEditAccount}
                                >Chỉnh sửa</button>
                                <div
                                    style={
                                        editAccount ? {
                                            display: 'flex'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                >
                                    <button
                                        onClick={handleSaveAccount}
                                    >Lưu</button>
                                    <button
                                        onClick={handleCloseAccount}
                                    >Hủy</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    readOnly={!editAccount}
                                    value={account}
                                    ref={targetInputAc}
                                    onChange={e => setAccount(e.target.value)}
                                />

                            </div>
                            <p className="editInfo_group_body-error">{errorAccout}</p>
                        </div>

                    </div>
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>Họ tên:</h2>
                            <div className="editInfo_group_title_edit">
                                <button
                                    style={
                                        editName ? {
                                            display: 'none'
                                        } :
                                            {
                                                display: 'block'
                                            }
                                    }
                                    onClick={handleEditName}
                                >Chỉnh sửa</button>
                                <div
                                    style={
                                        editName ? {
                                            display: 'flex'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                >
                                    <button
                                        onClick={handleSaveName}
                                    >Lưu</button>
                                    <button
                                        onClick={handleCloseName}
                                    >Hủy</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    readOnly={!editName}
                                    value={name}
                                    ref={targetInputName}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <p className="editInfo_group_body-error">{errorName}</p>

                        </div>
                    </div>
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>Số điện thoại:</h2>
                            <div className="editInfo_group_title_edit">
                                <button
                                    style={
                                        editPhone ? {
                                            display: 'none'
                                        } :
                                            {
                                                display: 'block'
                                            }
                                    }
                                    onClick={handleEditPhone}
                                >Chỉnh sửa</button>
                                <div
                                    style={
                                        editPhone ? {
                                            display: 'flex'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                >
                                    <button onClick={handleSavePhone}>Lưu</button>
                                    <button
                                        onClick={handleClosePhone}
                                    >Hủy</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    readOnly={!editPhone}
                                    value={phone}
                                    ref={targetInputPhone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <p className="editInfo_group_body-error">{errorPhone}</p>

                        </div>
                    </div>
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>Mật khẩu:</h2>
                            <div className="editInfo_group_title_edit">
                                <button
                                    style={
                                        editPassword ? {
                                            display: 'none'
                                        } :
                                            {
                                                display: 'block'
                                            }
                                    }
                                    onClick={handleEditPassword}
                                >Chỉnh sửa</button>
                                <div
                                    style={
                                        editPassword ? {
                                            display: 'flex'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                >
                                    <button>Lưu</button>
                                    <button
                                        onClick={handleClosePass}
                                    >Hủy</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    className="editInfo_group_body_form_editpassword"
                                    readOnly={!editPassword}
                                    type={
                                        editPassword ? 'text' : 'password'
                                    }
                                    ref={targetInputPass}
                                    placeholder={
                                        editPassword ? 'Mật khẩu cũ' : ''
                                    }
                                    value={
                                        editPassword ? '' : oldPass
                                    }
                                    onChange={e => setOldPass(e.target.value)}
                                />
                                <input
                                    className="editInfo_group_body_form_editpassword"
                                    readOnly={!editPassword}
                                    type={
                                        editPassword ? 'text' : 'password'
                                    }
                                    defaultValue={
                                        editPassword ? '' : 'password'
                                    }
                                    style={
                                        editPassword ? {
                                            display: 'block'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                    placeholder={
                                        editPassword ? 'Mật khẩu mới' : ''
                                    }
                                />
                                <input
                                    className="editInfo_group_body_form_editpassword"
                                    readOnly={!editPassword}
                                    type={
                                        editPassword ? 'text' : 'password'
                                    }
                                    defaultValue={
                                        editPassword ? '' : 'password'
                                    }
                                    style={
                                        editPassword ? {
                                            display: 'block'
                                        } :
                                            {
                                                display: 'none'
                                            }
                                    }
                                    placeholder={
                                        editPassword ? 'Xác nhận mật khẩu' : ''
                                    }
                                />
                            </div>
                            <p className="editInfo_group_body-error">{errorPass}</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Info