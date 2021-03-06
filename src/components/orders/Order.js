import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { ToastContainer, toast } from 'react-toastify';

import './style.css'
import Pay from '../pays/Pay'
import Switchdesk from '../Switchdesk/Switchdesk'
import useModal from '../pays/useModal'
import 'react-toastify/dist/ReactToastify.css';
import config from '../../_config'
import ApiController from '../../services/apiController';
import nodrink from '../../images/nodrink.jpg'

const namelists = ['STT', 'Hình ảnh', 'Tên món', 'Mã món', 'Số lượng', 'Đơn giá (VNĐ)', 'Chiết khấu (%)', 'Giờ vào', 'Thành tiền (VNĐ)', 'Thao tác']


function Order() {
    const port = config()
    const { create, editData, deleteData } = ApiController()
    const location = useLocation()
    const Navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const idB = query.get("idB")
    const [idBill, setIdbill] = useState('')

    let numberClickNext = 0
    const [showSwitchDesk, setShowSwitchDesk] = useState(false)
    const [countNext, setCountNext] = useState(1)
    const [tabCate, setTabcate] = useState()
    const [tabNext, setTabNext] = useState(0)
    const [getCategorys, setGetCategorys] = useState([])
    const [getProduct, setGetProduct] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [reloadApiOrder, setReloadApiOrder] = useState(false)
    const [nameTable, setNameTable] = useState('')
    const [totalAllOrder, setTotalAllOrder] = useState(0)
    const [search, setSearch] = useState('')
    const [showPay , setShowPay] = useState(false)

    const handleAddOrder = (item) => {
        if (idBill) {
            const today = new Date()
            const timeIn = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            reloadForAddNewOrder(item, timeIn)
            const formData = new FormData()
            formData.append("idbill", idBill)
            formData.append("idp", item.id)
            formData.append("timein", timeIn)

            const api = port + "/orders/add"
            create(api, formData)
        }
        else {
            console.log("No bill");
        }
    }
    const handleUpdateAmountOrder = (value, item) => {
        if (value != '') {
            if (value > 0) {
                const data = [...listOrder]
                const newData = data.map(
                    it => {
                        if (it.id === item.id) {
                            it.amount = value
                            console.log(it.idp);
                        }
                        
                        return it
                    }

                )
                setListOrder(newData)
                const formData = new FormData()
                formData.append("id", item.id)
                formData.append("amount", value)

                const api = port + "/orders/updateamount"
                editData(api, formData)

            }
            else {
                const data = [...listOrder]
                const newData = data.map(
                    it => {
                        if (it.id === item.id) {
                            it.amount = 1
                        }
                        return it
                    }
                )
                setListOrder(newData)
                const formData = new FormData()
                formData.append("id", item.id)
                formData.append("amount", 1)
                const api = port + "/orders/updateamount"
                editData(api, formData)
            }
        }

    }

    const handleUpdateDiscountOrder = (value, item) => {
        if (value != '') {
            const data = [...listOrder]
            const newData = data.map(
                it => {
                    if (it.id == item.id) {
                        it.discount = value
                    }
                    return it
                }

            )
            setListOrder(newData)
            const formData = new FormData()
            formData.append("id", item.id)
            formData.append("discount", value)
            const api = port + "/orders/updatediscount"
            editData(api, formData)
        }

    }
    const handleDeleteOrder = (id, name) => {
        if (id) {
            const formData = new FormData()
            formData.append("id", id)
            const api = port + "/orders/delete"
            editData(api, formData)

            notifyForDeleteOrder(name)
            reloadDeleteOrder(id)
        }
        else {
            notifyReloadForDelete()
            setReloadApiOrder(!reloadApiOrder)
        }
    }
    function reloadDeleteOrder(id) {
        setListOrder(listOrder.filter(item => item.id != id))
    }
    function reloadForAddNewOrder(item, timeIn) {
        const data = [...listOrder]
        const newData = {
            "idB": idB,
            "img": item.img,
            "name": item.name,
            "idp": item.id,
            "amount": 1,
            "price": item.price,
            "discount": 0,
            "timein": timeIn
        }
        data.push(newData)
        setListOrder(data)
    }

    useEffect(() => {
        const api = port + "/tables/getone?id=" + idB
        fetch(api)
            .then(res => res.json())
            .then(datas => {

                datas.map(item => {
                    setNameTable(item.name)
                })
            })
    }, [])

    useEffect(() => {
        if (idB) {
            const api = port + "/orders/getall?idb=" + idB
            fetch(api)
                .then(res => res.json())
                .then(datas => {
                    setListOrder(datas)
                })
        }
    }, [reloadApiOrder])

    useEffect(() => {
        if (idB) {
            const api = port + "/orders/getbill?idb=" + idB
            fetch(api)
                .then(res => res.json())
                .then(datas => {
                    if (datas.length > 0) {
                        setIdbill(datas[0].id)
                    }
                    else {
                        const api1 = port + "/pay/getall"
                        fetch(api1)
                            .then(res => res.json())
                            .then(datas => {
                                const iduser = localStorage.getItem("idaccount")
                                const api = port + "/pay/addbill"

                                const formData = new FormData()
                                formData.append("idtable", idB)
                                formData.append("iduser", iduser)
                                formData.append("id", parseInt(datas[datas.length - 1].id) + 1)
                                formData.append("status", '0')
                                formData.append("timeout", '')

                                create(api, formData)
                                Navigate("/")
                            })

                    }
                })
        }
    }, [])

    useEffect(() => {
        let totalPriceItem = 0
        setTotalAllOrder(0)
        listOrder.map(item => {
            totalPriceItem += totalPrice(item.amount, item.discount, item.price);
        })
        setTotalAllOrder(totalPriceItem)
    }, [listOrder])

    useEffect(() => {
        if (search === '') {
            const api = port + "/products/getfromidc?idc=" + tabCate
            fetch(api)
                .then(res => res.json())
                .then(datas => {
                    setGetProduct(datas)
                })
        }
        else {
            const api = port + "/orders/searchproduct?qsearch=" + search
            fetch(api)
                .then(res => res.json())
                .then(datas => {
                    setGetProduct(datas)
                })
        }

    }, [tabCate, search])

    useEffect(() => {
        const api = port + "/categorys/getall"
        fetch(api)
            .then(res => res.json())
            .then(datas => {
                setGetCategorys(datas)
                setTabcate(datas[0].id)
            })
    }, [])

    numberClickNext = getCategorys.length / 4

    const handlePrev = () => {
        if (tabNext < 0) {
            setTabNext(tabNext + 400)
            setCountNext(countNext - 1)
        }
    }
    const handleNext = () => {
        if (countNext < numberClickNext) {
            setTabNext(tabNext - 400)
            setCountNext(countNext + 1)
        }
    }
    const handleShowSwitchDesk = () => {
        if (listOrder.length > 0) {
            setShowSwitchDesk(!showSwitchDesk)
        }
    }

    const handleShowPay =() => {
        if (listOrder.length > 0) {
            setShowPay(!showPay)
        }
    }

    const notifyForDeleteOrder = (name) =>
        toast.success(`Xóa sản phẩm ${name} thành công!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    const notifyCB = () =>
        toast.success(`Báo chế biến thành công!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    const notifyPay = () =>
        toast.success(`Thanh toán thành công!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    const notifyReloadForDelete = () =>
        toast.success(`Xóa thất bại vui lòng thử lại!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    function totalPrice(amount, discount, price) {
        const tt = (amount * price) - (((amount * price) / 100) * discount)
        return tt
    }


    function ListOrder({ lists }) {
        return (
            lists.map((item, index) => (
                <tr key={index} className="list_order-table_col">
                    <td><h3 className="list_order-table_col-boxvalue">
                        {index + 1}
                    </h3></td>
                    <td>
                        <span className="list_order-table_col-boximg">
                            <img src={item.img || nodrink} alt='photo' />
                        </span>
                    </td>
                    <td><h3 className="list_order-table_col-boxvalue list_order-table_col-name">
                        {item.name}
                    </h3></td>
                    <td><h3 className="list_order-table_col-boxvalue">
                        {item.idp}
                    </h3></td>
                    <td>
                        <input className='list_order-table_col-number'
                            defaultValue={item.amount}
                            type="number"
                            min="1"
                            onChange={e => handleUpdateAmountOrder(e.target.value, item)}
                        /></td>
                    <td><h3 className="list_order-table_col-boxvalue list_order-table_col-price">
                        {item.price}
                    </h3></td>
                    <td>
                        <input className='list_order-table_col-discount'
                            defaultValue={item.discount}
                            type="number"
                            onChange={e => handleUpdateDiscountOrder(e.target.value, item)}
                        />
                    </td>
                    <td><h3 className="list_order-table_col-boxvalue list_order-table_col-time">
                        {item.timein}
                    </h3></td>
                    <td><h3 className="list_order-table_col-boxvalue list_order-table_col-price">
                        {
                            totalPrice(item.amount, item.discount, item.price)
                        }
                    </h3></td>
                    <td>
                        <div className="operation-order">
                            <span className="operation-order_close"
                                onClick={() => {
                                    handleDeleteOrder(item.id, item.name)
                                }
                                }
                            >
                                <i className='ti-close'>
                                </i>
                            </span>
                        </div>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div className="order_main">
            <div className="order_header">
                <Link to="/" className="order_header-link">
                    <i className="ti-home order_header-link_icon"></i>
                    Trang chủ
                </Link>
                <i className="order_header-icon">/</i>
                <Link to="/order" className="order_header-link">
                    Bàn {nameTable}
                </Link>
            </div>
            <div className="grid">
                <div className="row order_body">
                    <div className="col l-10">
                        <div className='order_body-left'>
                            <div className='order_body-list_order'>
                                <div className='list_order-table_tile'>
                                    {
                                        namelists.map((item, index) => (
                                            <span key={index}>
                                                <h3>{item}</h3>
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className="list_order-table_body">
                                    <table className="list_order-table">
                                        <tbody>
                                            <ListOrder
                                                lists={listOrder}

                                            />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='order_body-list_product'>
                                <div className="order-list_product-header">
                                    <h2 className="order-list_product-header_name"><i className='ti-align-justify'></i> Danh mục thức uống</h2>
                                    <div className='order-list_product-header_search'>
                                        <i className='ti-search'></i>
                                        <input className=""
                                            placeholder='Nhập để tìm món'
                                            type="text"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="order-list_product-body">
                                    <div className="order-list_product-tabs_left"
                                        onClick={handlePrev}
                                    >
                                        <i className='ti-angle-left'></i>
                                    </div>
                                    <ul className="order-list_product-tabs">
                                        {
                                            getCategorys.map(item => (
                                                <li key={item.id}
                                                    className="order-list_product-item"
                                                    style={{
                                                        transform: `translateX(${tabNext}%)`,
                                                        transition: 'transform .3s linear 0s'
                                                    }}
                                                >
                                                    <span
                                                        className={clsx('order-list_product-btn',
                                                            tabCate === item.id ? {
                                                                'order-list_product-btn_active': true
                                                            } : {
                                                                'order-list_product-btn_active': false
                                                            }
                                                        )}
                                                        onClick={() => setTabcate(item.id)}
                                                    >
                                                        <i><FontAwesomeIcon icon="fa-solid fa-champagne-glasses" /></i>
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="order-list_product-tabs_right"
                                        onClick={handleNext}
                                    >
                                        <i className='ti-angle-right'></i>
                                    </div>
                                    <div className="order-list_product-listProduct">
                                        {
                                            getProduct.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="order-list_product-listProduct_btn"
                                                    onClick={() => handleAddOrder(item)}
                                                >
                                                    <h4>
                                                        {item.name}
                                                    </h4>
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2">
                        <ul className="order_right">
                            <li className="order_right-item order_rigth-boxshardow">
                                <button className="order_right-link "
                                    onClick={() => setReloadApiOrder(!reloadApiOrder)}
                                >
                                    <h3

                                    >Cập nhật</h3>
                                </button>
                            </li>
                            <li className="order_right-item order_rigth-boxshardow">
                                <button className="order_right-link"
                                    onClick={handleShowSwitchDesk}
                                >
                                    <h3>Chuyển bàn</h3>
                                </button>
                            </li>

                            <li className="order_right-item order_right-item-totalprice">
                                <h3 className="order_right-item_tile">Tổng tiền (VNĐ):</h3>
                                <input readOnly={true}
                                    value={totalAllOrder}
                                />
                            </li>
                            <li className="order_right-item order_rigth-boxshardow">
                                <button
                                    className="order_right-link "
                                    onClick={handleShowPay}
                                >
                                    <h3>Thanh toán</h3>
                                </button>
                            </li>
                            <li className="order_right-item order_rigth-boxshardow">
                                <button className="order_right-link "
                                    onClick={notifyCB}
                                >
                                    <h3>Báo chế biến</h3>
                                </button>
                            </li>
                            <li className="order_right-item order_rigth-boxshardow">
                                <Link to="/" className="order_right-link">
                                    <h3>Về trang chủ</h3>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                <Pay
                    showPay={showPay}
                    hide={handleShowPay}
                    idB={idB}
                    nameTable={nameTable}
                    notifyPay={notifyPay}
                />
            }
            {
                showSwitchDesk &&
                <Switchdesk
                    showSwitchDesk={showSwitchDesk}
                    idB={idB}
                    hide={handleShowSwitchDesk}
                    nameTable={nameTable}
                />
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Order