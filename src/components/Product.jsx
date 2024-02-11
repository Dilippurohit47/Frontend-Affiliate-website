import React, { useState } from "react";
import IphoneImg from "../assets/iphone.jpeg";
import { server } from "../redux/reducer/store";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../redux/api/userApi";
import { FaCartArrowDown } from "react-icons/fa";

import { SetcartList, removeFromCart } from "../redux/reducer/userReducer";

const Product = ({ name, price, photo, id }) => {
  const user = useSelector((state) => state.userReducer);
  const userId = user?.user?._id;
  const cartItem = useSelector((state) =>state?.userReducer?.user?.cartItems)

  const dispatch = useDispatch();

  const [Addcart] = useAddToCartMutation();
  const addToCart = async () => {
    try {
      const data = await Addcart({ userId: userId, productId: id });

      if (data?.data?.success === true) {
   const sinleproduct = data?.data?.product
   console.log(sinleproduct)
        toast.success(data?.data?.message);
        dispatch(SetcartList(sinleproduct))
     
      } else {
        // console.log("else", data?.error?.data?.message);
        toast.error(data?.error?.data?.message);
        dispatch(removeFromCart(id))
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // const [inCart, setinCart] = useState(false);
// console.log("id",id)
// console.log("cart",user?.user?.cartItems[0]?.product?._id)
  const navigate = useNavigate();

  return (
    <div
      className=" mb-[1vh] relative  inline-block w-[40vw] mr-[4vw] group sm:mr-[1.5vw]  sm:w-[190px] sm:hover:scale-[1.05] bg-white   sm:hover:bg-gray-100 transition ease-in-out duration-[0.5s] sm:h-[31vh] px-[10px] py-[10px] h-[28vh]  cursor-pointer border-[2px]"
      onClick={() => navigate(`/productdetails/${id}`)}
    >
      <div className="img  flex justify-center  ">
        <img
          className="object-contain h-[20vh] ml-[0vw] sm:ml-[0.0vw]  sm:h-[23vh]"
          src={`${photo}`}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="name   text-center">
        <h1 className="text-[2vh] font-[500] truncate ">{name} </h1>
        <p className="mt-[-5px]"> &#8377;{price}</p>
      </div>


{/* 
      <div
        className="absolute  top-[43%] left-[42%] hidden bg-[#00aeff] rounded-full h-[4vh] w-[4vh] transition ease-in-out duration-[0.3s] group-hover:flex justify-center group-hover:h-[5vh] group-hover:w-[5vh] items-center"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
          setinCart(true);
        }}
      >
        <LuPlus style={{ fontSize: "20px" }} />
      </div> */}
      {
      cartItem?.some?.(
      (item) => item?._id.toString() === id

    ) ? (
        <div
          className="absolute rotate-[45deg] sm:hidden vsm:hidden  top-[43%] left-[42%] hidden text-white bg-[#ff0b0be3] rounded-full h-[4vh] w-[4vh] transition ease-in-out duration-[0.3s] group-hover:flex justify-center group-hover:h-[5vh] group-hover:w-[5vh] items-center"
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
        >
          <LuPlus style={{ fontSize: "20px" }} />
        </div>
      ) : (
        <div
          className="absolute  top-[43%] left-[42%] hidden  vsm:group-hover:hidden  bg-[#00aeff] rounded-full h-[4vh] w-[4vh] transition ease-in-out duration-[0.3s] sm:group-hover:flex justify-center group-hover:h-[5vh] group-hover:w-[5vh] items-center"
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
        >
          <FaCartArrowDown style={{ fontSize: "20px" }} />
        </div>
      )}
    </div>
  );
};

export default Product;
