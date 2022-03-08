import {useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
function Logout(){
    const Navigate = useNavigate()
    useEffect(() =>{
        localStorage.removeItem("account");
        Navigate('/login')
    },[])
    return(
        <>
        </>
    )
}
export default Logout