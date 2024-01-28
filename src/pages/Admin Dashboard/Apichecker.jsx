import React from 'react'
import { useSingleProductQuery } from '../../redux/api/productApi';

const Apichecker = () => {

const id = "65aa6fa51db9c81849f12466"
const {data , isLoading , isError ,error} = useSingleProductQuery(id)


if(isError){
    console.log(error)
}

const products = data?.product;
console.log("data fro api " ,products)

  return (
    <div>

    </div>
  )
}

export default Apichecker



// {
//   data?.product?.length === 0 ? 
//   <p>No products available</p> : (
// <>
// <div className='bg-[#ffffff] '>



// </div>

// </>

//   )
// }

// ///

// data?.products?.map((i,index) =>(
//   <>
  
//   <div className=' cursor-pointer  mb-[0.2vh] hover:bg-[#80808028] flex items-center justify-between  h-[8vh]'>
  
//     <div className='  px-[1vw]  w-[80vw]      transition duration-[0.4s]  ' onClick={()=>navigate(`/updatesingleproduct/${i._id}`)}> 
//     <div  className='flex gap-[0.6vw] '  >
    
//     <div className='h-[5.7vh] bg-red-500   flex justify-center overflow-hidden items-center  w-[2.9vw] rounded-[50%]'>
//         <img src={`${server}/${i.photo}`} alt="" className='object-cover  h-[4.2vh]' />
//     </div>
    
    
//     <div className='  '>
//     <h1 className='text-[1rem] capitalize font-[500]'>{i.name} </h1>
//     <h1 className='mt-[-0.5vh] text-[#808080c6]'>{i.category}</h1>
//     </div>
    
    
    
//     </div>
    
    
  
//      </div>
//      <div className=' h-[8vh] w-[4vw] flex justify-center items-center ' onClick={(e) =>deleteHandler(i?._id)}>
//     <p className='text-[1.6vw] hover:text-red-600' ><MdDeleteForever/></p>
//     </div>
//   </div>
  
    
//   </>
  
//       ))