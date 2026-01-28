"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">
                            {theme === "light" ? (
                                <Sun className="h-4 w-4" />
                            ) : theme === "dark" ? (
                                <Moon className="h-4 w-4" />
                            ) : (
                                <Monitor className="h-4 w-4" />
                            )}
                        </div>
                        <span>Tema</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Seleccionar tema</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex items-center gap-2",
                        theme === "light" && "bg-accent"
                    )}
                >
                    <div className="flex items-center gap-2 flex-1">
                        <Sun className="h-4 w-4" />
                        <span>Claro</span>
                    </div>
                    {theme === "light" && (
                        <div className="h-2 w-2 rounded-full bg-primary ml-auto" />
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex items-center gap-2",
                        theme === "dark" && "bg-accent"
                    )}
                >
                    <div className="flex items-center gap-2 flex-1">
                        <Moon className="h-4 w-4" />
                        <span>Oscuro</span>
                    </div>
                    {theme === "dark" && (
                        <div className="h-2 w-2 rounded-full bg-primary ml-auto" />
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex items-center gap-2",
                        theme === "system" && "bg-accent"
                    )}
                >
                    <div className="flex items-center gap-2 flex-1">
                        <Monitor className="h-4 w-4" />
                        <span>Sistema</span>
                    </div>
                    {theme === "system" && (
                        <div className="h-2 w-2 rounded-full bg-primary ml-auto" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}