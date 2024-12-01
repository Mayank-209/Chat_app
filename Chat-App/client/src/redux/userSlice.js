import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
  name:"user",
  initialState:{
    authUser:null,
    otherUsers:null,
    selectedUser:null,
    onlineUsers:null,
    semiAuthUser:null,
  },
  reducers:{
    setAuthUser:(state,action)=>{
      state.authUser=action.payload;
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers=action.payload;
    },
    setSeletedUser:(state,action)=>{
    state.selectedUser=action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload
    },
    setSemiAuthUser:(state,action)=>{
      state.semiAuthUser=action.payload
    }

}
})
export const {setAuthUser,setOtherUsers,setSeletedUser,setOnlineUsers,setSemiAuthUser}=userSlice.actions;
export default userSlice.reducer;