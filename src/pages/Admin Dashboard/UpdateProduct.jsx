import React from "react";

import { MdDeleteForever } from "react-icons/md";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApi";
import { server } from "../../redux/reducer/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { useSelector,useDispatch } from "react-redux";
import { removeAdminProduct  } from "../../redux/reducer/userReducer"

const UpdateProduct = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError, Error } = useAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandler = async (_id) => {
    const res = await deleteProduct({
      Productid: _id,
      id: user?._id,
    });
    if ("data" in res) {
      toast.success(res.data.message);
    dispatch(removeAdminProduct(_id));
      navigate("/updateproduct");
    } else {
      console.log(res);
      const error = res.error.data.message;
      toast.error(error);
    }
  };

  const totalCat =user?.productsCreated?.map((item) => {
    return item?.category;
  });

  const uniqueCategories = Array.from(new Set(totalCat));

  const Length = user?.productsCreated?.length;

  return(      <div
        className="bg-[#80808093] mt-[8.6vh] sm:ml-[20vw] overflow-y-auto  overflow-x-hidden px-[0.5vw] h-[90vh] py-[0.5vh] "
        style={{ sm: { width: "calc(100vw - 20vw)" } }}
      >
        <div className=" cursor-pointer px-[15px] overflow-x-hidden gap-[20px]  bg-blue-950 mb-[0.2vh] flex items-center text-[#ffffffdd]  h-[8vh] overflow-y-hidden sm:h-[6vh]">
          <p className="font-500 ">Total Products : {Length}</p>
          <p className="font-500">Total Categories : {uniqueCategories?.length}</p>
        </div>

        {user?.productsCreated?.length === 0 ? (
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
              {user?.productsCreated?.map((i, index) => (
                <>
                  <div className=" cursor-pointer transition ease-in duration-[0.2s] overflow-x-hidden  bg-white mb-[0.2vh] hover:bg-[#e8e8e8] flex items-center justify-between  h-[11vh] overflow-y-hidden   sm:h-[8vh]">
                    <div
                      className="  px-[1vw]  w-[80vw]     transition duration-[0.4s]  "
                      onClick={() => navigate(`/updatesingleproduct/${i._id}`)}
                    >
                      <div className="flex  gap-[3vw] sm:gap-[0.6vw] ">
                        <div className="sm:h-[5.9vh] h-[12vh]     flex justify-center overflow-hidden items-center bg-transparent   w-[20vw] sm:w-[2.9vw] ">
                          <img
                            src={`${i.photo}`}
                            alt=""
                            className="object-contain  h-[9vh] sm:h-[4.4vh]"
                          />
                        </div>

                        <div className=" text-left justify-center  w-full  flex-col  flex ">
                          <h1 className="text-[1rem]  capitalize font-[500]">
                            {i.name}{" "}
                          </h1>
                          <h1 className="sm:mt-[-.5vh]  text-[0.9rem] text-[#565656] sm:text-[0.9rem] ">
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
  )
};

export default UpdateProduct;
