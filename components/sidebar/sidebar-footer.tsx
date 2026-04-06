"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
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

import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

export function SidebarFooterComponent() {
  const { isMobile } = useSidebar();

  const isPending = false;

  const user = {
    name: "kartikmishra",
    email: "kartikmishra@gmail.com",
    image: "/logo.png",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {isPending ? (
                  <div className="flex justify-center items-center w-8! h-8! text-muted-foreground">
                    <Spinner />
                  </div>
                ) : (
                  <Avatar className="rounded-lg w-8 h-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      <Skeleton className="rounded-full w-full h-full" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex-1 grid text-sm text-left leading-tight">
                  <span className="font-medium truncate">{user.name}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
                  <Avatar className="rounded-lg w-8 h-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      <Skeleton className="rounded-full w-full h-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 grid text-sm text-left leading-tight">
                    <span className="font-medium truncate">{user.name}</span>
                    <span className="text-xs truncate">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="bg-[#373669] !hover:bg-[#373669]/60 border-[#3e3e4a] font-medium text-[12px] text-white">
                  <Sparkles />
                  Pro Member
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
