"use client";

import { useState } from "react";
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, XCircle, Clock } from "lucide-react";

const invoicesData = [
  { id: "INV-2026-001", supplier: "TechCorp Systems", date: "2026-04-28", amount: "$4,500.00", status: "Pending", due: "2026-05-15" },
  { id: "INV-2026-002", supplier: "Office Supplies Co", date: "2026-04-25", amount: "$345.50", status: "Approved", due: "2026-05-10" },
  { id: "INV-2026-003", supplier: "Marketing Solutions", date: "2026-04-20", amount: "$12,000.00", status: "Paid", due: "2026-04-30" },
  { id: "INV-2026-004", supplier: "Cloud Hosting LLC", date: "2026-04-29", amount: "$890.00", status: "Pending", due: "2026-05-01" },
  { id: "INV-2026-005", supplier: "Legal Partners", date: "2026-04-15", amount: "$2,500.00", status: "Overdue", due: "2026-04-25" },
];

export default function AccountsPayable() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500"><CheckCircle2 size={12} /> Paid</span>;
      case "Approved":
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"><CheckCircle2 size={12} /> Approved</span>;
      case "Pending":
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500"><Clock size={12} /> Pending</span>;
      case "Overdue":
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500"><XCircle size={12} /> Overdue</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Payable</h1>
          <p className="text-muted-foreground mt-1">Manage and approve supplier invoices.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20">
            Process Batch
          </button>
        </div>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher factures ou fournisseurs..."
              className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="px-3 py-2 border border-border bg-background rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <Filter size={16} /> Filter Status
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Supplier</th>
                <th className="px-6 py-4 font-medium">Invoice Date</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoicesData.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">{invoice.id}</td>
                  <td className="px-6 py-4">{invoice.supplier}</td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.due}</td>
                  <td className="px-6 py-4 text-right font-medium">{invoice.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
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
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground bg-card/50">
          <div>Showing 1 to 5 of 24 results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
