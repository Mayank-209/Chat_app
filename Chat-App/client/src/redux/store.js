import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import messageReducer from "./messageSlice"
import socketReducer from "./socketSlice"


const store=configureStore({
  reducer:{
     user:userSlice,
     message:messageReducer,
     socket:socketReducer
  }
}
)
export default store;