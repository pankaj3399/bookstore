import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Books from "./Pages/Books";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import { useState } from "react";
import Cart from "./Pages/Cart";
import SuccessOrder from "./Pages/SuccessOrder";
import FailedOrder from "./Pages/FailedOrder";
import SignIn from "./Pages/Admin/Signin";
import AdminBooks from "./Pages/Admin/AdminBooks";
import SalesTracking from "./Pages/Admin/SalesTracking";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar cart={cart} />
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/dashboard"
          element={<Books cart={cart} setCart={setCart} />}
        />
        <Route path="/success" element={<SuccessOrder />} />
        <Route path="/failed" element={<FailedOrder />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/sales" element={<SalesTracking />} />
      </Routes>
    </div>
  );
}

export default App;
