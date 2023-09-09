import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="371111903557-r0pl8vfnfijnvo1r90etuajrebdlgbqm.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
