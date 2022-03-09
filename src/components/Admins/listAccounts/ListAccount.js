import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import "./style.scss"

import AddAccount from "./AddAccount"
import EditAccount from './EditAccount'
import DeleteAccount from "./DeleteAccount"
import config from "../../../_config"
import clsx from "clsx"

const listCategorys = ["Id", "Ảnh đại diện", "Tên tài khoản", "Tên nhân viên", "Số điện thoại", "Quyền truy cập", "Trạng thái", "Thao tác"]
function ListAccount() {
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
            id: parseInt(lastItem.id) + 1,
            account: formData.account,
            name: formData.name,
            phone: formData.phone,
            avata: formData.avata,
            status: 0,
        }
        data.push(newData)
        setGetData(data)
    }

    const handleReloadForEdit = (newid, formData) => {
        const data = [...getData];
        const newData = data.map(
            item => {
                if (item.id === newid) {
                    item.account = formData.account
                    item.name = formData.name
                    item.phone = formData.phone
                    item.avata = formData.avata
                    item.permission = formData.permission
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
            const api = port + '/users/getalldata'
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
        else {
            const api = port + '/search/user?qsearch='+search
           
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
                        <h1>Thêm tài khoản</h1>
                    </div>
                    <AddAccount hide={handleAdd} handleReloadForAdd={handleReloadForAdd} />
                </div>
            </>
        )
    }

    function ModalEdit() {
        return (
            <>
                <div className="modal">
                    <div className="modal_header">
                        <h1>Chỉnh sửa thông tin tài khoản</h1>
                    </div>
                    <EditAccount
                        idEdit={idEdit}
                        handleEdit={handleEdit}
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
                        <h1>Xóa thông tin tài khoản</h1>
                    </div>
                    <DeleteAccount
                        idEdit={idEdit}
                        handleDelete={handleDelete}
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
                    <h2>Danh mục tài khoản</h2>
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
                <div className="ListAccount">
                    <div className="ListAccout_category ListAccout_category-active">
                        {
                            listCategorys.map((item, index) => (
                                <div className="ListAccout_category_col"
                                    key={index}
                                >
                                    <h3>{item}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <div className="ListAccout_category_body">
                        {
                            newData.map((item, index) => (
                                <div key={index} className="ListAccout_category">
                                    <div className="ListAccout_category_col"
                                    >
                                        <h3 className="ListAccount_body_col_value">{item.id}</h3>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <img src={item.avata} alt="avata" />
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <h3 className="ListAccount_body_col_value">{item.account}</h3>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <h3 className="ListAccount_body_col_value">{item.name}</h3>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <h3 className="ListAccount_body_col_value">{item.phone}</h3>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <h3 className="ListAccount_body_col_value">{
                                            item.permission == 0 ? 'Quản lý' : 'Nhân viên'
                                        }</h3>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <div className="statusForm">
                                            <input
                                                type={"checkbox"}
                                                hidden={true}
                                                id={`statusForm-${item.id}`}
                                            />
                                            <label
                                                className={clsx('statusForm-unlock',
                                                    item.status == 0 ? {
                                                        'statusForm_activeUnlock': false
                                                    } : {
                                                        'statusForm_activeUnlock': true
                                                    }
                                                )}
                                                htmlFor={`statusForm-${item.id}`}
                                            ><i className="ti-unlock"></i></label>
                                            <label
                                                className={clsx('statusForm-lock',
                                                    item.status == 1 ? {
                                                        'statusForm_activeUnlock': false
                                                    } : {
                                                        'statusForm_activeUnlock': true
                                                    })}
                                                htmlFor={`statusForm-${item.id}`}
                                            ><i className="ti-lock"></i></label>
                                        </div>
                                    </div>
                                    <div className="ListAccout_category_col"
                                    >
                                        <div className="ListAccout_category_col-control">
                                            <button className="ListAccout_category_col-control-edit"
                                                onClick={() => handleEdit(item.id)}
                                            ><i className="ti-pencil-alt"></i></button>
                                            <button className="ListAccout_category_col-control-delete"
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
export default ListAccount