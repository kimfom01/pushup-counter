import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartNoAxesCombined, History, Dumbbell, Home } from "lucide-react";
import Link from "next/link";

export const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Counter", url: "/dashboard/counter", icon: Dumbbell },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: ChartNoAxesCombined,
  },
  { title: "History", url: "/dashboard/history", icon: History },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="text-xl font-bold m-4">
            <Link href={"/"}>Pushup Counter</Link>
          </div>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
