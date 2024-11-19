import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
function SideBar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form action="" className="flex items-center gap-2">
        <input
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers/>
      <div className="mt-2">
        <button className="btn btn-sm">Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
