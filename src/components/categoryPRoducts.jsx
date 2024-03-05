import React from "react";
import { server } from "../redux/reducer/store";
const CatProduct = ({ name, image }) => {
  return (
    <div className=" mb-[1vh]  inline-block mr-[4vw] sm:mr-[1.5vw] w-[40vw]  sm:w-[200px] sm:hover:scale-[1.05] bg-white  sm:hover:bg-gray-100 transition ease-in-out duration-[0.5s] sm:h-[31vh] px-[10px] py-[10px] h-[28vh]  cursor-pointer border-[2px]">
      <div className="img  flex justify-center ">
        <img
          className="object-contain h-[20vh] ml-[0vw] sm:ml-[0.0vw]  sm:h-[23vh]"
          src={`${image}`}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="name  text-center">
        <h1 className="text-[2vh] font-[500] ">{name} </h1>
      </div>
    </div>
  );
};

export default CatProduct;
