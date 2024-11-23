import React from "react";
import Other from "./Other";
import UseGetUserHooks from "../hooks/UseGetUserHooks";
import { useSelector } from "react-redux";

function OtherUsers() {
  UseGetUserHooks();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers){
 
    return;
  } 
  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return (<Other key={user._id} user={user} />)
      })}
    </div>
  );
}

export default OtherUsers;
