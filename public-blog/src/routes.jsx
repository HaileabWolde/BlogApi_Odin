//import App from "./App.jsx";
import Home from '../pages/HomePages';
import Login from '../pages/login';
import ErrorPage from '../pages/errorPage';
import DetailPage from '../pages/detailPage';
import TagPage from '../pages/tagPage';
import EachTagPage from '../pages/detailTagpage';
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
  },
  {
    path: "/allTags",
    element: <TagPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/tag/:id",
    element: <EachTagPage/>,
    errorElement: <ErrorPage/>
  }
  
  
];

export default routes;