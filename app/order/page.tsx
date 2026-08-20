'use client';

import { useEffect, useState } from 'react';

export default function OrderHistoryDashboard() {
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserOrders() {
      try {
        // 1. Fetch data from your custom proxy router /api/orders
        const response = await fetch('/api/orders?limit=20&page=1');
        const rawData = await response.json(); 

        // 2. Flatten the response schema dictionary out for clean client mapping loops
        const flattenedList = Object.entries(rawData).map(([id, details]) => ({
          id,
          ...(details as any)
        }));

        // 3. Save the clean list to your component state
        setOrdersList(flattenedList);
      } catch (error) {
        console.error("Failed to parse backend order dictionary map:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserOrders();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Syncing order history logs...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Your Sales Orders Ledger</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {ordersList.map((order) => (
          // 4. Now you can easily render <OrderCard key={order.id} item={order} />
          <div 
            key={order.id} 
            style={{ padding: '1rem', border: '1px solid #e4e4e7', borderRadius: '8px', background: '#fff' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#0070f3' }}>Order #{order.increment_id}</span>
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>{order.created_at}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>Status: <strong style={{ color: '#166534' }}>{order.status}</strong></span>
              <span>Total: <strong>${Number(order.grand_total).toFixed(2)} {order.store_currency_code}</strong></span>
            </div>
          </div>
        ))}

        {ordersList.length === 0 && <p>No structural order history found.</p>}
      </div>
    </div>
  );
}
