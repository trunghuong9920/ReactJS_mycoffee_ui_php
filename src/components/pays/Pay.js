import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import config from '../../_config';

const namelists = ['STT', 'Hình ảnh', 'Tên món', 'Mã món', 'Số lượng', 'Đơn giá (VNĐ)', 'Chiết khấu (%)', 'Giờ vào', 'Thành tiền (VNĐ)', 'Lựa chọn']
function Pay({ showPay, hide, idB, nameTable, notifyPay }) {
    const port = config()
    const [listOrder, setListOrder] = useState([])
    const [totalAllOrder, setTotalAllOrder] = useState(0)
    const [discountPay, setDiscountPay] = useState(0)
    const [itemValueChecked, setItemValueChecked] = useState([])

    useEffect(() => {
        const api = port + "/orders?idB=" + idB
        fetch(api)
            .then(res => res.json())
            .then(datas => {
                setListOrder(datas)
                const newData = []
                datas.map(item =>{
                    newData.push(item.id)
                })
                setItemValueChecked(newData)
            })
    }, [showPay])
    const handleChecked = (id) => {
        setItemValueChecked(prev => {
            const isChecked = itemValueChecked.includes(id)             //true or false
            if (isChecked) {
                return itemValueChecked.filter(item => item != id)
            }
            else {
                return [...prev, id]
            }
        })
    }

    const printInvoice = () => {
        notifyPay()
        hide()
    }
    function totalPrice(amount, discount, price) {
        return (amount * price) - (((amount * price) / 100) * discount)
    }
    function totalWillPay() {
        return totalAllOrder - (totalAllOrder / 100 * discountPay)
    }
    useEffect(() => {
        let totalPriceItem = 0
        setTotalAllOrder(0)
        listOrder.map(item => {
            const CheckPay = document.getElementById(`pay_checkbox-${item.id}`)

            if(CheckPay){
                if(CheckPay.checked === true){
                    totalPriceItem += totalPrice(item.amount, item.discount, item.price);
                }
            }
        })
        setTotalAllOrder(totalPriceItem)
    }, [itemValueChecked])

    function ListPay({ listOrder }) {
        return (
            listOrder.map((item, index) => (

                <label htmlFor={`pay_checkbox-${item.id}`} key={index} className="pay_body-table_col"
                >
                    <div><h3 className="pay_body-table_col-boxvalue">
                        {index + 1}
                    </h3></div>
                    <div className='pay_body-table_col-img'><img src={item.img} alt='photo' /></div>
                    <div><h3 className="pay_body-table_col-boxvalue pay_body-table_col-name">
                        {item.name}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue">
                        {item.idP}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue">
                        {item.amount}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue pay_body-table_col-price">
                        {item.price}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue">
                        {item.discount}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue pay_body-table_col-time">
                        {item.timeIn}
                    </h3></div>
                    <div><h3 className="pay_body-table_col-boxvalue pay_body-table_col-price">
                        {totalPrice(item.amount, item.discount, item.price)}
                    </h3></div>
                    <div>
                        <input
                            type={"checkbox"}
                            className="pay_checkbox"
                            checked={itemValueChecked.includes(item.id)}
                            id={`pay_checkbox-${item.id}`}
                            onChange={() => handleChecked(item.id)}
                        />
                    </div>

                </label>
            ))
        )
    }
    return (
        <div className="Pay ">
            {
                showPay &&
                <>

                    <div className="overlay" htmlFor='check_overlay'></div>
                    <div className="pay-box">
                        <div className="pay-box_title">
                            <h3><i className='ti-tablet'></i> Bàn {nameTable}:</h3>
                            <button
                                className="pay-box_btnBack"
                                onClick={hide}
                            >
                                <i className="ti-back-right"></i>
                                Trở về
                            </button>
                        </div>
                        <div className="pay-box_body">
                            <div className="pay-box_body-top">
                                <div className='pay-box_body-title'>
                                    {
                                        namelists.map((item, index) => (
                                            <span key={index}>
                                                <h3>{item}</h3>
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className='pay-box_body-table'>
                                    <ListPay listOrder={listOrder} />
                                </div>
                            </div>
                            <div className="pay-box_body-bottom">
                                <div className="pay-box_bottom-left">
                                    <div className="pay-box_bottom-box">
                                        <div className="pay-box_bottom-item">
                                            <h2 className="pay-box_bottom-title">Tổng tiền (VNĐ):</h2>
                                            <span>{totalAllOrder}</span>
                                        </div>
                                        <div className="pay-box_bottom-item">
                                            <h2 className="pay-box_bottom-title">Chiết khấu (%):</h2>
                                            <input type="number"
                                                value={discountPay}
                                                onChange={e => setDiscountPay(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="pay-box_bottom-box">
                                        <div className="pay-box_bottom-item">
                                            <h2 className="pay-box_bottom-title">Tổng tiền thanh toán (VNĐ):</h2>
                                            <span>{totalWillPay()}</span>
                                        </div>
                                        <div className="pay-box_bottom-item">
                                            <h2 className="pay-box_bottom-title">Tổng tiền chiết khấu (VNĐ):</h2>
                                            <span>{totalAllOrder - totalWillPay()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pay-box_bottom-right">
                                    <div className="pay-box_bottom-right_item">
                                        <button onClick={hide}>Tạm tính</button>
                                    </div>
                                    <div className="pay-box_bottom-right_item">
                                        <button onClick={printInvoice}>In hóa đơn</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default Pay