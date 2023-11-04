import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Deals from "../pages/Deals";
import Details from "../pages/Details";
import AddCar from "../pages/AddCar";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/sign-up" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Deals />
          </PrivateRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        }
      />
      <Route
        path="/addcar"
        element={
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
