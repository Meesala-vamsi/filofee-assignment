import React from 'react'
import Home from './pages/Home/Home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100">
        <Home />
      </div>
    </>
  );
}

export default App;
