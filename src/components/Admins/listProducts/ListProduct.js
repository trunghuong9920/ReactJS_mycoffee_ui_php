import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"

import './style.scss'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import config from '../../../_config'
import nodrink from '../../../images/nodrink.jpg'

function ListProduct() {
    const port = config()
    const [getData, setGetData] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const [search, setSearch] = useState('')
    const [reload, setReload] = useState('')

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
    const handleReloadForAdd = () => {
        setReload(!reload)

    }

    const handleReloadForEdit = () => {
        setReload(!reload)

    }
    const handleReloadForDelete = () => {
        setReload(!reload)
    }
    //reload
    useEffect(() => {
        const api = port + '/products/getall'
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setGetData(data)
            })
    }, [reload])

    //Load data
    useEffect(() => {
        if (search === '') {
            const api = port + '/products/getall'
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
        else {
            const api = port + '/search/products?qsearch=' + search

            const options = {
                method: "GET"
            }
            fetch(api, options)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [search])

    function ModalAdd() {
        return (
            <>
                <div className="modal">
                    <div className="modal_header">
                        <h1>Th??m s???n ph???m:</h1>
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
                    <h2>Danh m???c s???n ph???m</h2>
                </div>
                <div className="colRight_header_right">
                    <div className="colRight_header_right_search">
                        <input
                            placeholder='T??m ki???m'
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
                            <h3 className="product_title_col_value">H??nh ???nh</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">T??n s???n ph???m</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Lo???i s???n ph???m</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Gi??</h3>
                        </div>
                        <div className="product_title_col">
                            <h3 className="product_title_col_value">Thao t??c</h3>
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
                                            src={item.img || nodrink}
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