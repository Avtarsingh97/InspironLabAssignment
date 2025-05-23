import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  {
    path: "/signup",
    element: <Signup />,
    isProtected: false,
  },
  {
    path: "/signin",
    element: <Signin />,
    isProtected: false,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path:'*',
    element:<NotFound/>,
    isProtected:false,
  }
];

export default routes;
