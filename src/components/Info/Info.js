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

    const api = port + "/info?id=" + getAccount

    const [id, setId] = useState('')
    const [avata, setAvata] = useState('')
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [errorAccout, setErrorAccount] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [erroPassOld, setErrorPassOld] = useState('')
    const [dataAccount, setDataAccount] = useState([])

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
        setOldPass('')
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
        setOldPass('000000')
        setErrorPassOld('')
    }
    const handleSaveAvataToData = (urlAvata) => {
        setAvata(urlAvata)
        const api = port + "/info/updateavata"
        const formData = new FormData()
        formData.append("id", id)
        formData.append("avata", urlAvata)

        editData(api, formData)
    }
    const handleSaveAccount = () => {
        if (account !== '' && errorAccout === '') {
            setAccount(account)
            const api = port + "/info/updateaccount"
            const formData = new FormData()
            formData.append("id", id)
            formData.append("account", account)

            editData(api, formData)
            setErrorAccount("")
            setEditAccount(!editAccount)
        }
        else {
            if (errorAccout != '') {
                setErrorAccount("T??i kho???n ???? ???????c s??? d???ng!")
            }
            else {
                setErrorAccount("Vui l??ng nh???p t??n t??i kho???n!")
            }
        }
    }
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
            setErrorAccount("T??i kho???n ???? ???????c s??? d???ng!")
        }
    }

    const handleSaveName = () => {
        if (name !== '') {
            setName(name)
            const api = port + "/info/updatename"

            const formData = new FormData()
            formData.append("id", id)
            formData.append("name", name)

            editData(api, formData)
            setErrorName("")
            setEditName(!editName)
        }
        else {
            setErrorName("Vui l??ng nh???p h??? t??n!")
        }
    }
    const handleSavePhone = () => {
        if (phone !== '' && errorPhone === '') {
            setPhone(phone)
            const api = port + "/info/updatephone/"

            const formData = new FormData()
            formData.append("id", id)
            formData.append("phone", phone)
            editData(api, formData)
            setErrorPhone("")
            setEditPhone(!editPhone)
        }
        else {
            if (errorPhone != '') {
                setErrorPhone("S??? ??i???n tho???i kh??ng ????ng!!")

            }
            else {
                setErrorPhone("Vui l??ng nh???p s??? ??i??n tho???i l?? c??c ch??? s???!")
            }
        }
    }

    const handleSavePass = () => {
        if (erroPassOld === '' && errorPass === '' && newPass != '') {
            setOldPass('000000')
            setNewPass('')
            setConfirmPass('')
            const api = port + "/info/updatepassword"

            const formData = new FormData()
            formData.append("id", id)
            formData.append("password", newPass)
            editData(api, formData)
            setEditPassword(!editPassword)
            setErrorPassOld('')
        }
        else{
            if(errorPass === '' && erroPassOld == ''){
                setErrorPass("Vui l??ng nh???p ?????y ????? th??ng tin!")
            }
        }
    }

    const handleCheckPhone = (e) => {
        setPhone(e.target.value)
        if (is_phonenumber(e.target.value)) {
            setErrorPhone('')
        }
        else {
            setErrorPhone('S??? ??i???n tho???i kh??ng ????ng!')
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
    const handleChangePass = (e) =>{
        setNewPass(e.target.value)
        if (e.target.value === confirmPass) {
            setErrorPass('')
        }
        else {
            setErrorPass('M???t kh???u x??c nh???n kh??ng ch??nh x??c!')
        }
    }
    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value)

        if (e.target.value === newPass) {
            setErrorPass('')
        }
        else {
            setErrorPass('M???t kh???u x??c nh???n kh??ng ch??nh x??c!')
        }
    }


    const handleCheckOldPass = (e) => {
        setOldPass(e.target.value)
        const api = port + '/info/checkpass'
        const formData = new FormData()
        formData.append("id", id)
        formData.append("password", e.target.value)
        fetch(api, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.length == 0) {
                    setErrorPassOld("M???t kh???u kh??ng ch??nh x??c!")
                }
                else {
                    setErrorPassOld('')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="info">
            <div className="info_header">
                <div className="order_header">
                    <Link to="/" className="order_header-link">
                        <i className="ti-home order_header-link_icon"></i>
                        Trang ch???
                    </Link>
                    <i className="order_header-icon">/</i>
                    <Link to="/admin" className="order_header-link">
                        Th??ng tin c?? nh??n
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
                            <h2>T??n t??i kho???n:</h2>
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
                                >Ch???nh s???a</button>
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
                                    >L??u</button>
                                    <button
                                        onClick={handleCloseAccount}
                                    >H???y</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    readOnly={!editAccount}
                                    value={account}
                                    ref={targetInputAc}
                                    onChange={handleCheckAccount}
                                />

                            </div>
                            <p className="editInfo_group_body-error">{errorAccout}</p>
                        </div>

                    </div>
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>H??? t??n:</h2>
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
                                >Ch???nh s???a</button>
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
                                    >L??u</button>
                                    <button
                                        onClick={handleCloseName}
                                    >H???y</button>
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
                            <h2>S??? ??i???n tho???i:</h2>
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
                                >Ch???nh s???a</button>
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
                                    <button onClick={handleSavePhone}>L??u</button>
                                    <button
                                        onClick={handleClosePhone}
                                    >H???y</button>
                                </div>
                            </div>
                        </div>
                        <div className="editInfo_group_body">
                            <div className="editInfo_group_body_form">
                                <input
                                    readOnly={!editPhone}
                                    value={phone}
                                    ref={targetInputPhone}
                                    onChange={handleCheckPhone}
                                />
                            </div>
                            <p className="editInfo_group_body-error">{errorPhone}</p>

                        </div>
                    </div>
                    <div className="editInfo_group">
                        <div className="editInfo_group_title">
                            <h2>M???t kh???u:</h2>
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
                                >Ch???nh s???a</button>
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
                                    <button onClick={handleSavePass}>L??u</button>
                                    <button
                                        onClick={handleClosePass}
                                    >H???y</button>
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
                                        editPassword ? 'M???t kh???u c??' : ''
                                    }
                                    value={
                                        oldPass
                                    }
                                    onChange={handleCheckOldPass}
                                />
                                <input
                                    className="editInfo_group_body_form_editpassword"
                                    readOnly={!editPassword}
                                    type={
                                        editPassword ? 'text' : 'password'
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
                                        editPassword ? 'M???t kh???u m???i' : ''
                                    }
                                    value={newPass}
                                    onChange={handleChangePass}
                                />
                                <input
                                    className="editInfo_group_body_form_editpassword"
                                    readOnly={!editPassword}
                                    type={
                                        editPassword ? 'text' : 'password'
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
                                        editPassword ? 'X??c nh???n m???t kh???u' : ''
                                    }
                                    value={confirmPass}
                                    onChange={handleConfirmPass}
                                />
                            </div>
                            <p className="editInfo_group_body-error">{erroPassOld}</p>

                            <p className="editInfo_group_body-error">{errorPass}</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Info