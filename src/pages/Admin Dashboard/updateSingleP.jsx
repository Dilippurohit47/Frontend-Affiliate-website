import React, { useEffect, useState } from "react";
import { server } from "../../redux/reducer/store";
import {
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateSingleP = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useSingleProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  // const {user} = useSelector((state) =>state.userReducer)

  const { user } = useSelector((state) => state.userReducer);

  const [updating, setupdating] = useState(false);

  if (isError) {
    console.log("error in up", error);
  }

  const products = data?.product;
  // console.log("data fro p" ,products)

  const { price, photo, name, desc, link, category, aliExpressLink } =
    products || {
      photo: "",
      category: "",
      name: "",
      desc: "",
      price: 0,
      link: "",
      aliExpressLink: "",
    };

  const [priceUpdate, setPriceUpdate] = useState(price);
  const [descriptionupdate, setdescriptionupdate] = useState(desc);
  const [nameUpdate, setNameUpdate] = useState(name);
  const [categoryUpdate, setCategoryUpdate] = useState(category);
  const [photoUpdate, setPhotoUpdate] = useState("");
  const [photoFile, setPhotoFile] = useState();
  const [amazonlinkupdate, setamazonlinkupdate] = useState(link);
  const [aliExpressLinkupdate, setaliExpressLinkupdate] =
    useState(aliExpressLink);

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setamazonlinkupdate(data.product?.link);
      setaliExpressLinkupdate(data.product?.aliExpressLink);
      setCategoryUpdate(data.product.category);
      setdescriptionupdate(data.product.desc);
    }
  }, [data]);

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const UpdateProduct = async (e) => {
    setupdating(true);
    e.preventDefault();
    const formdata = new FormData();
    if (nameUpdate) formdata.set("name", nameUpdate);
    if (categoryUpdate) formdata.set("category", categoryUpdate);
    if (descriptionupdate) formdata.set("desc", descriptionupdate);
    if (priceUpdate) formdata.set("price", priceUpdate);
    if (amazonlinkupdate) formdata.set("link", amazonlinkupdate);
    if (aliExpressLinkupdate)
      formdata.set("aliExpressLink", aliExpressLinkupdate);
    if (photoFile) formdata.set("photo", photoFile);

    const res = await updateProduct({
      id,
      formdata,
      userid: user?._id,
    });

    if ("data" in res) {
      toast.success(res.data.message);
      navigate("/updateproduct");
      setupdating(false);
      console.log("data from updates", data);
    } else {
      console.log(res);
      const error = res.error.data.message;
      toast.error(error);
      setupdating(false);
    }
  };

  return (
    <div className="bg-white    w-[100vw] flex z-[-9] justify-center items-center  ">
      <h1 className="absolute sm:mt-[0.5vh] top-[11.4vh] text-[#69696945] sm:text-[3rem] text-[1.8rem] font-[700] z-[-0] ">
        Update Product{" "}
      </h1>

      <div className=" mt-[18vh]  flex flex-col sm:flex-row h-[70vh] sm:mt-[20vh] sm:w-[50vw] w-[90vw] bg-white z-[9] rounded-[20px]  sm:shadow-2xl">
        {/* imgdiv */}

        <div className="h-[100%] sm:w-[50%]  border-[2px]  sm:border-r-[2px] pl-[1vw] pt-[1vh] object-contain">
          <p className="text-[#808080de]  sm:ml-0 ml-[25vw]">
            Upload image here
          </p>
          <div className="  sm:h-[40vh]  mt-[5vh]  flex justify-center   items-center">
            {photoUpdate ? (
              <img
                className="sm:h-[18vw] h-[40vh]  object-contain"
                src={photoUpdate}
                alt="New Image"
              />
            ) : (
              <>
                <img
                  src={`${photo}`}
                  alt={nameUpdate}
                  className="sm:h-[40vh] h-[40vh] object-contain"
                />
              </>
            )}
          </div>

          <div className=" flex sm:ml-[7vw] mt-[9vh] sm:mb-0 mb-[2vh] ml-[23vw] ">
            <input
              required
              type="file"
              className=""
              onChange={changeImageHandler}
            />
          </div>
        </div>
        {/* imgdiv  end*/}

        {/* form div */}

        <div className="h-[100%] sm:w-[50%] pl-[3vw] pt-[5vh] sm:pt-[3vh] ">
          <form className="">
            {/* one input */}
            <div>
              <label
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                Product Name{" "}
              </label>
              <div className="mt-1">
                <input
                  value={nameUpdate}
                  onChange={(e) => setNameUpdate(e.target.value)}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* one input end */}

            {/* 2nd input */}
            <div className="mt-[1vh]">
              <label
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                Price{" "}
              </label>
              <div className="mt-1">
                <input
                  value={priceUpdate}
                  onChange={(e) => setPriceUpdate(e.target.value)}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* 2nd input end */}

            {/* 3rd input */}
            <div className="mt-[1vh]">
              <label
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                Category{" "}
              </label>
              <div className="mt-1">
                <input
                  value={categoryUpdate}
                  onChange={(e) => setCategoryUpdate(e.target.value)}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* 3rd input end */}

            {/* 4th input */}
            <div className="mt-[1vh]">
              <label
                value={descriptionupdate}
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                Description{" "}
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setdescriptionupdate(e.target.value)}
                  value={descriptionupdate}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* 4th input end */}

            {/* 5th input */}
            <div className="mt-[1vh]">
              <label
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                Amazon Link{" "}
              </label>
              <div className="mt-1">
                <input
                  value={amazonlinkupdate}
                  onChange={(e) => setamazonlinkupdate(e.target.value)}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* 5th input end */}

            {/* 6th input */}
            <div className="mt-[1vh]">
              <label
                for="inputname"
                className="block text-gray-800 font-semibold text-sm"
              >
                AliExpress Link{" "}
              </label>
              <div className="mt-1">
                <input
                  value={aliExpressLinkupdate}
                  onChange={(e) => setaliExpressLinkupdate(e.target.value)}
                  type="text"
                  name="inputname"
                  className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>
            </div>
            {/* 6th input end */}

            {updating ? (
              <>
                {" "}
                <p className="mt-[2vh] mb-[5vh]">wait Updating..</p>{" "}
              </>
            ) : (
              <>
                <button
                  className="bg-blue-500 font-[600] hover:bg-blue-700 transition-all duration-[0.4s] text-white h-[5vh] sm:w-[10vw] w-[30vw] items-center   mt-[2vh] sm:mt-[5vh] sm:ml-[5vw] justify-center rounded-[20px] flex mb-[5vh] ml-0 sm:mb-0"
                  onClick={(e) => UpdateProduct(e)}
                >
                  Update
                </button>
              </>
            )}
          </form>
        </div>
        {/* form div end */}
      </div>
    </div>
  );
};

export default UpdateSingleP;
