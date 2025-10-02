import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from 'react'
import Layout from "./Layout";
import Home from "./pages/user/Home";

const router = createBrowserRouter([
    { 
      path: "/", 
      element: <Layout />,
      children: [
        {
            path: "/",
            element: <Home />,
        }
      ]
    },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App