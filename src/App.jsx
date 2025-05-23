import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Route, Routes } from "react-router";
import Dashboard from "./app-components/Dashboard";
import Products from "./app-components/products/Products";
import Navbar from "./app-components/Navbar";

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
            </Routes>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
