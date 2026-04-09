import { ChevronDown, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import { ModelSelectorComponent } from "@/components/model-selector";
import { SessionUser } from "@/types";
import { UpgradeComponent } from "@/components/upgrade-component";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col bg-[#212121] h-dvh text-[#ececec]">
          <header className="flex justify-between items-center px-4 py-3 h-15 shrink-0">
            <div className="md:hidden flex">
              <SidebarTrigger />
            </div>
            <div className="hidden md:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 hover:bg-[#2f2f2f] px-2 py-1 focus-visible:ring-0 h-auto font-semibold text-[#b4b4b4] text-[18px]"
                  >
                    ConversionGPT <ChevronDown className="opacity-50 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#2f2f2f] p-2 border-[#424242] rounded-xl min-w-50 text-white">
                  <DropdownMenuItem className="focus:bg-[#424242] rounded-lg">
                    ConversionGPT Plus
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-[#424242] rounded-lg">
                    ConversionGPT
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <UpgradeComponent />

            <div className="flex items-center">
              <ModelSelectorComponent />
            </div>
          </header>

          <main className="relative flex flex-col flex-1 min-h-0">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
