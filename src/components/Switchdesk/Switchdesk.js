import { useState, useEffect } from 'react'

import './style.scss'
import config from '../../_config'
import { type } from '@testing-library/user-event/dist/type'
import clsx from 'clsx'


const listArea = ["Ngoài sân", "Tầng 1", "Tầng 2"]
function Switchdesk({showSwitchDesk, idB, hide, nameTable }) {
    const port = config()
    const [area, setArea] = useState("Ngoài sân")
    const [data, setData] = useState([])
    const [listOrder, setListOrder] = useState([])

    const handleClickTable = () =>{
        
    }

    useEffect(() => {
        const api = port + "/tables?area=" + area
        fetch(api)
            .then(res => res.json())
            .then(datas => {
                setData(datas.filter(item => item.id != idB))
            })
    }, [area])

    useEffect(() => {
        const api = port + "/orders?idB=" + idB
        fetch(api)
            .then(res => res.json())
            .then(datas => {
                setListOrder(datas)
            })
    }, [showSwitchDesk])
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
                                    <li className='switchdesk-box_body_left_list_item'>
                                        <button className={clsx('switchdesk-box_body_left_list_item_link', 
                                            item === area ? {
                                                'switchdesk-box_btn-active': true
                                            } : {
                                                'switchdesk-box_btn-active' : false
                                            }
                                        )}
                                            onClick={() => setArea(item)}
                                        >
                                            <i>></i><h3>{item}</h3>
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
                                    onClick={handleClickTable}
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