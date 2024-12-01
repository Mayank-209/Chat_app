import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setSemiAuthUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const {semiAuthUser}=useSelector(store=>store.user)
  const dispatch=useDispatch()
  const [user, setUser] = useState({
    fullName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !(
        user.fullName &&
        user.userEmail &&
        user.password &&
        user.confirmPassword &&
        user.gender
      )
    ) {
      alert("All fields are mandatory");
      setUser({
        fullName: "",
        userEmail: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } else {
      if (user.confirmPassword !== user.password) {
        alert("Password does not Match");
        setUser({
          fullName: "",
          userEmail: "",
          password: "",
          confirmPassword: "",
          gender: "",
        });
      }
      else{
        console.log(user);
        
        dispatch(setSemiAuthUser(user))
       
        navigate("/auth")
      }
    }

    // try {
    //   const res = await axios.post(
    //     "http://localhost:5000/api/v1/user/register",
    //     user,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (res.data.success) {
    //     navigate("/login");
    //     toast.success(res.data.message);
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message)
    //   console.log(error);
    // }
    setUser({
      fullName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-400 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Email</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Your User Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Re-enter Your Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckBox("male")}
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckBox("female")}
                className="checkbox mx-2"
              />
            </div>
          </div>

          <p className="text-center my-2">
            Already have an account?
            <Link className="text-blue-300" to="/login">
              SignIn
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
