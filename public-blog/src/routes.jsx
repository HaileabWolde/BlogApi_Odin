import {Navigate } from 'react-router-dom'
//import App from "./App.jsx";
import Home from '../pages/HomePages';
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
  }
  
  
];

export default routes;