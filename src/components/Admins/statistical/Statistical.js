import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import "./style.scss"
import "./styleDetail.scss"

import config from "../../../_config"
import clsx from "clsx"
import ApiController from "../../../services/apiController"
import Detail from "./Detail"

const listCategorys = ["Id", "Bàn", "Giảm giá", "Thời gian xuất", "Trạng thái", "Nhân viên", "Thao tác"]
function ListAccount() {
    const port = config()
    const [getData, setGetData] = useState([])
    const [showDetailBill, setShowDetailBill] = useState(false)
    const [idBill, setIdBill] = useState()
    const [search, setSearch] = useState('')
    const [discountAll, setDiscountAll] = useState(0)


    const [positionPage, setPositionPage] = useState(1)
    const [newData, setNewData] = useState([])
    let numberIteminPage = 10;
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
    const handleShowDetail = (id,discount) => {
        setIdBill(id)
        setShowDetailBill(!showDetailBill)
        setDiscountAll(discount)
    }

    //Load data
    useEffect(() => {
        if (search === '') {
            const api = port + '/statistical/getall'
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setGetData(data)
                })
        }
        else {
            const api = port + '/statistical/getallsearch?qsearch=' + search

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


    function ModalDetail() {
        return (
            <>
                <div className="modal_detail">
                    <div className="modal_detail_header">
                        <h1>Thông tin chi tiết hóa đơn</h1>
                    </div>
                    <Detail
                        idBill={idBill}
                        hide={handleShowDetail}
                        discountAll = {discountAll}
                    />

                </div>
            </>
        )
    }

    return (
        <>
            <div className="colRight_header">
                <div className="colRight_header_left">
                    <h2>Thống kê</h2>
                </div>
                <div className="colRight_header_right">
                    <div className="colRight_header_right_search">
                        <input
                            placeholder='Tìm kiếm'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                    </div>

                </div>
            </div>
            <div className="colRight_body">
                <div className="statistical">
                    <div className="statistical_category statistical_category-active">
                        {
                            listCategorys.map((item, index) => (
                                <div className="statistical_category_col"
                                    key={index}
                                >
                                    <h3>{item}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <div className="statistical_category_body">
                        {
                            newData.map((item, index) => (
                                <div key={index} className="statistical_category">
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{item.id}</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{item.nametable}</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{item.discount}</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{item.timeout}</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{
                                            item.status == 0 ? 'Chưa thanh toán' : 'Đã thanh toán'
                                        }</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <h3 className="statistical_body_col_value">{
                                            item.name
                                        }</h3>
                                    </div>
                                    <div className="statistical_category_col"
                                    >
                                        <div className="statistical_category_col-control">
                                            <button className="statistical_category_col-control-edit"
                                                onClick={() => handleShowDetail(item.id, item.discount)}
                                            ><i className="ti-eye"></i></button>
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
                        showDetailBill &&

                        <ModalDetail
                        />
                    }
                </div>
            </div>
        </>

    )
}
export default ListAccount