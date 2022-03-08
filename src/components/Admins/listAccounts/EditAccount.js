import { useState, useEffect } from 'react'

import './style.scss'
import config from '../../../_config'
import nobody from '../../../images/nobody_m.256x256.jpg'
import ApiController from '../../../services/apiController'
import AccountController from './AccountController'

function EditAccount({ idEdit , handleEdit, handleReloadForEdit }) {
    const port = config()
    const {create, editData} = ApiController()
    const {CheckInfo,CheckInfoEdit} = AccountController()
    const id = idEdit
    const [avata, setAvata] = useState('')
    const [dataEdit, setDataEdit] = useState([])
    const [getImgSrc, setGetImgSrc] = useState()
    const [permission, setPermission] = useState('Quản Lý')
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [convertPermission, setConvertPermis]= useState()

    const handleGetValueSelect = (e) => {
        if (e.target.value === '1') {
            setPermission("Nhân viên")
            setConvertPermis('1')
        }
        else {
            setPermission("Quản lý")
            setConvertPermis('0')
        }
    }

    const handleSaveEdit = () =>{
        if(CheckInfoEdit(account,name,phone))
        {
            const formData = {
                account:account,
                name:name,
                phone:phone,
                avata:getImgSrc,
                permission:permission,
                password:password
            }
            const api = port + "/users/"+id
            editData(api, formData)
            handleReloadForEdit(id,formData)
            handleEdit()
        }
        else{
            setError("Vui lòng nhập đủ thông tin!")
        }
    }

    //load data
    useEffect(() => {
        const api = port + "/users?id=" + id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataEdit(data)
                data.map(item => {
                    setGetImgSrc(item.avata)
                    setAccount(item.account)
                    setName(item.name)
                    setPhone(item.phone)
                    setPassword(item.password)
                    setPermission(item.permission)
                    if(item.permission === "Quản lý"){
                        setConvertPermis('0')
                    }
                    if(item.permission === "Nhân viên"){
                        setConvertPermis('1')
                    }
                });
            })
    }, [])

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
                                    defaultValue={item.id}
                                    readOnly={true}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Tên tài khoản:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập thông tin tài khoản...'
                                    defaultValue={item.account}
                                    onChange = {e => setAccount(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Tên nhân viên:</h3>
                                <input className="form_group_input"
                                    placeholder='Nhập thông tin nhân viên...'
                                    defaultValue={item.name}
                                    onChange = {e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Số điện thoại:</h3>
                                <input className="form_group_input"
                                    placeholder='Vui lòng nhập chữ số...'
                                    defaultValue={item.phone}
                                    onChange = {e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Quyền truy cập:</h3>
                                <select
                                    value= {convertPermission}
                                    onChange={handleGetValueSelect}
                                >
                                    <option value="0">Quản lý</option>
                                    <option value="1">Nhân viên</option>
                                </select>
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