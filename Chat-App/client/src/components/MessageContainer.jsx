import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSeletedUser } from "../redux/userSlice";

function MessageContainer() {
  const {selectedUser,authUser} = useSelector(store=>store.user)
  const dispatch=useDispatch()
  useEffect(()=>{
     return ()=>dispatch(setSeletedUser(null))
  },[])
  return (
    <>
    {selectedUser!==null?(
      <div className="md:min-w-[550px] flex flex-col">
      <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2">
        <div className="avatar online">
          <div className="w-12 rounded-full ">
            <img
              src={selectedUser?.profilepic}
              alt="user-profile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
    ): (<div className="md:min-w-[450px] flex flex-col justify-center items-center">
      <h1 className="text-4xl text-white">Hello, {authUser?.fullName}</h1>
      <h1 className="text-2xl text-white">Let's Start a convertion</h1></div>)}
    </>
    
  );
}

export default MessageContainer;
