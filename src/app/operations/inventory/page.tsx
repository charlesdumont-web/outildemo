"use client";

import { useState } from "react";
import { Search, Filter, AlertTriangle, ArrowRightLeft, Upload } from "lucide-react";

const inventoryData = [
  { id: "SKU-8921", name: "Dell XPS 15 Laptops", category: "Hardware", inStock: 45, reorderLevel: 20, status: "Healthy" },
  { id: "SKU-8922", name: "Ergonomic Chairs", category: "Furniture", inStock: 12, reorderLevel: 15, status: "Low Stock" },
  { id: "SKU-8923", name: "AWS Server Credits (Months)", category: "Software", inStock: 3, reorderLevel: 6, status: "Critical" },
  { id: "SKU-8924", name: "Network Switches", category: "Hardware", inStock: 28, reorderLevel: 10, status: "Healthy" },
  { id: "SKU-8925", name: "Office Desks", category: "Furniture", inStock: 5, reorderLevel: 5, status: "Reorder" },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Healthy":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Healthy</span>;
      case "Low Stock":
      case "Reorder":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">{status}</span>;
      case "Critical":
        return <span className="flex items-center gap-1 w-max px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500"><AlertTriangle size={12} /> {status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track stock levels and manage supplier receipts.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <ArrowRightLeft size={16} /> Transfer
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center gap-2">
            <Upload size={16} /> Receive Shipment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold mt-1">$245,890.00</p>
        </div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500">
          <p className="text-sm text-muted-foreground">Items to Reorder</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-red-500">
          <p className="text-sm text-muted-foreground">Critical Stock</p>
          <p className="text-2xl font-bold mt-1">3</p>
        </div>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search SKU or product name..." 
              className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-3 py-2 border border-border bg-background rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">In Stock</th>
                <th className="px-6 py-4 font-medium text-right">Reorder Level</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{item.id}</td>
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-right font-medium">{item.inStock}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{item.reorderLevel}</td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
