import { useState, useEffect } from 'react'

import './style.scss'
import ApiController from '../../../services/apiController'
import config from '../../../_config'
import CateController from './CateController'


function AddCate({hide, handleReloadForAdd}) {
    const port = config()
    const {create} = ApiController()
    const {CheckInfo} = CateController()
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSaveCate = () => {
        if(CheckInfo(name))
        {
            const formDt = {
                name:name
            }
            const api = port + "/categorys/add"
            const formData = new FormData()
            formData.append('name', name)
            create(api,formData)
            handleReloadForAdd(formDt)
            hide()
        }
        else{
            setError("Vui lòng nhập đầy đủ thông tin!")
        }
    }

    return (
        <>
            <div className="modal_body">
                <div className="form_group">
                    <h3 className="form_group_title">Loại sản phẩm:</h3>
                    <input className="form_group_input"
                        placeholder='Chèn thông tin...'
                        value={name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveCate}
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

export default AddCate