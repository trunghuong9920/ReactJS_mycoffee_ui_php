function TableController() {
    function checkTable(name){
        if(name === '') return false
        return true
    }
    return {checkTable}
}
export default TableController