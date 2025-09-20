import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import BasePage from "./pages/BasePage";
import Login from "./pages/Login";
import Notifications from "./components/UI/Notifications";
import AccountCreation from "./pages/AccountCreation";

function App() {
  const rotues = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          element: <BasePage />,
          index: true,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "create-account",
          element: <AccountCreation />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="overflow-x-hidden">
        <RouterProvider router={rotues} />
        <Notifications />
      </div>
    </>
  );
}

export default App;
