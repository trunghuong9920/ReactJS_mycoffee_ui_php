import { useState, useEffect } from 'react'

import './styleDetail.scss'
import config from '../../../_config'
import nodrink from '../../../images/nodrink.jpg'

const listCategorys = ["Stt", "Ảnh", "Tên sản phẩm", "Mã sản phẩm", "Đơn giá (VNĐ)", "Số lượng", "Giảm giá (%)", "Thời gian vào", "Trạng thái", "Tổng tiền (VNĐ)"]

function Detail({ idBill, hide, discountAll }) {
    const [data, setData] = useState([])
    const port = config()
    const [totailAll, setTotailAll] = useState(0)

    const api = port + "/statistical/getinvoicebill?idbill=" + idBill

    const options = {
        method: "GET"
    }
    fetch(api, options)
        .then(res => res.json())
        .then(data => {
            setData(data)
            let newTotal = 0
            data.map(item => {
                newTotal += totalPrice(item.amount, item.discount, item.price)
            })
            setTotailAll(newTotal)
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function totalPrice(amount, discount, price) {
        return (amount * price) - (((amount * price) / 100) * discount)
    }
    return (
        <>
            <div className="modal_detail_body">
                <div className="modaldetail">
                    <div className="modaldetail_category modaldetail_category-active">
                        {
                            listCategorys.map((item, index) => (
                                <div className="modaldetail_category_col"
                                    key={index}
                                >
                                    <h3>{item}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <div className="modaldetail_category_body">
                        {
                            data.map((item, index) => (
                                <div key={index} className="modaldetail_category">
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{index + 1}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <img src={item.img || nodrink} alt="avata" />
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.name}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.idproduct}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.price}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.amount}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.discount}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{item.timein}</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{
                                            item.status == 0 ? "Chưa thanh toán" : "Đã thanh toán"
                                        }</h3>
                                    </div>
                                    <div className="modaldetail_category_col"
                                    >
                                        <h3 className="modaldetail_body_col_value">{
                                            totalPrice(item.amount, item.discount, item.price)
                                        }</h3>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='modaldetail_bodytotail'>
                            <div className='modaldetail_bodytotail-form'>
                                <h3 className='modaldetail_bodytotail-form-title'>Tổng tiền (VNĐ): </h3>
                                <h3 className='modaldetail_bodytotail-form-value'>{totailAll}</h3>
                            </div>
                            <div className='modaldetail_bodytotail-form'>
                                <h3 className='modaldetail_bodytotail-form-title'>Giảm giá (%): </h3>
                                <h3 className='modaldetail_bodytotail-form-value'>{discountAll} </h3>
                            </div>
                            <div className='modaldetail_bodytotail-form'>
                                <h3 className='modaldetail_bodytotail-form-title'>Tổng tiền thanh toán (VNĐ): </h3>
                                <h3 className='modaldetail_bodytotail-form-value'>{totailAll - (totailAll*discountAll/100)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal_detail_footer">
                <div className='modal_detail_footer_error'>

                </div>
                <div className="modal_detail_footer_groupbtn">
                    <button
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
export default Detail