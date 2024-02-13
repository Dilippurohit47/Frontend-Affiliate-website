import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useLoginMutation } from "../redux/api/userApi";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { GrUserAdmin } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";

import toast from "react-hot-toast";
import { useCategoryQuery } from "../redux/api/productApi";
import { useSelector } from "react-redux";

import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [down, setdown] = useState(false);
  const [search, setsearch] = useState("");
  const [adminNav, setadminNav] = useState(false);
  const [showCat, setshowCat] = useState(false);

  const [menu, setmenu] = useState(false);

  const user = useSelector((state) => state.userReducer);

  const searchHandler = (e) => {
    setsearch("");
  };

  const [login] = useLoginMutation();
  const { data } = useCategoryQuery();
  const categories = data?.categories;
  // const { cat } = useParams();
  const products = user?.user;
  const cartLength = products?.cartItems?.length;


  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);


      const res = await login({
        name: user.displayName,
        email: user.email,
        _id: user.uid,
        role: "user",
      });

      if ("data" in res) {

        toast.success(res.data.message);
      } else {
        console.log("error in login func", res.error.data.message);
      }
    } catch (error) {
      toast.error("error in sign in");
      console.log("error", error);
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("sign out successfully");
    } catch (error) {
      toast.error("sign out failed try again later");
    }
  };

  return (
    <div className="h-[70px] vsm:h-[65px]  w-[100%] top-0 border-b-[5px] fixed z-[999]   bg-white border-gray-400 flex items-center   sm:px-[50px] pl-[5vw]  box-border ">
      {/* admin nav */}
      <div
        className={`bg-white fixed z-[9] h-[100vh] w-[60vw] sm:w-[20vw] border-r-[1px]  shadow-2xl transition-all duration-[0.4s] ease-in-out left-[-60vw]  top-0 sm:left-[-20vw] ${
          adminNav ? "sm:left-[0] left-[0vh]" : ""
        }`}
      >
        <div className="bg-[#232F3E] text-white px-[1vw] py-[2vh]  ">
          <p className="inline-block text-[1.35rem] translate-y-[0.4vh]  mr-[0.5vw]">
            <CgProfile />{" "}
          </p>

          <h1 className="text-[1.25rem] font-[700] inline-block ">
            {" "}
            Hello, {user?.name?.split(" ")[0]}
          </h1>
        </div>

        <div className="mt-[1vh]">
          <Link to={"/"}>
            <h1
              className="  h-[5vh] px-[1vw] py-[1vh] font-[500]   cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
              onClick={() => setadminNav(false)}
            >
              Home
            </h1>
          </Link>

          <Link to={"/newproduct"}>
            <h1
              className="  h-[5vh] px-[1vw] py-[1vh] font-[500]   cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
              onClick={() => setadminNav(true)}
            >
              Create New Product
            </h1>
          </Link>

          <Link to={"/updateproduct"}>
            <h1
              className="  h-[5vh] px-[1vw] py-[1vh] font-[500]  cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
              onClick={() => setadminNav(true)}
            >
              Update Product
            </h1>
          </Link>
        </div>
      </div>
      {/* admin nav end */}

      <div>
        <Link to={"/"}>Logo</Link>
      </div>

      <div className="flex  sm:ml-[30vw] vsm:gap-[8px] vsm:ml-[20px]  sm:gap-[20px] gap-[10px] ml-[45px] ">
        <div className="flex cursor-pointer ">
          <input
            type="text"
            placeholder="search for products"
            className=" sm:w-[30vw] w-[45vw] vsm:w-[50vw]  bg-blue-100 outline-none rounded-l-[8px] px-[15px] py-[8px] "
            onChange={(e) => setsearch(e.target.value)}
            value={search}
          />

          <Link
            to={`/all?search=${search}`}
            className="border-[0px] w-[50px] h-[40px] items-center justify-center bg-blue-400 rounded-r-[8px]  outline-none flex  "
            onClick={() => searchHandler()}
          >
            {<FaSearch />}
          </Link>
        </div>

        {/* menu div for mobile devices */}

        <div className=" flex items-center   sm:hidden text-center  ">
          <p
            className="text-[8vw] vsm:text-[9vw]  md:text-[6vw] lg:text-[5vw]"
            onClick={() => {
              setmenu(!menu), setadminNav(false);
            }}
          >
            <IoMenu />
          </p>

          {/* admin nav for mobile */}
          <div
            className={`bg-white fixed text-left z-[9] h-[100vh] vsm:w-[70vw] w-[60vw] sm:w-[20vw] border-r-[1px]  shadow-2xl transition-all duration-[0.4s] ease-in-out left-[-60vw]  top-0 sm:left-[-20vw] vsm:left-[-70vw] ${
              adminNav ? "sm:left-[0] vsm:left-[0vw] left-[0vh]" : ""
            }`}
          >
            <div className="bg-[#232F3E] text-white px-[1vw] py-[2vh]  ">
              <p className="inline-block text-[1.35rem] translate-y-[0.4vh]  mr-[0.5vw]">
                <CgProfile />{" "}
              </p>

              <h1 className="text-[1.25rem] font-[700] inline-block ">
                {" "}
                Hello, {user?.name?.split(" ")[0]}
              </h1>
            </div>

            <div
              className="mt-[1vh] ml-[1vw]"
              onClick={() => setadminNav(false)}
            >
              <Link to={"/"}>
                <h1
                  className="  h-[5vh] px-[1vw] py-[1vh] font-[500]   cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
                  onClick={() => setadminNav(false)}
                >
                  Home
                </h1>
              </Link>

              <Link to={"/newproduct"}>
                <h1
                  className="  h-[5vh] px-[1vw] py-[1vh] font-[500]   cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
                  onClick={() => setadminNav(true)}
                >
                  Create New Product
                </h1>
              </Link>

              <Link to={"/updateproduct"}>
                <h1
                  className="  h-[5vh] px-[1vw] py-[1vh] font-[500]  cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
                  onClick={() => setadminNav(true)}
                >
                  Update Product
                </h1>
              </Link>

              <p
                className="translate-y-[45vh] text-[2rem] vsm:translate-y-[45vh] vsm:translate-x-[30vw]  w-[6vw] h-[3vh] items-center  text-black  flex rounded-full justify-center  translate-x-[30vw] transition ease-in  duration-[1s]"
                onClick={() => setadminNav(false)}
              >
                <IoCloseOutline />
              </p>
            </div>
          </div>
          {/* admin nav end */}

          {/* navbar for mobile devices */}
          <div
            className={`bg-[#1C263D] text-white overflow-y-auto overflow-x-hidden vsm:w-[70vw]  fixed z-[999] h-[80vh] w-[60vw] border-r-[1px] top-[0]  shadow-2xl transition-all duration-[0.4s] ease-in-out ${
              menu ? "right-[-0.5vw]" : "right-[-70vw]"
            }`}
          >
            <div className="bg-[#1C263D] border-b-2 text-white px-[1vw] py-[2vh]  ">
              <p className="inline-block text-[1.35rem] translate-y-[0.4vh]  mr-[0.5vw]">
                <CgProfile />{" "}
              </p>

              <h1 className="text-[1.25rem] font-[700] inline-block ">
                {" "}
                Hello, {user?.name?.split(" ")[0]}
              </h1>
            </div>

            <div className="mt-[1vh]  pl-[2vw] text-left">
              <Link to={"/"} className=" ">
                <h1
                  className="  h-[5vh] px-[1vw] py-[0.5vh] font-[500]   cursor-pointer   transition-all duration-[0.2s]"
                  onClick={() => setmenu(false)}
                >
                  Home
                </h1>
              </Link>

              {user?.role === "admin" ? (
                <>
                  <div className="mt-[-1vh]">
                    <Link to={"/"}>
                      <h1
                        className="  h-[5vh] px-[1vw] py-[1vh] font-[500]    cursor-pointer transition-all duration-[0.2s]"
                        onClick={() => {
                          setadminNav(!adminNav), setmenu(false);
                        }}
                      >
                        Admin
                      </h1>
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className=" transition ease-in mt-[-1vh] duration-[0.3s]">
                <Link to={"#"}>
                  <h1
                    className="  h-[5vh] px-[1vw] py-[1vh] font-[500] cursor-pointer    transition-all flex duration-[0.2s]"
                    onClick={() => setshowCat(!showCat)}
                  >
                    Category{" "}
                    <p className="translate-y-[1vh] ml-[2vw] ">
                      <IoIosArrowDown />
                 
                    </p>{" "}
                
                  </h1>
             
                </Link>

                <div
                  className={`    overflow-hidden ml-[2vw] transition ease-in duration-[0.3s]  ${
                    showCat ? "h-[auto]" : "h-0 "
                  }`}
                >
                  {categories?.map((i, index) => (
                    <Link
                      to={`category/${i.name}`}
                      key={index}
                      className="list-none text-[#ffffff93] capitalize w-[25vw]  block  pr-[50px]  font-[400] text-[16px]"
                      onClick={() => {
                        setmenu(false), setshowCat(false);
                      }}
                    >
                      {i.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/cart"
                className="flex gap-2   pr-[50px]  font-[500] text-[16px] items-center"
                onClick={() => {
                  setmenu(false), setshowCat(false);
                }}
              >
                <p className="font-500 inline-block ml-[1vw] text-center   translate-y-[-0.4vh] mt-[1vh] ">
                  Cart
                </p>
                <p className="inline-block ml-[0.4vw] text-center  text-[4.5vw] translate-y-[-0.4vh] mt-[1vh]">
                  <FaCartArrowDown />
                </p>

                {cartLength > 0 && (
                    <div className="bg-red-500   text-[12px] text-white flex items-center justify-center h-[5.5vw] w-[5.5vw] rounded-full">
                      {cartLength}
                    </div>
                  )}
              </Link>

              {user ? (
                <>
                  <Link to={"/"}>
                    <h1
                      className="   h-[5vh] px-[1vw]  py-[1vh] font-[500]  flex items-center   cursor-pointer hover:bg-gray-100  transition-all duration-[0.2s]"
                      onClick={logoutHandler}
                    >
                      {" "}
                      Log Out{" "}
                      <p className="inline-block ml-[2.5vw] text-center  text-[4.5vw] translate-y-[-0.4vh] mt-[1vh]">
                        <CgProfile />
                      </p>
                    </h1>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/"}>
                    <h1
                      className="   h-[5vh] px-[1vw]  py-[1vh] font-[500]  flex items-center   cursor-pointer   transition-all duration-[0.2s]"
                      onClick={loginHandler}
                    >
                      {" "}
                      Login{" "}
                      <p className="inline-block text-center ml-[1vw] text-[5vw] translate-y-[-0.4vh] mt-[1vh]">
                        <CgProfile />
                      </p>
                    </h1>
                  </Link>
                </>
              )}
            </div>

            <p
              className="translate-y-[30vh]   text-[2rem] vsm:translate-y-[20vh] vsm:translate-x-[32vw]  w-[7vw] h-[4vh] items-center  text-white  flex rounded-full justify-center  translate-x-[30vw] transition ease-in  duration-[1s]"
              onClick={() => setmenu(!menu)}
            >
              <IoCloseOutline />
            </p>
          </div>
        </div>

        {/* menu div end for mobile devices */}

        {/* categori div start */}

        <div
          className="  items-center  cursor-pointer relative  hidden sm:flex "
          onClick={() => setdown(!down)}
        >
          <h2 className="font-[500] text-[16px]">Category</h2>
          <p
            className={`translate-y-[3.5px] ml-[2px] transition ease-in-out duration-[0.4s] ${
              down ? "rotate-[180deg]" : ""
            }  `}
          >
            {<IoIosArrowDown />}
          </p>

          {down ? (
            <>
              <div
                className={`absolute animate w-[15vw]   top-[5vh] transition ease-in-out duration-[0.4s] rounded-[5px] bg-white py-[10px] px-[10px]   `}
                onMouseLeave={() => setdown(false)}
              >
                {categories.map((i, index) => (
                  <Link
                    to={`category/${i.name}`}
                    key={index}
                    className="list-none  w-[25vw] text-gray-500 block hover:text-black hover:font-[450]  pr-[50px]  font-[400] text-[16px]"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {/* categori div end */}

        {!user ? (
          <>
            <Link
              className=" hidden sm:flex items-center gap-[8px] "
              onClick={loginHandler}
            >
              <p className="text-[1.3vw] translate-y-[1.5px]">
                <CgProfile />
              </p>
              <h1 className="text-[18px]">Login</h1>
            </Link>
          </>
        ) : (
          <>
            {user?.role === "admin" ? (
              <>
                <p
                  className="hidden sm:flex items-center gap-[3px]  cursor-pointer "
                  onClick={() => setadminNav(!adminNav)}
                >
                  <p className="text-[1.150vw] translate-y-[-0.5px]">
                    <GrUserAdmin />
                  </p>
                  <h1 className="text-[18px]">Admin</h1>
                </p>
              </>
            ) : (
              <></>
            )}

            <Link
              to="/cart"
              className="sm:flex relative gap-2 hidden items-center"
            >
              <FaCartArrowDown />
              <p className="font-500 text-[18px] ">Cart</p>

              {cartLength > 0 && (
                <div className="bg-[#ee3f3fc8] absolute text-[12px] text-white flex items-center justify-center h-[1.2vw] w-[1.2vw] top-[5px] left-[50px] rounded-full">
                  {cartLength}
                </div>
              )}
            </Link>

            <Link
              className=" hidden sm:flex items-center gap-[4px] "
              onClick={logoutHandler}
            >
              <p className="text-[1.3vw] translate-y-[1.5px]">
                <IoIosLogOut />
              </p>
              <h1 className="text-[18px]">Logout</h1>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
