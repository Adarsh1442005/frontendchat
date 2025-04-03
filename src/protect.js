import { Navigate} from "react-router-dom";
 
const isAuthenticated=()=>{
    const token = localStorage.getItem("token");
    return !!token; 

};

const ProtectedRoute = ({ element: Component }) => {
    // Check if user is authenticated
    const isAuth = isAuthenticated();
  
    return isAuth ? Component : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;
  