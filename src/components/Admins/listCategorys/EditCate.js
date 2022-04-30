import { useState, useEffect } from 'react'

import ApiController from '../../../services/apiController'
import config from '../../../_config'
import CateController from './CateController'
import './style.scss'

function EditCate({ idEdit, hide, handleReloadForEdit }) {
    const port = config()
    const { editData } = ApiController()
    const {CheckInfo} = CateController()
    const id = idEdit
    const [dataEdit, setDataEdit] = useState([])
    const [error, setError] = useState('')
    const [name, setName] = useState('')

    const handleSave = () =>{
        if(CheckInfo(name)){
          
            const api = port + "/categorys/update"
            const formData = new FormData()
            formData.append("id", id)
            formData.append("name", name)
            editData(api, formData)
            handleReloadForEdit()
            hide()
        }
        else{
            setError("Vui lòng nhập đầy đủ thông tin!")
        }
    }

    useEffect(() => {
        const api = port + "/categorys/getone?id=" + id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataEdit(data)
                data.map(item => {
                    setName(item.name)
                })
            })
    }, [])

    return (
        <>
            <div className="modal">
                <div className="modal_header">
                    <h1>Chỉnh sửa loại sản phẩm</h1>
                </div>
                <div className="modal_body">
                    {
                        dataEdit.map((item, index) => (
                            <div key={index}>

                                <div className="form_group">
                                    <h3 className="form_group_title">Mã loại sản phẩm:</h3>
                                    <input className="form_group_input"
                                        defaultValue="tb"
                                        readOnly={true}
                                        defaultValue = {item.id}
                                    />
                                </div>
                                <div className="form_group">
                                    <h3 className="form_group_title">Tên loại sản phẩm:</h3>
                                    <input className="form_group_input"
                                        defaultValue="tb"
                                        value={name}
                                        placeholder="Nhập tên sản phẩm..."
                                        onChange = {e => setName(e.target.value)}
                                    />
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
                            onClick={handleSave}
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
            </div>

        </>
    )
}

export default EditCate