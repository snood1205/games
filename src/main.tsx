import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

const root = document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  );
else
  console.error("Root element not found. Application cannot be rendered.");