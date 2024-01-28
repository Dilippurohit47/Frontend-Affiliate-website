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
  const [photoPrev, setPhotoPrev] = useState("");
  const [photo, setPhoto] = useState();

const [createProduct] = useCreateProductMutation();
const fileInputRef = useRef(null);


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



    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", description);
    formData.append("category", category.toLowerCase());
    formData.append("link", amazonLink);
    formData.append("photo", photo); // Assuming photo is already a File object




   
    const res = await createProduct({  formData })

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
      fileInputRef.current.value = '';
     
    }
    else{
      console.log(res)
      const error = res.error.data.message
      toast.error(error)
    }

  };



  return (
    <div
      className="bg-white   w-[100vw] flex z-[-9] justify-center items-center  "
      style={{ height: "calc( 100vh - 70px) "  }}>


<h1 className="absolute top-[13.4vh] text-[#60606075] sm:text-[3rem] text-[1.5rem] font-[700] z-[-0] ">Create New Product </h1>


      <div className=" flex h-[70vh] sm:w-[50vw] w-[90vw] bg-white z-[9] rounded-[20px]  shadow-2xl">

        {/* imgdiv */}
        <div className="h-[100%] w-[50%]    border-r-[2px] pl-[1vw] pt-[1vh]  ">

<p className="text-[#808080de] sm:mt-[1vh] mt-[2vh]">Upload image here</p>
<div className="h-[40vh] mt-[5vh]  flex justify-center items-center">
{photoPrev && <img   src={photoPrev} alt="" className="sm:h-[30vh] object-cover " /> }

</div>




<div className=" flex ml-[7vw] mt-[9vh] ">   
              <input         ref={fileInputRef} required type="file"  className=""  onChange={changeImageHandler} />
            </div>



        </div>
        {/* imgdiv  end*/}


        {/* form div */}
        <div className="h-[100%] w-[50%] pl-[3vw]  pt-[2vh]  sm:pt-[5vh] ">
          <form >
          {/* one input */}
          <div>
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Product Name </label>
            <div className="mt-1">
              <input value={name} onChange={(e) =>setname(e.target.value)} type="text" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* one input end */}

          {/* 2nd input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Price </label>
            <div className="mt-1">
              <input value={price} onChange={(e) =>setprice(e.target.value)}  type="number" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 2nd input end */}

          {/* 3rd input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Category </label>
            <div className="mt-1">
              <input value={category}  onChange={(e) =>setcategory(e.target.value)} type="text" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 3rd input end */}


          {/* 4th input */}
          <div className="mt-[1vh]">
            <label value={description}  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Description </label>
            <div className="mt-1">
              <input  onChange={(e) =>setdescription(e.target.value)}  value={description} type="text" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 4th input end */}

          {/* 5th input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              Amazon Link </label>
            <div className="mt-1">
              <input  value={amazonLink} onChange={(e) =>setamazonLink(e.target.value)}   type="text" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 5th input end */}

          {/* 6th input */}
          <div className="mt-[1vh]">
            <label  for="inputname" className="block text-gray-800 font-semibold text-sm">
              AliExpress Link </label>
            <div className="mt-1">
              <input   type="text" name="inputname" className="block sm:w-56 w-[40vw] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"/>
            </div>
          </div>
          {/* 6th input end */}

          <button className="bg-blue-500 font-[600] hover:bg-blue-700 transition-all duration-[0.4s] text-white h-[5vh] sm:w-[10vw] w-[30vw] items-center mt-[2vh] sm:mt-[5vh] ml-[5vw] justify-center rounded-[20px] flex  "   onClick={(e)=>submithandler(e)}>
Create
</button>
</form>
        </div>
              {/* form div end */}
      </div>
    </div>
  );
};

export default CreateProducts;
