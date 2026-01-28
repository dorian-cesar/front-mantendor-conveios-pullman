"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    FileText,
    Package,
    Mail,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Zap,
    Building2,
    Handshake,
    Percent,
    Ticket,
    Shield,
    IdCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const mainNavItems = [
    {
        title: "Dashboard",
        href: "/test",
        icon: LayoutDashboard,
    },
    {
        title: "Boletos",
        href: "/test/eventos",
        icon: Ticket, // tabla EVENTOS (core)
    },
    {
        title: "Empresas",
        href: "/test/empresas",
        icon: Building2, // EMPRESAS
    },
    {
        title: "Convenios",
        href: "/test/convenios",
        icon: Handshake, // CONVENIOS
    },
    {
        title: "Descuentos",
        href: "/test/descuentos",
        icon: Percent, // DESCUENTOS + CODIGOS_DESCUENTO
    },
];


export const secondaryNavItems = [
    {
        title: "Usuarios y Roles",
        href: "/test/usuarios",
        icon: Users, // USUARIOS + TIPOS_USUARIO
    },
    {
        title: "Roles",
        href: "/test/roles",
        icon: Shield, // ROLES + USUARIO_ROLES
    },
    {
        title: "Pasajeros",
        href: "/test/pasajeros",
        icon: IdCard,
    },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
                    collapsed ? "w-[72px]" : "w-64"
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        {collapsed ? (
                            <div className="flex h-10 w-full items-center justify-center">
                                <img
                                    src="/logo-wit-mini-dark.png"
                                    alt="logo-wit"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-10 w-full items-center justify-center">
                                <img
                                    src="/logo-wit-dark.png"
                                    alt="logo-wit"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )
                        }
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="flex flex-col gap-1">
                        {mainNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const NavContent = (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors relative",
                                        isActive
                                            ? "bg-sidebar-accent text-sidebar-primary"
                                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {!collapsed && (
                                        <>
                                            <span>{item.title}</span>
                                        </>
                                    )}
                                </Link>
                            );

                            if (collapsed) {
                                return (
                                    <Tooltip key={item.href}>
                                        <TooltipTrigger asChild>{NavContent}</TooltipTrigger>
                                        <TooltipContent side="right" className="flex items-center gap-2">
                                            {item.title}
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return NavContent;
                        })}
                    </div>

                    <div className="my-4 border-t border-sidebar-border" />

                    <div className="flex flex-col gap-1">
                        {secondaryNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const NavContent = (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-sidebar-accent text-sidebar-primary"
                                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {!collapsed && <span>{item.title}</span>}
                                </Link>
                            );

                            if (collapsed) {
                                return (
                                    <Tooltip key={item.href}>
                                        <TooltipTrigger asChild>{NavContent}</TooltipTrigger>
                                        <TooltipContent side="right">{item.title}</TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return NavContent;
                        })}
                    </div>
                </nav>

                <div className="border-t border-sidebar-border p-3">
                    {collapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Cerrar sesión</TooltipContent>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                            <LogOut className="h-5 w-5" />
                            Cerrar sesión
                        </Button>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="absolute -right-3 top-5 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar hover:bg-sidebar-accent"
                >
                    {collapsed ? (
                        <ChevronRight className="h-3 w-3" />
                    ) : (
                        <ChevronLeft className="h-3 w-3" />
                    )}
                </Button>
            </aside>
        </TooltipProvider>
    );
}
