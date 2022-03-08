function CateController(){
    function CheckInfo(name){
        if(name === ''){
            return false
        }
        return true
    }
    return {CheckInfo}

}
export default CateController