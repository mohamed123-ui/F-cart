import { Navigate } from 'react-router-dom'
export default function ProtecetedRouts({children}) {
if(localStorage.getItem("token")){
  return children
}
else{
  alert('you should login first')
 return  <Navigate to={"/login"} />
}
}
