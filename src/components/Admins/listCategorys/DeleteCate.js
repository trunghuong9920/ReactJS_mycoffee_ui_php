import ApiController from '../../../services/apiController'
import config from '../../../_config'

import './style.scss'

function DeleteCate({ id, hide, handleReloadForDelete }) {
    const port = config()
    const {deleteData} = ApiController()

    const handleSave = () => {
        const api = port + "/categorys"
        deleteData(api, id)
        handleReloadForDelete(id)
        hide()
    }

    return (
        <>
            <div className="modal">
                <div className="modal_header">
                    <h1>Chỉnh sửa loại sản phẩm</h1>
                </div>
                <div className="modal_body">
                    <h1 className='deleteValue'>Thông tin loại sản phẩm {id} xóa sẽ không thể phục hồi! Nhấn lưu để tiếp tục</h1>

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
export default DeleteCate