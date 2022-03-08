function AccountController(){
    function CheckInfo (account,name,phone,password,confirmPass) {
        if(account.replace(/\s+/g, '') ==='') return false
        if(name ==='') return false
        if(phone ==='') return false
        if(password.replace(/\s+/g, '') === '') return false
        if(confirmPass.replace(/\s+/g, '') === '') return false
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