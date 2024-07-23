import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./app.css";

import Index from "./components/Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/upcoming" replace={true} />,
  },
  {
    path: "/popular",
    element: <Index type={"popular"} />,
  },
  {
    path: "/top_rated",
    element: <Index type={"top_rated"} />,
  },
  {
    path: "/upcoming",
    element: <Index type={"upcoming"} />,
  },
  {
    path: "/now_playing",
    element: <Index type={"now_playing"} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
