import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import Hotel from "./Hotel";
import Main from "./Main";
import User from "./User";

export default function AllRoutes() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>
      </div>
    </>
  );
}
