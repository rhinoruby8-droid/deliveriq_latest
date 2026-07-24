import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export interface DashboardConfig {
  sidebar?: {
    logo?: {
      text?: string;
      image?: string;
      href?: string;
    };
    navigation?: {
      main?: Array<{
        title: string;
        href: string;
        icon?: React.ComponentType<{ className?: string }>;
        active?: boolean;
        badge?: string | number;
      }>;
      secondary?: Array<{
        title: string;
        href: string;
        icon?: React.ComponentType<{ className?: string }>;
      }>;
    };
    footer?: React.ReactNode;
    className?: string;
  };
  main?: {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    padding?: boolean;
    className?: string;
  };
}

interface DashboardProps {
  children: React.ReactNode;
  config?: DashboardConfig;
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export default function Dashboard({
  children,
  config = {},
  className
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    sidebar = {},
    main = {}
  } = config;

  const {
    logo = { text: "Dashboard" },
    navigation = {},
    footer: sidebarFooter,
    className: sidebarClassName
  } = sidebar;

  const {
    maxWidth = "full",
    padding = true,
    className: mainClassName
  } = main;

  return (
    <div className={cn("flex h-full w-full overflow-hidden bg-muted text-foreground", className)}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-56 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        sidebarClassName
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-14 items-center justify-between px-4 border-b border-border">
            {logo.href ? (
              <a href={logo.href} className="flex items-center gap-2 font-semibold text-sm">
                {logo.image && (
                  <img src={logo.image} alt={logo.text} className="h-5 w-5" />
                )}
                {logo.text && <span>{logo.text}</span>}
              </a>
            ) : (
              <div className="flex items-center gap-2 font-semibold text-sm">
                {logo.image && (
                  <img src={logo.image} alt={logo.text} className="h-5 w-5" />
                )}
                {logo.text && <span>{logo.text}</span>}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.main && navigation.main.length > 0 && (
              <div className="space-y-0.5">
                {navigation.main.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border",
                        item.active
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "text-muted-foreground border-transparent hover:bg-background/50 hover:text-foreground"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="flex-1">{item.title}</span>
                      {item.badge !== undefined && (
                        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted border border-border/40 px-1 text-xs text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}

            {navigation.secondary && navigation.secondary.length > 0 && (
              <>
                <div className="my-4 border-t border-border" />
                <div className="space-y-1">
                  {navigation.secondary.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </nav>

          {/* Sidebar Footer */}
          {sidebarFooter && (
            <div className="border-t border-border p-3 text-xs text-muted-foreground">
              {sidebarFooter}
            </div>
          )}
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative bg-muted text-foreground">
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: 'linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.03) 0%, transparent 70%)'
        }} />

        {/* Mobile menu trigger bar (only shown on mobile since header is gone) */}
        <div className="lg:hidden flex h-10 items-center px-4 border-b border-border bg-background/60 backdrop-blur-md flex-shrink-0 justify-between relative z-10">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 px-2 flex items-center gap-1.5"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
            <span className="text-xs font-semibold">Dashboard Menu</span>
          </Button>
        </div>

        {/* Page Content — single scroll container */}
        <main className={cn(
          "flex-1 overflow-y-auto relative z-10",
          padding && "p-5 lg:p-8",
          mainClassName
        )}>
          <div className={cn(
            "mx-auto",
            maxWidthClasses[maxWidth]
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
