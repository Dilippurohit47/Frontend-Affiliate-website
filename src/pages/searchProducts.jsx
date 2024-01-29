import React from 'react'
 import { useLocation} from "react-router-dom"
import { useSearchProductsQuery } from '../redux/api/productApi'
import Loader from '../components/loader'
import Product from '../components/Product'

const searchProducts = () => {


const location = useLocation()
const search = new URLSearchParams(location.search).get('search')

const {data ,isLoading} = useSearchProductsQuery(search)

  return (
    <>

 {
isLoading ? <Loader/> : (
    <>
        <div className='bg-white sm:mt-[60px] mt-[70px]  sm:h-[43vh] h-[38vh]  sm:pt-[2vh]  px-[10px]'>
{
data.products.length === 0 ? (
  <>
  <p className=' '> Oopss! No Products with  the name  <span className='font-[500]'>{search}</span> available.</p>
  </>
) :(
  <>
  
<h1 className=' text-[2rem] text-gray-900 capitalize font-[600]'>{search}</h1>

  <div className={`  h-[auto] sm:py-[10px] sm:ml-[0] ml-[5.5vw]  whitespace-wrap  overflow-x-auto  overflow-y-hidden scrollbar-hide`} >
{
    data?.products.map((i,index) =>(
    <Product
    key={i._id}
    id={i._id}
    name={i.name}
    price={i.price}
    photo={i.photo}
    
    />
  ))

    }
  </div>
  </>
)
}
</div>
    </>
)
 }
</>
  )
}

export default searchProducts
