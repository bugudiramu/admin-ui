import {useLocation} from "react-router-dom"

const CategoryDetail = () => {
   const location = useLocation()
  return (
    <div>{location.pathname}</div>
  )
}

export default CategoryDetail