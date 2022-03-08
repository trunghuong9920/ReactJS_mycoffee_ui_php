import { useState, useEffect, useRef } from 'react'

import './style.scss'
import nobody from '../../../images/nobody_m.256x256.jpg'
import ApiController from '../../../services/apiController'
import config from '../../../_config'
import AccountController from './AccountController'

function AddAccount({hide , handleReloadForAdd}) {
    const {create} = ApiController()
    const {CheckInfo} = AccountController()
    const port = config()
    const [urlImg, setUrlImg] = useState('')
    const [avata, setAvata] = useState('')
    const [permission, setPermission] = useState('Quản lý')
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const handleGetValueSelect = (e) => {
        if (e.target.value === '1') {
            setPermission("Nhân viên")
        }
        else {
            setPermission("Quản lý")
        }
    }


    //add
    
    const handleSaveAccount = () =>{
        if(CheckInfo(account,name,phone,password,confirmPass)){
            const formData = {
                account:account,
                name:name,
                phone:phone,
                avata:urlImg,
                permission:permission,
                password:password
            }
            const api = port +"/users"
            create(api,formData)
            handleReloadForAdd(formData)
            hide();
            
        }
        else{
            setError("Vui lòng nhập đầy đủ thông tin!")
        }
    }
    //---------------------
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
        setUrlImg('')
        setAvata('')
    }
    return (
        <>
            <div className="modal_body">
                <div className="form_group">
                    <h3 className="form_group_title">Ảnh:</h3>
                    <img src={avata.preview || urlImg || nobody} />
                    <div className='form_group_imgsrc'>
                        <input
                            className="form_group_input"
                            placeholder='Chèn đường dẫn ảnh...'
                            value={urlImg}
                            onChange={e => setUrlImg(e.target.value)}
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
                    <h3 className="form_group_title">Tên tài khoản:</h3>
                    <input className="form_group_input"
                        placeholder='Nhập tên tài khoản...'
                        value={account}
                        onChange = {e => setAccount(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Tên nhân viên:</h3>
                    <input className="form_group_input"
                        placeholder='Nhập tên nhân viên...'
                        value={name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Số điện thoại:</h3>
                    <input className="form_group_input"
                        placeholder='Số điện thoại là các chữ số...'
                        value={phone}
                        onChange = {e => setPhone(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Quyền truy cập:</h3>
                    <select
                        onChange={handleGetValueSelect}
                    >
                        <option value="0" >Quản lý</option>
                        <option value="1">Nhân viên</option>
                    </select>
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Mật khẩu:</h3>
                    <input className="form_group_input"
                        placeholder='Nhập mật khẩu...'
                        value={password}
                        onChange = {e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Nhập lại mật khẩu:</h3>
                    <input className="form_group_input"
                        placeholder='Nhập lại mật khẩu...'
                        value={confirmPass}
                        onChange = {e => setConfirmPass(e.target.value)}
                    />
                </div>
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveAccount}
                    >
                        <i className='ti-save'></i>
                    </button>
                    <button
                        onClick={hide}
                    >
                        <i className='ti-back-right'></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddAccount