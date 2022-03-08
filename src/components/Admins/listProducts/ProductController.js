function ProductController() {
    function CheckInfo(name, price) {
        if(name === '') return false
        if(price === '') return false
        return true
    }
    return {CheckInfo}
}
export default ProductController