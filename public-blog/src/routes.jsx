import {Navigate } from 'react-router-dom'
//import App from "./App.jsx";
import Home from '../pages/HomePages';
import ErrorPage from '../pages/errorPage';
const routes = [
  {
   path: "/", 
   element: <Home/>,   
    errorElement: <ErrorPage />,
  }
  
  
];

export default routes;