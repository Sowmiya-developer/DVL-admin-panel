"use client";

import React, { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./components/SideBar/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter((segment) => segment !== "");

    const getTitle = (segment: string): string => {
      switch (segment) {
        case "dashboard":
          return "Dashboard";
        case "add-dept-user-role":
          return "Add New Department User Role";
          case "edit-dept-user-role":
            return "Edit User";
            
        default:
          return segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
      }
    };

    const redirectMap: Record<string, string> = {
      department: "/admin/users?tab=department",
      users: "/admin/users?tab=users",
      "patient-list": "/admin/patient-management?tab=patient-list",
      "patient-approval": "/admin/patient-management?tab=patient-approval",
      approvals: "/admin/app-users",
      "users-list": "/admin/app-users?tab=users-list",
    };

    return segments.map((segment, index) => ({
      title: getTitle(segment),
      path: `/${segments.slice(0, index + 1).join("/")}`,
      isLast: index === segments.length - 1,
      hide: segment === "admin" || segment === "account",  
      redirectTo:  redirectMap[segment] ?? null,
      
    }));
  };

  const breadcrumbs = getBreadcrumbs();


  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex md:justify-between h-20 items-center gap-2 
          sticky top-0 backdrop-blur-3xl bg-thirdcolor border-b border-[#E0E0E0] 
          z-10 px-4">
            <SidebarTrigger className="pl-2" />
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 pl-2">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs
                    .filter((item) => !item.hide) 
                    .map((item, index) => (
                      <React.Fragment key={item.path}>
                        <BreadcrumbItem>
                          {item.isLast ? (
                            <BreadcrumbPage className="text-primary font-medium">
                              {item.title}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={item.redirectTo ? item.redirectTo : item.path}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {item.title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index !== breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-4 sm:justify-end">
                {/* <Notification
                  hasNotification={notifications.length}
                  notifications={notifications}
                /> */}
              </div>
            </div>
          </header>
          <div className="h-auto">
            <Suspense>{children}</Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default Layout;