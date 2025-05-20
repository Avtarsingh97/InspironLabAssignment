import Home from "../pages/Home";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Dashboard from "../pages/Dashboard";




const routes = [
    {path:'/',element:<Home/>, isProtected:false},
    {
        path : '/signup',
        element : <Signup/>,
        isProtected : false
    },
    {
        path : '/signin',
        element : <Signin/>,
        isProtected : false
    },
    {
        path : '/dashboard',
        element : <Dashboard/>,
        isProtected : true
    }
]

export default routes;