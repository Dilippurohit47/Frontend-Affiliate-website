import React from 'react'
import Product from '../components/Product'
import CatProduct from '../components/categoryPRoducts'

import Loader from "../components/loader"

import { useAllProductsQuery, useCategoryQuery, useLatestProductsQuery } from '../redux/api/productApi'
import { Link } from 'react-router-dom'

const page1 = () => {

 
const {data , isLoading , isError} = useLatestProductsQuery("")

const { data: categoryData, loading: categoryLoading, isError: categoryError } = useCategoryQuery("");

const {data:allProducts , loading:allproductsLoading , isError:allProductsError} = useAllProductsQuery("")



const product = data?.products
console.log( "all",allProducts)
  
  return (
    <div className='h-[100vh]  max-w-[100vw]  pt-[1.5vh] bg-gray-300 sm:pt-[2vh] '>



{
  isLoading ? (
 <Loader/>
  ) :(
    <>
    <div className='bg-white sm:h-[43vh] h-[38vh] mt-[7.5vh]  sm:pt-[2vh]  px-[10px]'>
<h1 className=' text-[2rem] text-gray-900 font-[600]'>Latest Products</h1>
  <div className={`  h-[35vh] sm:py-[10px]     whitespace-nowrap  overflow-x-auto  overflow-y-hidden scrollbar-hide`} >
{
  product.map((i,index) =>(
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
</div>

<div className='bg-white sm:h-[43vh] h-[38vh] mt-[0.5vh] sm:mt-[0.6vh] sm:pt-[2vh]  px-[10px]'>
<h1 className=' text-[2rem] text-gray-900 font-[600]'>Categories</h1>
  <div className={`  h-[35vh] sm:py-[10px]     whitespace-nowrap  overflow-x-auto  overflow-y-hidden scrollbar-hide`} >
{
 
 categoryData?.categories.map((i,index) =>(
 <Link to={`category/${i.name}`}     key={index} >   <CatProduct

    name={i.name}
    image={i.image}
    
    /> </Link>
  ))
}
</div>
</div>


<div className='bg-white   mt-[0.5vh] sm:pt-[2vh]  px-[10px]'>
<h1 className=' text-[2rem] text-gray-900 font-[600]'>All Products</h1>
  <div className={`  h-[35vh] sm:py-[10px] whitespace-wrap ml-[5.5vw] sm:ml-0 scrollbar-hide`} >
{
  allProducts?.products.map((i,index) =>(
    <Product
    key={index}
    id={i._id}
    name={i.name}
    price={i.price}
    photo={i.photo}
    
    />
  ))
}
</div>
</div>
</>
  )

}
    </div>
  )
}

export default page1
