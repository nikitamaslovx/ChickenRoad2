import "./App.css";
import { useState, useEffect } from "react";
import Game from "./GameComponent/Game";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Route, Routes } from "react-router-dom";
import Payin from "./services/Payin";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Payout from "./services/Payout";
import Home from "./LandingPage/Home";
import LoadingPage from "./GameComponent/LoadingPage";

function App() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <div className="bg-boxColor ">
            {/* <Home /> */}
            {/* <Game /> */}
            {loading ? <LoadingPage /> : <Game />}
          </div>
          // {/* </ProtectedRoute> */}
        }
      />
      <Route
        path="/chickenroad"
        element={
          <ProtectedRoute>
            <div className="bg-boxColor h-[100dvh] overflow-hidden">
              <Game />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payin"
        element={
          <ProtectedRoute>
            <div className="bg-boxColor h-[100dvh] overflow-hidden">
              <Payin />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payout"
        element={
          // <ProtectedRoute>
          <div className="bg-boxColor h-[100dvh] overflow-hidden">
            <Payout />
          </div>
          // </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
