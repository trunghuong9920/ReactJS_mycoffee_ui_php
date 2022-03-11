import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.scss'
import config from '../../_config'
import { type } from '@testing-library/user-event/dist/type'
import clsx from 'clsx'
import ApiController from '../../services/apiController'

const listArea = [
    {
        id: 0,
        name: 'Ngoài sân',
    },
    {
        id: 1,
        name: 'Tầng 1',
    }, {
        id: 2,
        name: 'Tầng 2',
    }
]
function Switchdesk({ showSwitchDesk, idB, hide, nameTable }) {
    const port = config()
    const [area, setArea] = useState('0')
    const [data, setData] = useState([])
    const [listOrder, setListOrder] = useState([])
    const { create, editData, deleteData } = ApiController()
    const Navigate = useNavigate()

    const handleClickTable = (item) => {
        const api = port + "/switchdesk/getonebill?idb=" + item.id
        fetch(api)
            .then(res => res.json())
            .then(data => {
                data.map(item => {
                    const api = port + "/switchdesk/updateinvoicebill"
                    listOrder.map(it => {
                        const formData = new FormData()
                        formData.append("id", it.id)
                        formData.append("idbill", item.id)

                        editData(api, formData)
                    })
                })
            })
        Navigate('/')
    }

    useEffect(() => {
        const api = port + "/tables/getall"
        fetch(api)
            .then(res => res.json())
            .then(data => {
                const newData = []
                data.map(item => {
                    if (item.area == area) {
                        newData.push(item)
                    }
                })
                setData(newData.filter(item => item.id != idB))
            })
    }, [area])

    useEffect(() => {
        const api = port + "/orders/getall?idb=" + idB
        fetch(api)
            .then(res => res.json())
            .then(datas => {
                setListOrder(datas)
            })
    }, [showSwitchDesk])
    console.log(listOrder);
    return (
        <>
            <div className="overlay">

            </div>
            <div className="Switchdesk">
                <div className="switchdesk-box_title">
                    <h3><i className='ti-tablet'></i> Bàn {nameTable}:</h3>
                    <button
                        className="switchdesk-box_btnBack"
                        onClick={hide}
                    >
                        <i className="ti-back-right"></i>
                        Trở về
                    </button>
                </div>
                <div className='switchdesk-box_body'>
                    <div className='switchdesk-box_body_left'>
                        <ul className='switchdesk-box_body_left_list'>
                            {
                                listArea.map((item, index) => (
                                    <li className='switchdesk-box_body_left_list_item' key={index}>
                                        <button className={clsx('switchdesk-box_body_left_list_item_link',
                                            item.id === area ? {
                                                'switchdesk-box_btn-active': true
                                            } : {
                                                'switchdesk-box_btn-active': false
                                            }
                                        )}
                                            onClick={() => setArea(item.id)}
                                        >
                                            <i>></i><h3>{item.name}</h3>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='switchdesk-box_body_right'>
                        {
                            data.map((item, index) => (
                                <button
                                    key={index}
                                    className='switchdesk-box_body_right_table'
                                    onClick={() => handleClickTable(item)}
                                >
                                    <h4>{item.name}</h4>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Switchdesk