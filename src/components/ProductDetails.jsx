import React from "react";
import {
  useCategoryQuery,
  useLatestProductsQuery,
  useSingleProductQuery,
} from "../redux/api/productApi";

import { Link, useParams } from "react-router-dom";
import Loader from "./loader";

import IphoneImg from "../assets/Mi phone.jpeg";
import { FaCartArrowDown } from "react-icons/fa";
import Relatedproducts from "./Relatedproducts";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();

  const {
    data: categoryData,
    loading: categoryLoading,
    isError: categoryError,
  } = useCategoryQuery("");

  const { id } = useParams();

  const { data, isLoading, isError } = useSingleProductQuery(id);

  const product = data?.product;

  return (
    <div className="  sm:mt-[-4px] overflow-y-hidden  h-auto  pt-[9vh] sm:pt-[8vh]  ">


      <div className="bg-[#232f3e] h-[5vh] sm:h-[6vh]  vsm:py-[20px]  vsm:px-[5vw]   sm:text-center sm:pt-[1vh] text-[16px] items-center gap-[15px] flex vsm:justify-start scrollbar-hide overflow-x-auto overflow-y-hidden justify-center ">
        {categoryData?.categories.map((i, index) => (
          <Link
            to={`/category/${i.name}`}
            className="capitalize cursor-pointer text-gray-300  sm:mt-[1vh] transition-all ease-in-out duration-[0.4s]  hover:text-[#ff8400] "
            key={index}
          >
            {i.name}
          </Link>
        ))}
      </div>

      <div className="h-[auto] w-[100v%] mt-[4vw]    flex-col sm:flex-row  flex   sm:px-[10vw] px-[1vw]  ">
        <div className="sm:h-[55vh] h-[45vh]    justify-center flex sm:ml-[5vw] sm:w-[20vw] sm:border-[2px] hover:border-[0]  px-[1vw] ">
          <img
            className="   object-contain sm:hover:scale-[1.2]  transition-all ease-in-out duration-[0.2s]  "
            src={`${product?.photo}`}
          />
        </div>

        <div className="  w-[auto] ml-[2vw] sm:mt-0 mt-[3vh] sm:ml-[5vw]">
          <h1 className="sm:text-[1.5vw] font-[500]  text-[1.7rem] capitalize">
            {" "}
            {product?.name}{" "}
          </h1>
          <p className="sm:mt-[1vh] text-[1.25rem] text-[#000000c4]    sm:text-[1.5vw] font-[500] ">
            &#8377;{product?.price} -/
          </p>

          <p className="sm:mt-[1vh] text-[1rem] text-[#000000a1]     sm:text-[1.5vw] font-[500] ">
            {product?.category}{" "}
          </p>

          <p className="font-[600] sm:mt-[1vh] text-[16px]">Description : </p>
          <p className=" w-[auto] sm:w-[40vw] pr-[2.5vw] vsm:text-[#7a7a7a]   leading-[1.25rem] text-[0.9rem] text-[#000000df]">
            {product?.desc}
          </p>


{
  product?.link && <>
  <Link to={product?.link} target="_blank">
            <button className="bg-[#fa7000e7] ml-[25vw] sm:ml-0  w-[50vw] text-white sm:w-[12vw] h-[6vh]  sm:h-[5vh]  text-center rounded-full mt-[4vh] sm:mt-[2vh] transition-all ease-in-out duration-[0.4s] hover:scale-[1.08]  block">
              Buy Now Amazon{" "}
            </button>
          </Link>
  </>
}

          

{
  product?.aliExpressLink && <>
  <Link to={product?.aliExpressLink} target="_blank">
          <button  className="bg-[#ff0000d6] ml-[25vw] sm:ml-0 w-[50vw] text-white sm:w-[12vw]  h-[6vh]  sm:h-[5vh]  text-center rounded-full mt-[1vh] block  transition-all ease-in-out duration-[0.4s] hover:scale-[1.08]  ">
            Buy Now Aliexpress
          </button></Link>
  </>
}



          {/* <button className="bg-[#118000d9] w-[50vw] ml-[25vw] sm:ml-0 text-white sm:w-[12vw]  h-[6vh]  sm:h-[5vh]  text-center rounded-full mt-[1vh]   transition-all ease-in-out duration-[0.4s] hover:scale-[1.08]  ">
            Buy Now india
          </button> */}
        </div>
      </div>

      <Relatedproducts category={product?.category}/>
    </div>
  );
};

export default ProductDetails;
