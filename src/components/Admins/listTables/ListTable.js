import { useState, useEffect } from "react"

import "./style.scss"
import AddTable from './AddTable'
import EditTable from "./EditTable"
import DeleteTable from "./DeleteTable"
import config from "../../../_config"

function ListTable() {
    const port = config();
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const [getData, setGetData] = useState([])
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

    const lastItem = getData[getData.length - 1]
    const handleReloadForAdd = (formData) => {
        const data = [...getData]
        const newData = {
            id: parseInt(lastItem.id) + 1,
            name: formData.name,
            status: formData.status,
            area: formData.area
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
                    item.area = formData.area
                }
                return item
            }
        )
        setGetData(newData)
    }

    const handleReloadForDelete = (newId) => {
        setGetData(getData.filter(item => item.id !== newId))
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

    //Load data
    useEffect(() => {
        if (search === '') {
            const api = port + '/tables'
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
        else{
            const api = port + '/search/tables?qsearch='+search
         
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
                        <h1>Thêm bàn:</h1>
                    </div>
                    <AddTable hide={handleAdd} handleReloadForAdd={handleReloadForAdd} />
                </div>
            </>
        )
    }

    function ModalEdit() {
        return (
            <>
                <div className="modal">
                    <div className="modal_header">
                        <h1>Chỉnh sửa thông tin bàn</h1>
                    </div>
                    <EditTable
                        idEdit={idEdit}
                        hide={handleEdit}
                        handleReloadForEdit={handleReloadForEdit}
                    />

                </div>
            </>
        )
    }

    function ModalDelete() {
        return (
            <>
                <div className="modal">
                    <div className="modal_header">
                        <h1>Xóa thông tin bàn</h1>
                    </div>
                    <DeleteTable
                        id={idEdit}
                        hide={handleDelete}
                        handleReloadForDelete={handleReloadForDelete}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="colRight_header">
                <div className="colRight_header_left">
                    <h2>Danh mục bàn</h2>
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
                <div className="listTable">
                    <div className="listTable_title">
                        <div className="listTable_title_col">
                            <h3 className="listTable_title_col_value">Id</h3>
                        </div>
                        <div className="listTable_title_col">
                            <h3 className="listTable_title_col_value">Tên Bàn</h3>
                        </div>
                        <div className="listTable_title_col">
                            <h3 className="listTable_title_col_value">Trạng Thái</h3>
                        </div>
                        <div className="listTable_title_col">
                            <h3 className="listTable_title_col_value">Khu vực</h3>
                        </div>
                        <div className="listTable_title_col">
                            <h3 className="listTable_title_col_value">Thao tác</h3>
                        </div>
                    </div>
                    <div className="listTable_body">
                        {
                            newData.map((item, index) => (
                                <div key={index} className="listTable_body_row">
                                    <div className="listTable_body_row_col">
                                        <h3 className="listTable_body_row_col_value">{item.id}</h3>
                                    </div>
                                    <div className="listTable_body_row_col">
                                        <h3 className="listTable_body_row_col_value">{item.name}</h3>
                                    </div>
                                    <div className="listTable_body_row_col">
                                        <h3 className="listTable_body_row_col_value">{
                                            item.status == 0 ? 'Trống' : 'Có người'
                                        }</h3>
                                    </div>
                                    <div className="listTable_body_row_col">
                                        <h3 className="listTable_body_row_col_value">{
                                            item.area == 0 ? 'Ngoài sân' : item.area == 1 ? 'Tầng 1' :'Tầng 2' 
                                        }</h3>
                                    </div>
                                    <div className="listTable_body_row_col">
                                        <div className="listTable_body_row_col_control">
                                            <button className="listTable_body_row_col_control-edit"
                                                onClick={() => handleEdit(item.id)}
                                            ><i className="ti-pencil-alt"></i></button>
                                            <button className="listTable_body_row_col_control-delete"
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
                        <ModalEdit
                        />
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
export default ListTable