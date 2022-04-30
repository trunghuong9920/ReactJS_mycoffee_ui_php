import { useState, useEffect } from 'react'

import './style.scss'
import config from '../../../_config'
import TableController from './TableController'
import ApiController from '../../../services/apiController'

function EditTable({ idEdit, hide, handleReloadForEdit }) {
    const port = config()
    const id = idEdit
    const {create, editData,deleteData} = ApiController()
    const [dataEdit, setDataEdit] = useState([])
    const {checkTable} = TableController()
    const [name, setName]  = useState('')
    const [area, setArea] = useState(0)
    const [status, setStatus] = useState()
    const [error, setError] = useState('')
    const [convertArea, setConvertArea] = useState()
    const handleGetArea = (e) =>{
        setArea(e.target.value)
    }

    const handleSaveTable = () =>{
        if(checkTable(name)){
            const api = port + "/tables/update"
            const formData = new FormData()
            formData.append("id",id)
            formData.append("name",name)
            formData.append("area",area)

            editData(api, formData)
            handleReloadForEdit()
            hide()
        }
        else{
            setError("Vui lòng nhập đủ thông tin!")
        }
    }

    useEffect(() => {
        const api = port + "/tables/getone?id=" + id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataEdit(data)
                data.map(item =>{
                    setArea(item.area)
                    setName(item.name)
                    setStatus(item.status)
                })
            })
    }, [])

    return (
        <>
            <div className="modal_body">
                {
                    dataEdit.map((item, index) => (
                        <div key={index}>

                            <div className="form_group">
                                <h3 className="form_group_title">Mã Bàn:</h3>
                                <input className="form_group_input"
                                    defaultValue="tb"
                                    readOnly={true}
                                    defaultValue={item.id}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Tên Bàn:</h3>
                                <input className="form_group_input"
                                    defaultValue="tb"
                                    defaultValue={item.name}
                                    onChange = {e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form_group">
                                <h3 className="form_group_title">Khu vực:</h3>
                                <select
                                    onChange={handleGetArea}
                                    value = {area}
                                >
                                    <option value="0">Ngoài sân</option>
                                    <option value="1">Tầng 1</option>
                                    <option value="2">Tầng 2</option>
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

export default EditTable