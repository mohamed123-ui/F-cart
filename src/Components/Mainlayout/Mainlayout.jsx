import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import syle from'./Mainlayout.module.css'
import Footer from '../Footer/Footer'
export default function Mainlayout() {
  return (
   <>
  
   <Navbar />
  <div className='container mx-auto'> <Outlet/></div>
   </>
    

  )
}
