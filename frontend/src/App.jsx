import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from 'react'
import Layout from "./Layout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedRoute from "./components/main/ProtectedRoute.jsx";
import AuthContextProvider from "./pages/providers/AuthContextProvider.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element:
          <ProtectedRoute>
            <AdminPanel />,
          </ProtectedRoute>
      },
    ]
  },
]);

function App() {
  return <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
}

export default App