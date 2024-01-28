import React from "react";
import Iphone from "../../assets/iphone.jpeg";
import { MdDeleteForever } from "react-icons/md";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApi";
import { server } from "../../redux/reducer/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

const UpdateProduct = () => {
  const { data, isLoading, isError, Error } = useAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();

  const deleteHandler = async (_id) => {
    const res = await deleteProduct(_id);
    if ("data" in res) {
      toast.success(res.data.message);
      navigate("/updateproduct");
    } else {
      console.log(res);
      const error = res.error.data.message;
      toast.error(error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div
        className="bg-[#80808093] sm:ml-[20vw] overflow-y-auto  overflow-x-hidden px-[0.5vw] h-[90vh] py-[0.5vh] "
        style={{  sm: { width: "calc(100vw - 20vw)" } }}
      >
        {data?.products?.length === 0 ? (
          <>
            <div className="text-white text-[1.15rem] h-[100%] gap-[1vw] flex justify-center items-center">
              <p>No Products Availabe for update. </p>
              <a className="text-[blue] underline " href="/newproduct">
                {" "}
                Create Product{" "}
              </a>
            </div>
          </>
        ) : (
          <>
            <div className=" ">
              {data?.products?.map((i, index) => (
                <>
                  <div className=" cursor-pointer transition ease-in duration-[0.2s] overflow-x-hidden  bg-white mb-[0.2vh] hover:bg-[#e8e8e8] flex items-center justify-between  h-[11vh] overflow-y-hidden   sm:h-[8vh]">
                    <div
                      className="  px-[1vw]  w-[80vw]     transition duration-[0.4s]  " 
                      onClick={() => navigate(`/updatesingleproduct/${i._id}`)}
                    >
                      <div className="flex  gap-[3vw] sm:gap-[0.6vw] ">
                        <div className="sm:h-[5.9vh] h-[12vh]     flex justify-center overflow-hidden items-center   w-[20vw] sm:w-[2.9vw] rounded-[50%]">
                          <img
                            src={`${server}/${i.photo}`}
                            alt=""
                            className="object-cover  h-[9vh] sm:h-[4.4vh]"
                          />
                        </div>

                        <div className=" text-left justify-center  flex-col  flex ">
                          <h1 className="text-[1rem]  capitalize font-[500]">
                            {i.name}{" "}
                          </h1>
                          <h1 className="mt-[-1vh] text-[#808080c6]">
                            {i.category}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div
                      className=" h-[8vh] w-[4vw] flex justify-center items-center "
                      onClick={(e) => deleteHandler(i?._id)}
                    >
                      <p className="sm:text-[1.6vw] text-[6vw] mr-[6vw] sm:mr-[0vw] hover:text-red-600">
                        <MdDeleteForever />
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
