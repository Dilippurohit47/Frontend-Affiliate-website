import React, { useEffect, useState } from "react";
import { useCategoryProductQuery } from "../redux/api/productApi";
import Product from "./Product";
import { useParams } from "react-router-dom";

const Relatedproducts = ({ category }) => {
  const { data, isError, isLoading } = useCategoryProductQuery(category);

  const {id} = useParams();
console.log(data?.categoryProducts)
  const [filtered , setfiltered] = useState([]);
  if (isError) {
    console.log(isError);
  }

  useEffect(()=>{ 

if(data && id){
  const products = data?.categoryProducts.filter(product =>product._id != id)
  setfiltered(products)
}

  },[data,id])
  console.log("filter",filtered)



console.log(filtered.length)
  return (   
<div>
{
      filtered.length > 0 ? <>
      <div className="bg-[#232F3E] h-[auto]    sm:h-[auto] sm:px-[1vw] vsm:px-0 sm:mt-[10vh] mt-[8vh]  py-[2vh] ">
      <h1 className="text-white font-[500] ml-[3vw] sm:mb-0 mb-[3vh] sm:ml-0 sm:text-[2vw] text-[1.5rem] w-[auto]">
        Related Products
      </h1>

      {isLoading ? (
        <p className="text-white ">Loading..</p>
      ) : (
        <>
          <div className="bg-[#232F3E]  sm:h-[auto]   h-[auto] sm:ml-0 vsm:ml-[8vw] ml-[6.5vw] overflow-y-auto  sm:pt-[2vh]   vsm:px-0 px-[10px]">
            <div
              className={`  sm:h-[35vh] sm:py-[10px] overflow-y-auto    sm:whitespace-nowrap  overflow-x-auto   scrollbar-hide`}
            >
              {filtered?.map((i, index) => (
                <Product
                  key={i._id}
                  id={i._id}
                  name={i.name}
                  price={i.price}
                  photo={i.photo}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
      
      </> : ""
    }
</div>
  


    
  );
};

export default Relatedproducts;
