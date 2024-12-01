import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"
const useGetRealTimeMsg=()=>{
     const {messages}=useSelector(store=>store.message)
     const {socket}=useSelector(store=>store.socket)
     const dispatch=useDispatch()
     useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
           if(!messages){
            dispatch(setMessages([newMessage]))
           }
           else{
           dispatch(setMessages([...messages,newMessage]))
           }
        })

        return ()=>socket?.off("newMessage")
     },[socket,setMessages,messages])
}
export default useGetRealTimeMsg