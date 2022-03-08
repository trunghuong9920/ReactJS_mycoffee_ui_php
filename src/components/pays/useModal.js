import { useState } from 'react';
function useModal(){
  const[showPay, setShowPay] = useState(false)

  const handleShowPay = () => {
    setShowPay(!showPay)
  }

  return{
    showPay,
    handleShowPay
  }

}
export default useModal