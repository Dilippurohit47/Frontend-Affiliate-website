import React, { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {

  const {user} = useSelector((state) =>state.userReducer)

const navigate = useNavigate()
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [amazonLink, setamazonLink] = useState("");
  const [aliExpressLink, setaliExpressLink] = useState("");
  const [photoPrev, setPhotoPrev] = useState("");
  const [photo, setPhoto] = useState();

const [createProduct] = useCreateProductMutation();
const fileInputRef = useRef(null);


const [loading , setloading] = useState(false);

const changeImageHandler = (e) => {
  const file = e.target.files?.[0];

  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPhotoPrev(reader.result);
        setPhoto(file);
      }
    };
  }
};


const submithandler = async (e) =>{
    e.preventDefault();
    setloading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", description);
    formData.append("category", category.toLowerCase());
    formData.append("link", amazonLink);
    formData.append("aliExpressLink",aliExpressLink );
    formData.append("photo", photo); // Assuming photo is already a File object
    const res = await createProduct({ id:user?._id,  formData })
    if("data" in  res) {
      toast.success(res.data.message)
      // navigate("/updateproduct")
      setname('')
      setPhoto("")
      setPhotoPrev("")
      setcategory("")
      setdescription("")
      setamazonLink("")
      setprice("")
      setaliExpressLink("")
      fileInputRef.current.value = '';
    setloading(false)

     
    }
    else{
      console.log(res)
      const error = res.error.data.message
      toast.error(error)
    setloading(false)

    }

  };



  return (
    <div
      className="bg-white h-[auto] sm:overflow-y-hidden  overflow-y-auto sm:mt-0 mt-[11vh]  sm:flex-row  flex-col  w-[100vw] flex z-[-9] justify-center items-center  "
      style={{ height: "calc( 100vh ) "  }}>


<h1 className="sm:absolute sm:top-[15.8vh]   text-[#60606075]  sm:text-[3rem] text-[1.5rem] font-[700] sm:z-[-0] ">Create New Product </h1>


      <div className=" flex sm:h-[70vh] sm:mt-[14vh]  h-[70vh] sm:flex-row flex-col  sm:w-[50vw] w-[90vw] sm:bg-white z-[9] rounded-[20px]  sm:shadow-xl">

        {/* imgdiv */}
        <div className="h-[100%] sm:w-[50%] border-[2px] sm:border-[0]  sm:border-r-[2px] pl-[1vw] pt-[1vh]  ">

<p className="text-[#808080de] sm:mt-[1vh] ml-[25vw] sm:ml-[0]">Upload image here</p>
<div className="sm:h-[18vw] h-[40vh] mt-[5vh]  flex justify-center items-center">
{photoPrev && <img   src={photoPrev} alt="" className="sm:h-[40vh]  h-[40vh] object-contain" /> }

</div>




<div className=" flex sm:ml-[7vw] sm:mt-[9vh] mt-[9vh] ml-[12vh] mb-[5vh] ">   
              <input ref={fileInputRef} required type="file"  className=""  onChange={changeImageHandler} />
            </div>



        </div>
        {/* imgdiv  end*/}


        {/* form div */}
        <div className="h-[100%] sm:block  sm:w-[50%] bg-white  sm:rounded-[20px] mt-[5vh] sm:mt-0  pl-[3vw]  pt-[2vh]  sm:pt-[5vh] ">
<p className="sm:hidden text-[#808080ca] font-[500] ml-[5vh] mb-[2vh] capitalize text-[1.4rem]">Enter product details</p>

          <form className="flex sm:block flex-col justify-center items-start " >
          {/* one input */}
          <div className="">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Product Name </label>
            <div className="mt-1">
              <input value={name} onChange={(e) =>setname(e.target.value)} type="text" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* one input end */}

          {/* 2nd input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Price </label>
            <div className="mt-1">
              <input value={price} onChange={(e) =>setprice(e.target.value)}  type="number" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 2nd input end */}

          {/* 3rd input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Category </label>
            <div className="mt-1">
              <input value={category}  onChange={(e) =>setcategory(e.target.value)} type="text" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 3rd input end */}


          {/* 4th input */}
          <div className="mt-[1vh]">
            <label value={description}  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Description </label>
            <div className="mt-1">
              <input  onChange={(e) =>setdescription(e.target.value)}  value={description} type="text" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 4th input end */}

          {/* 5th input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Amazon Link </label>
            <div className="mt-1">
              <input  value={amazonLink} onChange={(e) =>setamazonLink(e.target.value)}   type="text" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 5th input end */}

          {/* 6th input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              AliExpress Link </label>
            <div className="mt-1">
              <input   value={aliExpressLink} type="text" name="inputname" className="block sm:w-56 w-[70vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800" onChange={(e) =>setaliExpressLink(e.target.value)}/>
            </div>
          </div>
          {/* 6th input end */}


{
  loading ?  <>
  <p className=" font-[500] sm:mb-[0] mb-[5vh]  text-black h-[5vh] vsm:text-[1rem] text-[1rem] sm:text-[1rem] sm:w-[30vw] items-center mt-[4vh] sm:mt-[5vh] sm:ml-[5vw] ">Wait product creating....</p>
  </> : <>
  <button className={`bg-blue-500 font-[600]  flex sm:mb-0 mb-[5vh]  hover:bg-blue-700 transition-all duration-[0.4s] text-white h-[5vh] sm:w-[10vw] w-[30vw] items-center mt-[4vh] sm:mt-[3vh] sm:ml-[5vw] justify-center rounded-[20px]`}     onClick={(e)=>submithandler(e)}>
Create
</button>
  </>
}
  
</form>
        </div>
              {/* form div end */}
      </div>
    </div>
  );
};

export default CreateProducts;
