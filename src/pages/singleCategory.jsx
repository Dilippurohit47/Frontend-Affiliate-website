import React from 'react'
import {useParams} from 'react-router-dom';
import { useCategoryProductQuery } from '../redux/api/productApi';
import Loader from '../components/loader';
import Product from '../components/Product';

const singleCategory = () => {

const {cat} = useParams();

const {data , isLoading, isError} =useCategoryProductQuery(cat)

const products = data?.categoryProducts
console.log(products)

  return (
    <div className=' '>
      
      {
        isLoading ? <Loader/> : (
          <>
           <div className='bg-white sm:h-[43vh] h-[38vh]  sm:pt-[2vh]  px-[10px]'>



<h1 className=' text-[2rem] sm:pt-[60px] pt-[70px] text-gray-900 font-[600]'>{cat}</h1>

  <div className={`  h-[auto] sm:py-[10px]   sm:ml-[0]  ml-[5vw]  whitespace-wrap  overflow-x-auto  overflow-y-auto scrollbar-hide`} >
{
  products.map((i,index) =>(
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
          </>
        )
      }

    </div>
  )
}

export default singleCategory
