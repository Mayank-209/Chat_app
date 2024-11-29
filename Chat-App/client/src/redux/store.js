import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import messageReducer from "./messageSlice"


const store=configureStore({
  reducer:{
     user:userSlice,
     message:messageReducer
  }
}
)
export default store;