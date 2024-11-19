import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './App.css';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";



const router=createBrowserRouter([{
  path:"/",
  element:<HomePage/>
},
{
  path:"/register",
  element:<SignUp/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/Auth",
  element:<AuthPage/>
}])
function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
