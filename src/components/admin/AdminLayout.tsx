
import { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <SidebarContent>
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Admin Dashboard</h2>
                <div className="space-y-1">
                  <Link to="/admin/orders">
                    <Button variant="ghost" className="w-full justify-start">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                  </Link>
                  <Link to="/admin/menu">
                    <Button variant="ghost" className="w-full justify-start">
                      <Menu className="mr-2 h-4 w-4" />
                      Menu
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-auto p-4 space-y-2">
              {/* New Back to Website button */}
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Website
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                className="w-full justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
