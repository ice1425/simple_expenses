// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Editexpense } from "./pages/Editexpense";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/edit/:id",
    element: <Editexpense />
  },
  // {
  //   path: "*",
  //   element: <Home />
  // }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
