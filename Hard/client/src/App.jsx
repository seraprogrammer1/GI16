import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ListTask from "./components/ListTask.jsx";
import AddTask from "./components/AppTask.jsx";
import EditTask from "./components/EditTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/listTask" replace={true} />,
  },
  {
    path: "/addTask",
    element: <AddTask />,
  },
  {
    path: "/listTask",
    element: <ListTask />,
  },
  {
    path: "/editTask/:id",
    element: <EditTask />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
