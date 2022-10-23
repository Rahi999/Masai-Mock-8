import React from "react";
import { Box } from "@chakra-ui/core";
import Main from "./Components/Main";
import AllRoutes from "./Components/AllRoutes";

export default function App() {
  // https://fakestoreproducts.herokuapp.com/hotel
  // https://fakestoreproducts.herokuapp.com/users

  return (
    <Box>
      <AllRoutes />
    </Box>
  );
}
