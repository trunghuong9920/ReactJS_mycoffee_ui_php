import { useState, useEffect } from 'react'

import './style.scss'
import ApiController from '../../../services/apiController'
import config from '../../../_config'

function DeleteTable({ id, hide, handleReloadForDelete }) {
    const { create, editData, deleteData } = ApiController()
    const [status, setStatus] = useState()
    const [error, setError] = useState('')
    const port = config()

    const handleSaveDeleteTable = () => {
        if (status == 0) {
            setError("")
            const api = port + "/tables/delete"
            const formData = new FormData()
            formData.append("id", id)
            deleteData(api, formData)
            handleReloadForDelete(id)
            hide()
        }
        else {
            setError("Bàn đang có người, không thể xóa!")
        }
    }

    useEffect(() => {
        const api = port + "/tables/getone?id=" + id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                data.map(item => {
                    setStatus(item.status)
                })
            })
    }, [])
    return (
        <>
            <div className="modal_body">
                <h1 className='deleteValue'>Thông tin bàn {id} sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>

            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveDeleteTable}
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
export default DeleteTable