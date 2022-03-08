import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import config from '../../_config'
import './style.css'

const tabs = [
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

function Table() {
    const port = config()
    const [positon, setPosition] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {
        const api = port + "/tables"
        fetch(api)
            .then(res => res.json())
            .then(data => {
                const newData = []
                data.map(item => {
                    if(item.area == positon){
                        newData.push(item)
                    }
                })
                setData(newData)
            })

    }, [positon])

    return (
        <div className="table-main">
            <ul className='tabbar-top'>
                {tabs.map(tab => (
                    <li className='tabbar_item' key={tab.id}>
                        <button
                            className={clsx('tabbar_link',
                                positon === tab.id ? {
                                    'tabbar_link-active': true

                                } :
                                    {
                                        'tabbar_link-active': false
                                    }
                            )}

                            onClick={() => setPosition(tab.id)}
                        >
                            {tab.name}
                            <i className="tabbar_link-icon">
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                            </i>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="table-body">
                <div className="table-body_container">
                    {
                        data.map((item, index) => (

                            <div key={index} className={clsx('table_box', 'tableNoempty', {
                                'tableempty': item.status === '1',
                            })}>
                                <Link className="table_box-link" to={`/order?idB=${item.id}`}>{item.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Table