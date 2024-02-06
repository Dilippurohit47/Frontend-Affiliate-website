import React from 'react'
import IphoneImg from "../assets/iphone.jpeg"
import { server } from '../redux/reducer/store'
import { useNavigate } from 'react-router-dom'

const Product = ({name,price,photo,id}) => {

const navigate = useNavigate();

// const id = key

console.log("photo",photo);

  return (



  


<div className=' mb-[1vh]   inline-block w-[40vw] mr-[4vw] sm:mr-[1.5vw]  sm:w-[190px] sm:hover:scale-[1.05] bg-white   sm:hover:bg-gray-100 transition ease-in-out duration-[0.5s] sm:h-[31vh] px-[10px] py-[10px] h-[28vh]  cursor-pointer border-[2px]' onClick={() =>navigate(`/productdetails/${id}`)}>
            <div className='img  flex justify-center  '>
                <img className='object-contain h-[20vh] ml-[0vw] sm:ml-[0.0vw]  sm:h-[23vh]'  src={`${photo}`} alt={name} loading="lazy" />
            </div>
            <div className='name   text-center'>
                <h1 className='text-[2vh] font-[500] truncate '>{name} </h1>
                    <p className='mt-[-5px]'> &#8377;{price}</p>
            </div>
        </div> 
      


  )
}

export default Product
