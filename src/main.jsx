import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./Pages/Homepage.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<App />}>
        <Route index={true} element={<HomePage type={"homepage"} />} />
        <Route path="/ShopPage" element={<HomePage type={"ShopPage"} />} />
        <Route
          path="/ShopPage/:brand"
          element={<HomePage type={"ShopPage"} />}
        />
        <Route
          path="/trackingdelivery"
          element={<HomePage type={"trackingdelivery"} />}
        />
        <Route
          path="/accountdetail"
          element={<HomePage type={"accountdetail"} />}
        />
        <Route
          path="/productdetail/:productId"
          element={<HomePage type={"productdetail"} />}
        />
        <Route path="/dashboard" element={<HomePage type={"dashboard"} />} />
        <Route
          path="/createorder"
          element={<HomePage type={"createorder"} />}
        />
        <Route
          path="/shoppingcart"
          element={<HomePage type={"shoppingcart"} />}
        />
        <Route path="/checkout" element={<HomePage type={"checkout"} />} />
        <Route path="/success" element={<HomePage type={"success"} />} />
        <Route path="/search" element={<HomePage type={"search"} />} />
        <Route path="/contact" element={<HomePage type={"contact"} />} />
        <Route
          path="/ordersuccess"
          element={<HomePage type={"ordersuccess"} />}
        />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
