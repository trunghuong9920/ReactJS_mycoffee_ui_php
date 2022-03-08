import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"

import './style.scss'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import config from '../../../_config'

function ListProduct() {
    const port = config()
    const [getData, setGetData] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const [search, setSearch] = useState('')

    const [positionPage, setPositionPage] = useState(1)
    const [newData, setNewData] = useState([])
    let numberIteminPage = 5;
    let totalPage = Math.round(getData.length / numberIteminPage)
    let totalNextPage = totalPage / 3
    let startItem = numberIteminPage * positionPage - numberIteminPage
    let endItem = numberIteminPage * positionPage
    const [startPage, setStartPage] = useState(1)
    const [nextPage, setNextPage] = useState(1)

    const handleBackPage = () => {
        if (startPage > 1) {
            setStartPage(startPage - 3)
        }
    }
    const handleNextPage = () => {
        if (nextPage < totalNextPage) {
            setNextPage(nextPage + 1)
            setStartPage(startPage + 3)
        }
    }

    useEffect(() => {
        for (let i = 0; i <= totalPage; i++) {
            const btnPage = document.getElementById(`paginate_list_link-${i}`)
            if (positionPage === i) {
                btnPage.classList.add("paginate_list_link-active")
            }
            else {
                if (btnPage) {
                    btnPage.classList.remove("paginate_list_link-active")
                }
            }
        }
        const data = []
        getData.map((item, index) => {
            if (index >= startItem && index < endItem) {
                data.push(item)
            }
        })
        setNewData(data)

    }, [positionPage, getData])

    const handleActiveBtnPaginate = (value) => {
        setPositionPage(value)
    }
    const handleAdd = () => {
        setShowAdd(!showAdd)
    }
    const handleEdit = (id) => {
        setIdEdit(id)

        setShowEdit(!showEdit)
    }

    const handleDelete = (id) => {
        setIdEdit(id)

        setShowDelete(!showDelete)
    }
    const lastItem = getData[getData.length - 1]
    const handleReloadForAdd = (formData) => {
        const data = [...getData]
        const newData = {
            id: lastItem.id + 1,
            img: formData.img,
            name: formData.name,
            nameC: formData.nameC,
            idc: formData.idc,
            price: formData.price
        }
        data.push(newData)
        setGetData(data)
    }

    const handleReloadForEdit = (newid, formData) => {
        const data = [...getData];
        const newData = data.map(
            item => {
                if (item.id === newid) {
                    item.name = formData.name
                    item.nameC = formData.nameC
                    item.idc = formData.idc
                    item.price = formData.price
                    item.img = formData.img
                }
                return item
            }
        )
        setGetData(newData)
    }
    const handleReloadForDelete = (newId) => {
        setGetData(getData.filter(item => item.id !== newId))
    }
    //Load data
    useEffect(() => {
        if (search === '') {
            const api = port + '/products'
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
        else {
            const api = port + '/searchproducts/'+ search
            fetch(api, {
                method: "POST"
            })
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
    }, [search])

    function ModalAdd() {
        return (
            <>
                <div className="modal">
                    <div className="modal_header">
                        <h1>Thêm sản phẩm:</h1>
                    </div>
                    <AddProduct hide={handleAdd} handleReloadForAdd={handleReloadForAdd} />
                </div>
            </>
        )
    }
    function ModalEdit() {
        return (
            <>
                <EditProduct
                    idEdit={idEdit}
                    hide={handleEdit}
                    handleReloadForEdit={handleReloadForEdit}
                />

            </>
        )
    }

    function ModalDelete() {
        return (
            <>
                <DeleteProduct
                    idEdit={idEdit}
                    hide={handleDelete}
                    handleReloadForDelete={handleReloadForDelete}
                />
            </>
        )
    }
    return (
        <>
            <div className="colRight_header">
                <div className="colRight_header_left">
                    <h2>Danh mục sản phẩm</h2>
                </div>
                <div className="colRight_header_right">
                    <div className="colRight_header_right_search">
                        <input
                            placeholder='Tìm kiếm'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        className="colRight_header_right_add"
                        onClick={handleAdd}
                    >
                        <i className="ti-plus"></i>
                    </button>
                </div>
            </div>
            <div className="colRight_body">
                <div className="product">
                    <div className="product_title">
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Id</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Hình ảnh</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Tên sản phẩm</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Loại sản phẩm</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Giá</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Thao tác</h3>
                        </div>
                    </div>
                    <div className="product_body">
                        {
                            newData.map((item, index) => (
                                <div key={index} className="product_body_row">
                                    <div className="product_body_row_col">
                                        <h3 className="product_body_row_col_value">{item.id}</h3>
                                    </div>
                                    <div className="product_body_row_col">
                                        <img
                                            className='product_body_row_col_img'
                                            src={item.img}
                                        />
                                    </div>
                                    <div className="product_body_row_col">
                                        <h3 className="product_body_row_col_value">{item.name}</h3>
                                    </div>
                                    <div className="product_body_row_col">
                                        <h3 className="product_body_row_col_value">{item.category}</h3>
                                    </div>
                                    <div className="product_body_row_col">
                                        <h3 className="product_body_row_col_value">{item.price}</h3>
                                    </div>
                                    <div className="product_body_row_col">
                                        <div className="product_body_row_col_control">
                                            <button className="product_body_row_col_control-edit"
                                                onClick={() => handleEdit(item.id)}
                                            ><i className="ti-pencil-alt"></i></button>
                                            <button className="product_body_row_col_control-delete"
                                                onClick={() => handleDelete(item.id)}
                                            ><i className="ti-close"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="paginate">
                        <ul className="paginate_list">
                            <li className="paginate_list_item">
                                <button className="paginate_list_link"
                                    onClick={handleBackPage}
                                >
                                    <span><i className="ti-angle-left"></i></span>
                                </button>
                            </li>
                            <li className="paginate_list_item ">
                                <button className="paginate_list_link "
                                    id={`paginate_list_link-${startPage}`}
                                    onClick={() => handleActiveBtnPaginate(startPage)}
                                >
                                    <span>{startPage}</span>
                                </button>
                            </li>
                            <li className="paginate_list_item">
                                <button className="paginate_list_link"
                                    id={`paginate_list_link-${startPage + 1}`}
                                    onClick={() => handleActiveBtnPaginate(startPage + 1)}
                                >
                                    <span>{startPage + 1}</span>
                                </button>
                            </li>
                            <li className="paginate_list_item">
                                <button className="paginate_list_link"
                                    id={`paginate_list_link-${startPage + 2}`}
                                    onClick={() => handleActiveBtnPaginate(startPage + 2)}
                                >
                                    <span>{startPage + 2}</span>
                                </button>
                            </li>
                            <li className="paginate_list_item">
                                <div className="paginate_list_link">
                                    <span>...</span>
                                </div>
                            </li>
                            <li className="paginate_list_item">
                                <button className="paginate_list_link"
                                    onClick={handleNextPage}
                                >
                                    <span><i className="ti-angle-right"></i></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {
                        showAdd &&
                        <ModalAdd />
                    }
                    {
                        showEdit &&
                        <ModalEdit />
                    }
                    {
                        showDelete &&
                        <ModalDelete />
                    }
                </div>
            </div>
        </>

    )
}

export default ListProduct