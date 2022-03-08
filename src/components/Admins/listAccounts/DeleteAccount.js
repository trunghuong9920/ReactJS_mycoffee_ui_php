import './style.scss'
import ApiController from '../../../services/apiController'
import config from '../../../_config'

function DeleteAccount({ idEdit , handleDelete, handleReloadForDelete }) {
    const port = config()
    const {deleteData} = ApiController()
    const handleSaveDelete = () =>{
        const api = port + "/users"
        deleteData(api,idEdit)  
        handleReloadForDelete(idEdit)
        handleDelete()
    }
    return (
        <>
            <div className="modal_body">
                <h1 className='deleteValue'>Nhân viên : {idEdit} đã xóa sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>
            </div>
            <div className="modal_footer">
                <div className='modal_footer_error'></div>
                <div className="modal_footer_groupbtn">
                    <button
                        onClick={handleSaveDelete}
                    >
                        <i className='ti-save'></i>
                    </button>
                    <button
                        onClick={handleDelete}
                    >
                        <i className='ti-back-right'></i>
                    </button>
                </div>
            </div>
        </>
    )
}
export default DeleteAccount