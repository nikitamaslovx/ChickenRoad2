// components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const ProtectedRoute = ({ children }) => {
//   const user_id = localStorage.getItem("userid");

//   // If user_id is not present, redirect to login
//   if (!user_id) {
//     return (
//       <>
//         <Navigate to="/" replace />;
//         toast.success("Login required!");
//       </>
//     );
//     // return toast.success("Login required!");
//     ;
//   }

//   // If authenticated, render the protected component
//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user_id = localStorage.getItem("userid");

  if (!user_id) {
    return <Navigate to="/" replace state={{ fromProtected: true }} />;
  }

  return children;
};

export default ProtectedRoute;

