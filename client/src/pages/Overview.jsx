import React from 'react'
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

  console.log(authService.currencyActual)

  return (
    <div className='flex '>
      <Sidebar />
        <Main />    
    </div>
  )
}
