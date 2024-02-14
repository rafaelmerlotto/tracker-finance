import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { authService } from '../services'


export default function Overview() {



  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true)
  //   }, 1000)
  // })

  useEffect(() => {
    if(authService.currencyActual === undefined){
        localStorage.setItem("currency", "USD")
    }    
    if (localStorage.getItem("currency") === "USD") {
        authService.currencyActual = "USD"
        return localStorage.setItem("currency", authService.currencyActual)
    }
    if (localStorage.getItem("currency") === "EUR") {
        authService.currencyActual = "EUR"
        return localStorage.setItem("currency", authService.currencyActual)
    }
    if (localStorage.getItem("currency") === "BRL") {
        authService.currencyActual = "BRL"
        return localStorage.setItem("currency", authService.currencyActual)
    }
    if (localStorage.getItem("currency") === "INR") {
        authService.currencyActual = "INR"
        return localStorage.setItem("currency", authService.currencyActual)
    }
    if (localStorage.getItem("currency") === "GBP") {
        authService.currencyActual = "GBP"
        return localStorage.setItem("currency", authService.currencyActual)
    }
},[])
  


  return (
    <div className='flex  '>
      <Sidebar />
        <Main />    
    </div>
  )
}
