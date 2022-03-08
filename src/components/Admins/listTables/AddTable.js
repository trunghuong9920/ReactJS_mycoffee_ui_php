import { useState } from 'react'

import './style.scss'
import config from '../../../_config'
import ApiController from '../../../services/apiController'
import TableController from './TableController'

function AddTable({hide , handleReloadForAdd}) {
    const {create} = ApiController()
    const port = config()
    const {checkTable} = TableController()
    const [name, setName]  = useState('')
    const [area, setArea] = useState('Ngoài sân')
    const [error, setError] = useState('')
    const handleGetArea = (e) =>{
        if(e.target.value === '0'){
            setArea("Ngoài sân")
        }
        if(e.target.value === '1'){
            setArea("Tầng 1")
        }
        if(e.target.value === '2'){
            setArea("Tầng 2")
        }
    }

    const handleSaveTable = () =>{
        if(checkTable(name)){
            const formData = {
                name:name,
                status: "Trống",
                area:area
            }
            const api = port + "/tables"
            create(api,formData)
            handleReloadForAdd(formData)
            hide()
        }
        else{
            setError("Vui lòng nhập đủ thông tin!")
        }
    }


    return (
        <>
            <div className="modal_body">
                <div className="form_group">
                    <h3 className="form_group_title">Tên Bàn:</h3>
                    <input className="form_group_input"
                        placeholder='Chèn thông tin...'
                        value={name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Khu vực:</h3>
                    <select
                        onChange={handleGetArea}
                    >
                        <option value="0">Ngoài sân</option>
                        <option value="1">Tầng 1</option>
                        <option value="2">Tầng 2</option>
                    </select>
                </div>
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3>{error}</h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveTable}
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

export default AddTable