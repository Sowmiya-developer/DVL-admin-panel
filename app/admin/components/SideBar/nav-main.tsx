"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
export function NavMain({
  items,
}: // Accept onNavigate function to close sidebar
{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname(); // Get the current route

  const onNavigate = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="pb-9"></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive = pathname.startsWith(item.url); // Dynamically check active state

          return (
            <SidebarMenuItem key={index}>
              <Link href={item.url}>
                <SidebarMenuButton
                  onClick={() => onNavigate()}
                  className={`justify-start rounded-lg w-full hover:bg-transparent px-2 h-12 text-center text-[16px] 
                      ${
                        isActive ? "bg-primary text-white hover:bg-activeColor hover:text-white" : "text-black"
                      }
                    `}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
