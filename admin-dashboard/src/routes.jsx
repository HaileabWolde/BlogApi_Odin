import {Navigate } from 'react-router-dom'
//import App from "./App.jsx";
import Login from '../pages/login.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';
import ErrorPage from "../errorPage/ErrorPage.jsx";
import Dashboard from '../pages/dashboard.jsx';
import New_Post from '../pages/new_post/new_post.jsx';
const routes = [
  {
   path: "/", 
   element:   localStorage.getItem('token') ?  <Navigate to="/dashboard" replace />: 
   <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute>
                    <Dashboard/>
         </ProtectedRoute>
  },
  {
    path: '/posts/new',
    element: <ProtectedRoute>
                   <New_Post/>
         </ProtectedRoute>
            
  }
  
];

export default routes;