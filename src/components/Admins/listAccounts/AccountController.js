function AccountController(){
    function CheckInfo (account,name,phone,password,confirmPass) {
        if(account ==='') return false
        if(name ==='') return false
        if(phone ==='') return false
        if(password === '') return false
        if(confirmPass === '') return false
        return true
    }
    function CheckInfoEdit (account,name,phone) {
        if(account ==='') return false
        if(name ==='') return false
        if(phone ==='') return false
        return true
    }

    return {CheckInfo,CheckInfoEdit}
}
export default AccountController