import React from 'react'

import Loader from '../components/loader'
import Product from '../components/Product'
import { useSelector } from 'react-redux'

const CartItems = () => {


    const user = useSelector((state) =>state.userReducer)

const products = user?.user


  return (
    <>
        <div className='sm:mt-[60px] mt-[70px]  sm:h-[43vh] h-[38vh]  sm:pt-[2vh]  px-[10px]'>

  
<h1 className=' text-[2rem] text-gray-900 capitalize font-[600]'>your Cart</h1>

<div className={`  h-[auto] sm:py-[10px] sm:ml-[0] ml-[5.5vw]  whitespace-wrap  overflow-x-auto  overflow-y-hidden scrollbar-hide`} >


{
products?.cartItems?.map?.((i,index) =>(
    // console.log("priceceee",i?.product?.price),

    <Product
    key={i?._id}
    id={i?._id}
    name={i?.name}
    price={i?.price}
    photo={i?.photo}
    
    />

))
}

  </div>
</div>

</>
  )
}

export default CartItems


