"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  MessageSquareText,
  CreditCard,
  FileText,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MessageCircle,
  MessagesSquare,
  FileSpreadsheet,
  TrendingUp,
  Bell,
  DollarSign,
  Landmark,
  PiggyBank,
  Users,
  UserPlus,
  CalendarDays,
  ClipboardCheck,
  BookOpen,
  Kanban,
  Target,
  Zap,
  FolderKanban,
  BarChart3,
  AlertTriangle,
  Clock,
  FileSignature,
  PenTool,
  Shield,
  Archive,
  HardHat,
  Briefcase,
  Truck,
  Building2,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

interface NavGroup {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  links: NavLink[];
}

const navGroups: NavGroup[] = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    links: [
      { name: "Vue d'ensemble", href: "/", icon: LayoutDashboard },
      { name: "Ventes & Pipeline", href: "/dashboard/sales", icon: TrendingUp },
      { name: "Alertes IA", href: "/dashboard/alerts", icon: Bell, badge: "5" },
    ],
  },
  {
    title: "Agents IA",
    icon: Bot,
    links: [
      { name: "Agent Courriel", href: "/agents/email", icon: Mail },
      { name: "Agent SMS Setter", href: "/agents/sms", icon: MessageSquareText },
      { name: "Agent Téléphonie", href: "/agents/phone", icon: Phone },
      { name: "Agent WhatsApp", href: "/agents/whatsapp", icon: MessageCircle },
      { name: "Clavardage Interne", href: "/agents/internal-chat", icon: MessagesSquare },
      { name: "Agent Soumission", href: "/agents/quote", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    links: [
      { name: "Comptes Payables", href: "/finance/payables", icon: CreditCard },
      { name: "Bons de Commande", href: "/finance/pos", icon: FileText },
      { name: "Extraction Factures", href: "/finance/extraction", icon: FileSpreadsheet, badge: "IA" },
      { name: "Trésorerie", href: "/finance/tresorerie", icon: PiggyBank },
      { name: "Budget Projet", href: "/finance/budget", icon: Landmark },
      { name: "Conciliation Bancaire", href: "/finance/reconciliation", icon: DollarSign },
    ],
  },
  {
    title: "CRM & Ventes",
    icon: Kanban,
    links: [
      { name: "Pipeline", href: "/crm/pipeline", icon: Kanban },
      { name: "Leads & Scoring", href: "/crm/leads", icon: Target },
    ],
  },
  {
    title: "Ressources Humaines",
    icon: Users,
    links: [
      { name: "Onboarding", href: "/hr/onboarding", icon: UserPlus },
      { name: "Absences & Vacances", href: "/hr/absences", icon: CalendarDays },
    ],
  },
  {
    title: "Projets",
    icon: FolderKanban,
    links: [
      { name: "Tableau de Bord", href: "/projects", icon: FolderKanban },
    ],
  },
  {
    title: "Documents",
    icon: FileSignature,
    links: [
      { name: "Contrats & Soumissions", href: "/documents/contracts", icon: PenTool },
      { name: "Signature Électronique", href: "/documents/esign", icon: FileSignature },
      { name: "Veille Réglementaire", href: "/documents/compliance", icon: Shield },
      { name: "Archivage Intelligent", href: "/documents/archive", icon: Archive },
    ],
  },
  {
    title: "Inventaire",
    icon: Package,
    links: [
      { name: "Gestion Inventaire", href: "/operations/inventory", icon: Package },
    ],
  },
  {
    title: "Modules Sectoriels",
    icon: Building2,
    links: [
      { name: "Construction", href: "/sectors/construction", icon: HardHat },
      { name: "Services Pro", href: "/sectors/services", icon: Briefcase },
      { name: "Distribution", href: "/sectors/distribution", icon: Truck },
      { name: "Immobilier", href: "/sectors/realestate", icon: Building2 },
    ],
  },
  {
    title: "Système",
    icon: Settings,
    links: [
      { name: "Paramètres", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navGroups.forEach((g) => (initial[g.title] = true));
    return initial;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={clsx(
        "bg-card border-r border-border flex flex-col transition-all duration-300 relative shrink-0",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-500/20">
              S
            </div>
            <span className="font-bold text-lg whitespace-nowrap text-foreground tracking-tight">
              Synchro <span className="text-primary">IA</span>
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              S
            </div>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted z-20 shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {navGroups.map((group) => {
          const GroupIcon = group.icon;
          const isOpen = openGroups[group.title];
          const hasActiveLink = group.links.some(
            (l) => pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
          );

          return (
            <div key={group.title} className="mb-1">
              {!collapsed ? (
                <button
                  onClick={() => toggleGroup(group.title)}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                    hasActiveLink ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    size={14}
                    className={clsx("transition-transform duration-200", !isOpen && "-rotate-90")}
                  />
                </button>
              ) : (
                <div className="flex justify-center py-2">
                  <GroupIcon size={16} className={hasActiveLink ? "text-primary" : "text-muted-foreground"} />
                </div>
              )}

              {(collapsed || isOpen) && (
                <ul className={clsx("space-y-0.5 px-2", collapsed ? "mt-0" : "mt-1")}>
                  {group.links.map((link) => {
                    const isActive =
                      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={clsx(
                            "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all text-[13px]",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                          title={collapsed ? link.name : undefined}
                        >
                          <Icon size={16} className="flex-shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                                {link.name}
                              </span>
                              {link.badge && (
                                <span
                                  className={clsx(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : link.badge === "IA"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "bg-red-500/20 text-red-400"
                                  )}
                                >
                                  {link.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* User */}
      <div className="p-3 border-t border-border shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex-shrink-0 shadow-sm" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">Admin</p>
              <p className="text-[11px] text-muted-foreground truncate">admin@synchro-ia.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-sm" />
          </div>
        )}
      </div>
    </aside>
  );
}
