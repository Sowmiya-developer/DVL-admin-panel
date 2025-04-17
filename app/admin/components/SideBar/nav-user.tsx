"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Ghost,
  LogOut,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { removeToken } from "@/utils/auth";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  // const { isMobile } = useSidebar();
  const { isMobile, state } = useSidebar()
  const router = useRouter();
  const handleLogout = () => {
    // removeToken();
    router.push("/auth");
  };
  return (
    <SidebarMenu className="flex">
      <SidebarMenuItem>

        <DropdownMenu>
        <div className={`flex justify-end items-center ${state === "collapsed" ? "flex-col-reverse gap-6" : ""}`}>
          {/* <div className="flex flex-col-reverse justify-end items-center"> */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                {/* <AvatarFallback className="rounded-lg">MG</AvatarFallback> */}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
           {/* <Bell className="ml-auto size-4 z-50 cursor-pointer" onClick={openNotification} /> */}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

                              <div className="relative p-2 cursor-pointer" onClick={() => router.push("/admin/notification")}>
                <div className="absolute right-2 top-[4px] h-2 w-2 rounded-full bg-red-800 animate-pulse opacity-3"></div>
                <Bell size={25} className="ml-auto size-4 "  />
              </div>
          </div>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-none"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            style={{ transform: "translateX(13px)" }} // Move dropdown 20px to the left and add bottom margin 0
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  {/* <AvatarFallback className="rounded-lg">MG</AvatarFallback> */}
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
     

              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="hover:bg-activeColor hover:text-primary hover:cursor-pointer py-1">
              {/* <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem> */}

              <DropdownMenuItem className="hover:bg-activeColor hover:text-primary focus:bg-activeColor focus:text-primary">
                <Users />
                <Link href="/admin/account/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="hover:cursor-pointer hover:text-destructive pb-2 text-destructive">
              <LogOut />
              {/* <Link href="/auth">Log out</Link> */}
              <Button variant="ghost" className="px-0" onClick={handleLogout}>Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
