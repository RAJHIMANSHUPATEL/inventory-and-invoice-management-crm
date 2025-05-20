import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SidebarProvider, SidebarTrigger, Sidebar } from "@/components/ui/sidebar"
import { AppSidebar } from './components/app-sidebar'
import { Route, Routes } from 'react-router'
import Dashboard from './app-components/Dashboard'
import Products from './app-components/products/Products'

function App() {

  return (
    <>
      <SidebarProvider defaultOpen>
        <AppSidebar />
            <SidebarTrigger />
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/products" element={<Products/>} />
            </Routes>
      </SidebarProvider>
    </>
  )
}

export default App
