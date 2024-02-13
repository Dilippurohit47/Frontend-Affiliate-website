import React from "react";

import Loader from "../components/loader";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const CartItems = () => {
  const user = useSelector((state) => state.userReducer);
  const products = user?.user;
  const cartLength = products?.cartItems?.length


  return (
    <>
      <div className="sm:mt-[60px] mt-[70px]  sm:h-[43vh] h-[38vh]  sm:pt-[2vh]  px-[10px]">
        <h1 className=" text-[2rem] text-gray-900 capitalize font-[600]">
          your Cart
        </h1>

      {  !cartLength ? 
      
      <div className="h-full w-full flex items-center  justify-center">
     <p className="sm:text-[2vw] text-[7vw] text-[#00000061]">Your cartlist is empty !</p> 
      </div>
 : 
      
      <div
          className={`  h-[auto] sm:py-[10px] sm:ml-[0] ml-[5.5vw]  whitespace-wrap  overflow-x-auto  overflow-y-hidden scrollbar-hide`}
        >
          {products?.cartItems?.map?.((i, index) => (
            <Product
              key={i?._id}
              id={i?._id}
              name={i?.name}
              price={i?.price}
              photo={i?.photo}
            />
          ))}
        </div>}
      </div>
    </>
  );
};

export default CartItems;
