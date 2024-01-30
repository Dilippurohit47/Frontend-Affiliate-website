import React from 'react'
import { TbError404Off } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { Link } from 'react-router-dom';


const PageNotfound = () => {
  return (
    <div className='mt-[30vh] flex  flex-col justify-center items-center text-[2rem]'>
      
      <p className='text-[3rem]'> <TbError404Off/></p> 

        <h1 className=''>Page N0t Found</h1>

        <Link className='text-[#808080c3]' to={"/"}><VscError/></Link>
    </div>
  )
}

export default PageNotfound
