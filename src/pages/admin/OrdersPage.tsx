
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: any[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching orders",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Process the data to ensure items is properly parsed as an array
    const processedOrders = data.map(order => ({
      ...order,
      items: Array.isArray(order.items) ? order.items : 
              typeof order.items === 'string' ? JSON.parse(order.items) : 
              order.items || []
    })) as Order[];

    setOrders(processedOrders);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order updated",
      description: `Order status changed to ${status}`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>
                {order.items.map((item: any, index: number) => (
                  <div key={item.id || index}>{item.quantity}x {item.name}</div>
                ))}
              </TableCell>
              <TableCell>${order.total_amount.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                  disabled={order.status !== 'pending'}
                  size="sm"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, 'cancelled')}
                  disabled={order.status !== 'pending'}
                  variant="destructive"
                  size="sm"
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
