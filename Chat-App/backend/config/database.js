import mongoose from "mongoose"
const connectdb=async ()=>{
await mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("database connected");

}).catch((error)=>{
  console.log(error);
})
}
export default connectdb;