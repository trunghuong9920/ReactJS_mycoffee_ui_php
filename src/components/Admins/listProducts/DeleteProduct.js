import './style.scss'
import config from '../../../_config'
import ApiController from '../../../services/apiController'

function DeleteProduct({ idEdit, hide , handleReloadForDelete}) {
    const port = config()
    const {deleteData} = ApiController()
    const handleSave = () =>{
        const api = port + "/products/delete"
        const formData = new FormData()
        formData.append("id",idEdit)

        deleteData(api, formData)

        handleReloadForDelete()
        hide()
    }
    return (
        <>
            <div className="modal">
                <div className="modal_header">
                    <h1>Xóa thông tin sản phẩm</h1>
                </div>
                <div className="modal_body">
                    <h1 className='deleteValue'>Thông tin sản phẩm {idEdit} sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>

                </div>
                <div className="modal_footer">
                    <div className='modal_footer_error'>
                        <h3></h3>
                    </div>
                    <div className="modal_footer_groupbtn">
                        <button
                            onClick={handleSave}
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
            </div>
        </>
    )
}
export default DeleteProduct