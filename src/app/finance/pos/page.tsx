"use client";

import { useState } from "react";
import { Search, Filter, Plus, PackageOpen, MoreHorizontal } from "lucide-react";

const posData = [
  { id: "PO-2026-492", supplier: "TechCorp Systems", date: "2026-04-28", amount: "$4,500.00", items: 12, status: "Pending Approval" },
  { id: "PO-2026-491", supplier: "Office Supplies Co", date: "2026-04-24", amount: "$345.50", items: 45, status: "Approved" },
  { id: "PO-2026-490", supplier: "Hardware Depot", date: "2026-04-20", amount: "$2,300.00", items: 5, status: "Received" },
];

export default function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Received":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Received</span>;
      case "Approved":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">Approved</span>;
      case "Pending Approval":
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">Pending Approval</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1">Create and manage purchasing requests.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <PackageOpen size={16} /> Receive Items
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center gap-2">
            <Plus size={16} /> New PO
          </button>
        </div>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher un numéro de BC ou fournisseur..."
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
                <th className="px-6 py-4 font-medium">PO Number</th>
                <th className="px-6 py-4 font-medium">Supplier</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Items</th>
                <th className="px-6 py-4 font-medium text-right">Total Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posData.map((po) => (
                <tr key={po.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{po.id}</td>
                  <td className="px-6 py-4">{po.supplier}</td>
                  <td className="px-6 py-4 text-muted-foreground">{po.date}</td>
                  <td className="px-6 py-4 text-right">{po.items}</td>
                  <td className="px-6 py-4 text-right font-medium">{po.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(po.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
