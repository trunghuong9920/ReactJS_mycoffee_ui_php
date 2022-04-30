import { useState, useEffect } from 'react'

import config from '../../../_config'
import './style.scss'
import ApiController from '../../../services/apiController'
import ProductController from './ProductController'
import nobody from '../../../images/nodrink.jpg'

function EditProduct({ idEdit, hide, handleReloadForEdit }) {
    const port = config()
    const { CheckInfo } = ProductController()
    const { editData } = ApiController()

    const [avata, setAvata] = useState('')
    const [getImgSrc, setGetImgSrc] = useState()
    const [nameP, setNameP] = useState('')
    const [idC, setIdC] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [errorPrice, setErrorPrice] = useState('')

    const id = idEdit
    const [dataEdit, setDataEdit] = useState([])
    const [dataCate, setDataCate] = useState([])


    const handleGetProduct = (e) => {
        setIdC(e.target.value)
    }

    const handleSave = () => {
        if (CheckInfo(nameP, price) && errorPrice === '') {
          
            const api = port + "/products/update"
            const formData = new FormData()
            formData.append("id", id)
            formData.append("idc", idC)
            formData.append("name", nameP)
            formData.append("img", getImgSrc)
            formData.append("price", price)

            editData(api, formData)
            handleReloadForEdit()
            hide()
        }
        else {
            setError("Vui lòng nhập đủ thông tin!")
        }
    }

    useEffect(() => {
        const api = port + "/products/getone?id=" + id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataEdit(data)
                data.map(item => {
                    setIdC(item.idc)
                    setNameP(item.name)
                    setPrice(item.price)
                    setGetImgSrc(item.img)
                })
            })
    }, [])

    useEffect(() => {
        const api = port + "/categorys/getall"
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setDataCate(data)
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

    function checkNumber(value) {
        var regex = /^[0-9]+$/;
        if (value.match(regex)) {
            return true
        }
        return false
    }

    const handleGetPrice = (e) => {
        setPrice(e.target.value)
        if (checkNumber(e.target.value)) {
            setErrorPrice("")
        }
        else {
            setErrorPrice("Giá sản phẩm là các chữ số!")
        }
    }
    return (
        <>
            <div className="modal">
                <div className="modal_header">
                    <h1>Chỉnh sửa thông tin sản phẩm</h1>
                </div>
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
                                    <h3 className="form_group_title">Mã sản phẩm:</h3>
                                    <input className="form_group_input"
                                        readOnly={true}
                                        value={item.id}
                                    />
                                </div>
                                <div className="form_group">
                                    <h3 className="form_group_title">Tên sản phẩm:</h3>
                                    <input className="form_group_input"
                                        value={nameP}
                                        placeholder="Nhập tên sản phẩm.."
                                        onChange={e => setNameP(e.target.value)}
                                    />
                                </div>
                                <div className="form_group">
                                    <h3 className="form_group_title">Loại sản phẩm:</h3>
                                    <select
                                        value={idC}
                                        onChange={handleGetProduct}
                                    >
                                        {
                                            dataCate.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form_group">
                                    <h3 className="form_group_title">Giá bán:</h3>
                                    <input className="form_group_input"
                                        value={price}
                                        placeholder="Vui lòng nhập chữ số..."
                                        onChange={handleGetPrice}
                                    />
                                    <p className='form_group-error'>{errorPrice}</p>
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

export default EditProduct