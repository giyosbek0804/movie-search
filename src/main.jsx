import { StrictMode } from "react";
// import { Main } from "./App.jsx";
import { createRoot } from "react-dom/client";
// import { Map } from "./App.jsx";
// import { Testing } from "./App.jsx";
import { ApiCall } from "./sources/api.js";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    {/* <Main
      headerText="this is first one"
      text="1this is just a random text with good looking style"
    /> */}
    {/* <Map /> */}
      {/* <Testing/> */}
      <ApiCall />
    </BrowserRouter>
  </StrictMode>
);
