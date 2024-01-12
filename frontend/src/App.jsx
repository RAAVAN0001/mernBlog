import React from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";

function App() {
  return (
    <Router>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
        }}
        display={"flex"}
        bgcolor={"#191919"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
        </Routes>
      </Box>
    </Router>

  );
}

export default App;
