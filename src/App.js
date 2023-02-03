import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home/Home";
import Dashboard from "./component/Dashboard/Dashboard/Dashboard";
import "./App.css";
import ServiceList from "./component/Dashboard/ServiceList/ServiceList";
import AddService from "./component/Dashboard/AddService/AddService";
import MakeAdmin from "./component/Dashboard/MakeAdmin/MakeAdmin";
import Review from "./component/Dashboard/Review/Review";
import Adminservice from "./component/Dashboard/adminservice/adminservice";
import Login from "./component/Login/Login/Login";
import PrivateRoute from "./component/Login/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/service/:id"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/service"
          element={
            <PrivateRoute>
              <ServiceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/addService"
          element={
            <PrivateRoute>
              <AddService />
            </PrivateRoute>
          }
        />
        <Route
          path="/makeAdmin"
          element={
            <PrivateRoute>
              <MakeAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route path="/adminservice" element={<Adminservice />} />
      </Routes>
    </>
  );
};

export default App;
