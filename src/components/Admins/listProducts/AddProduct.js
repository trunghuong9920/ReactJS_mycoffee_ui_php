import { useEffect, useState } from 'react'

import './style.scss'
import config from '../../../_config'
import ApiController from '../../../services/apiController'
import ProductController from './ProductController'
import nobody from '../../../images/nodrink.jpg'

function AddProduct({hide, handleReloadForAdd}) {
    const port = config()
    const [urlImg, setUrlImg] = useState('')
    const [avata, setAvata] = useState('')
    const {CheckInfo} = ProductController()
    const {create} = ApiController()
    const [cates, setCates] = useState([])
    const [nameP, setNameP] = useState('')
    const [nameC, setNameC] = useState('Cà phê truyền thống')
    const [idC, setIdC] = useState(1)
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')


    const handleGetProduct = (e) =>{
        setIdC(e.target.value)
        cates.map(item => {
            if(parseInt(e.target.value) === item.id){
                setNameC(item.name);
            }
        })
    }
    const handleSave  = () =>{
        if(CheckInfo(nameP, price)){
            const formData = {
                nameC:nameC,
                idc:idC,
                img:urlImg,
                name:nameP,
                price:price
            }
            const api = port + "/products"
            handleReloadForAdd(formData)
            create(api, formData)
            hide()
        }
        else{
            setError("Vui lòng nhập đầy đủ thông tin!")
        }
    }
    useEffect(() => {
        const api = "http://localhost:3000/categorys"
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setCates(data)
            })
    }, [])

    //----
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
                    <h3 className="form_group_title">Tên sản phẩm:</h3>
                    <input className="form_group_input"
                        placeholder='Chèn thông tin...'
                        value={nameP}
                        onChange= {e => setNameP(e.target.value)}
                    />
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Loại sản phẩm:</h3>
                    <select
                        value={idC}
                        onChange={handleGetProduct}
                    >
                        {
                            cates.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form_group">
                    <h3 className="form_group_title">Giá sản phẩm:</h3>
                    <input className="form_group_input"
                        placeholder='Vui lòng nhập số...'
                        value={price}
                        onChange = {e => setPrice(e.target.value)}
                    />
                </div>
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
        </>
    )
}

export default AddProduct