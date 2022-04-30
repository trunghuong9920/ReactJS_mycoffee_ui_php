import {useState} from 'react'

import './style.scss'
import ApiController from '../../../services/apiController'
import config from '../../../_config'

function DeleteAccount({ idEdit , handleDelete, handleReloadForDelete }) {
    const port = config()
    const [error, setError] = useState('')
    const {deleteData} = ApiController()
    const idLogin = localStorage.getItem("idaccount")
    const handleSaveDelete = () =>{
        if(idEdit != idLogin){
            const api = port + "/users/deleteuser"
            const formData = new FormData()
            formData.append("id", idEdit)
            const options = {
                method: "POST",
                body: formData
            }
            fetch(api, options)
                .then(res => res.json())
                .then(data => {
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            handleReloadForDelete()
            handleDelete()
        }else{
            setError("Tài khoản đang được sử dụng, vui lòng đăng xuất!")
        }
    }
    return (
        <>
            <div className="modal_body">
                <h1 className='deleteValue'>Nhân viên : {idEdit} đã xóa sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>    
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveDelete}
                    >
                        <i className='ti-save'></i>
                    </button>
                    <button
                        onClick={handleDelete}
                    >
                        <i className='ti-back-right'></i>
                    </button>
                </div>
            </div>
        </>
    )
}
export default DeleteAccount