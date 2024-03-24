import React from "react";
import { Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FormPage } from "./User/signup";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <Loginorsignup />
      <FormPage />
    </div>
  );
}

function Loginorsignup() {
  return (
    <IconButton>
      <Person />
    </IconButton>
  );
}

export default App;
