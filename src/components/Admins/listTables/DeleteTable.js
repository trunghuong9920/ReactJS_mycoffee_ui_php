import './style.scss'
import ApiController from '../../../services/apiController'
import config from '../../../_config'

function DeleteTable({ id , hide , handleReloadForDelete}) {
    const {create, editData,deleteData}  = ApiController()
    const port = config()

    const handleSaveDeleteTable = () =>{
        const api = port + "/tables"
        deleteData(api, id)
        handleReloadForDelete(id)
        hide()
    }

    return (
        <>
            <div className="modal_body">
                <h1 className='deleteValue'>Thông tin bàn {id} sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>

            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'>
                    <h3></h3>
                </div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveDeleteTable}
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
export default DeleteTable