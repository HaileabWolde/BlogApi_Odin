//import App from "./App.jsx";
import Home from '../pages/HomePages';
import Login from '../pages/login';
import ErrorPage from '../pages/errorPage';
import DetailPage from '../pages/detailPage';
const routes = [
  {
   path: "/", 
   element: <Home/>,   
    errorElement: <ErrorPage />,
  },
  {
    path: "/post/:id",
    element: <DetailPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  }
  
  
];

export default routes;