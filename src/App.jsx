import { useState , lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router , Routes ,Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast'
import Loader from './components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import { getUser } from './redux/api/userApi'
import { auth } from './firebase'
import Apichecker from './pages/Admin Dashboard/Apichecker'
import PageNotfound from './pages/PageNotfound'
import CartItems from "./pages/CartItem"

// import ProductDetails from './components/ProductDetails'


const Home = lazy(()=> import("./pages/page1"))
const SingleCategory =lazy(() =>import("./pages/singleCategory"))
const SearchProducts = lazy(() => import("./pages/searchProducts"))
const CreateProduct = lazy(() =>import("./pages/Admin Dashboard/createProducts"))
const UpdateProduct = lazy(() => import("./pages/Admin Dashboard/UpdateProduct"))

const  UpdateSingleP = lazy(() => import("./pages/Admin Dashboard/updateSingleP"))


const ProductDetails = lazy(() => import("./components/ProductDetails"))

function App() {


  const { user , loading} = useSelector((state) => state.userReducer) || {};
const dispatch = useDispatch();


useEffect(() =>{

  onAuthStateChanged(auth, async(user) =>{
    if(user) {
      const data = await getUser(user.uid)
      console.log("logged in")
      dispatch(userExist(data.user))
    }

    else{
      dispatch(userNotExist())
      console.log("user not logged in ")
    }
  })

},[])



const AdminRoute = ({ element }) => {
console.log("userrole" , user?.role)
  if(user?.role == "admin"){
    return element
  }
  else{
    return <p className='mt-[20vh]'>page doesnt occur</p>
  }

};


  return (
    <>

    <Router>
      <Navbar/>
      <Suspense fallback={<div><Loader/></div>}>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/productdetails/:id" element={<ProductDetails/>}/>
  <Route path="/category/:cat" element={<SingleCategory/>}/>
  <Route path="/loader" element={<Loader/>}/>
  <Route path="/all" element={<SearchProducts/>}/>

{/* admin routes */}

<Route path="/check" element={<Apichecker/>}/>

<Route path="/newproduct" element={<AdminRoute element={<CreateProduct />} />} />
  <Route path="/updateproduct" element={<AdminRoute element={<UpdateProduct/>} />}/>
  <Route path="/updatesingleproduct/:id" element={<AdminRoute element={<UpdateSingleP/>} />}/>
  <Route path="/cart" element={<CartItems/>}/>




<Route path="*" element={<PageNotfound/>} />

</Routes>
</Suspense>
<Toaster position='bottom-center'/>


    </Router>
    
    </>
  )
}

export default App
