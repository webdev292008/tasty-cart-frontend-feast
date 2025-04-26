
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth";
import AdminLayout from "./components/admin/AdminLayout";
import OrdersPage from "./pages/admin/OrdersPage";
import MenuPage from "./pages/admin/MenuPage";
import GalleryPage from "./pages/admin/GalleryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/order" element={<Order />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<OrdersPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="gallery" element={<GalleryPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
