import "./App.css";
import PlatformLayout from "./components/PlatformLayout/PlatformLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Orders from "./pages/Orders/Orders";
import Admins from "./pages/Admins/Admins";
import Settings from "./pages/Settings/Settings";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";

const App = () => {
  return (
    <BrowserRouter>
      <PlatformLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/settings" element={<Settings />} />
          {/* Handle Error Page as well */}
        </Routes>
      </PlatformLayout>
    </BrowserRouter>
  );
};

export default App;
