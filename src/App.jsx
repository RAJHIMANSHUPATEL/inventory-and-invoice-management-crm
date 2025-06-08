import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Navbar from "./app-components/Navbar";
import AddProducts from "./app-components/products/AddProducts";
import Brand from "./pages/Brand";
import AddBrand from "./app-components/brand/AddBrand";

function App() {
  return (
    <>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <main className="w-full">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add-products" element={<AddProducts />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/brand/add-brand" element={<AddBrand />} />
            </Routes>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
