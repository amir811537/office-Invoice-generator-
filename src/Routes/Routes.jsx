import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import Details from "../Components/pages/Details";
import Selling from "../Components/pages/Selling";
import AddCustomer from "../Components/pages/Addcustomer";
import Dailyreport from "../Components/pages/Dailyreport";



const router=createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/dailyReport',
                element:<Dailyreport></Dailyreport>
            },
            {
                path:'/AddCustomer',
                element:<AddCustomer></AddCustomer>
            },
            {
                path:'/details',
                element: <Details></Details>
            },
            {
                path:'/selling',
                element: <Selling></Selling>
            },
            
        ]
    }
]);
export default router;