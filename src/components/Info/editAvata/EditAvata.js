import { useState, useEffect } from "react"

import './style.scss'
import config from "../../../_config"
import nobody from '../../../images/nobody_m.256x256.jpg'

function EditAvata({ apiSrc, idStaff, handleSaveAvataToData}) {
    const port = config()
    const [showEditAvata, setShowEditAvata] = useState(false)
    const [avata, setAvata] = useState('')
    const defaultAvata = nobody
    const [avatafromUrl, setavatafromUrl] = useState('')
    const apiSrcAvata = apiSrc
    const apiIdStaff = idStaff

    const handlePreviewAvataFromUrl = (e) => {
        setavatafromUrl(e.target.value)
    }
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


    const handleCloseEditAvata = () => {
        setShowEditAvata(!showEditAvata)
        setavatafromUrl('')
        setAvata('')
    }

    const handleSaveAvata = () => {
        setShowEditAvata(!showEditAvata)
        handleSaveAvataToData(avatafromUrl)
    }
    return (
        <>
            <div className="form_body_boxAvata">
                <div className="form_body_boxAvata_left">
                    <div className="form_body_boxAvata_left_picture">
                        <img src={avata.preview || avatafromUrl || apiSrcAvata || defaultAvata}
                            alt="avata"
                            style={
                                {
                                    width: '70px',
                                    height: '70px',
                                    display: 'block'
                                }
                            }
                        />
                        <input
                            type="file"
                            id="form_body_boxAvata_picture_selectavata"
                            hidden={true}
                            onChange={handlePreviewAvata}
                        />
                        <label htmlFor="form_body_boxAvata_picture_selectavata"
                            style={
                                showEditAvata ? {
                                    display: 'block'
                                } :
                                    {
                                        display: 'none'
                                    }
                            }
                        >
                            <i className="ti-camera"></i>
                        </label>
                        <input
                            className="form_body_boxAvata_left_linkAvata"
                            placeholder="Đường dẫn ảnh..."
                            value={avatafromUrl}
                            style={
                                showEditAvata ? {
                                    display: 'block'
                                } :
                                    {
                                        display: 'none'
                                    }
                            }
                            onChange={handlePreviewAvataFromUrl}
                        />
                    </div>

                    <div className="form_body_boxAvata_edit">
                        <div className="info_group_edit">
                            <button htmlFor="info_show_edit_control"
                                className="info_group_edit-showEdit"
                                style={
                                    showEditAvata ? {
                                        display: 'none'
                                    } :
                                        {
                                            display: 'block'
                                        }
                                }
                                onClick={() => setShowEditAvata(!showEditAvata)}
                            >
                                Chỉnh sửa
                            </button>
                            <div className="info_group_edit_control"
                                style={
                                    showEditAvata ? {
                                        display: 'flex'
                                    } :
                                        {
                                            display: 'none'
                                        }
                                }
                            >
                                <button
                                    onClick={handleSaveAvata}
                                >Lưu</button>
                                <button
                                    onClick={handleCloseEditAvata}
                                >Hủy</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="form_body_boxAvata_right">
                    <div className="form_body_boxAvata_right_idstaff">
                        <h3>Mã nhân viên:</h3>
                        <span>{apiIdStaff}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditAvata