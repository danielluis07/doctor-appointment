"use client";

import { useOpenSidebar } from "@/hooks/use-open-sidebar";
import { cn } from "@/lib/utils";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useOpenSidebar();

  return (
    <main
      className={cn(
        "flex flex-col w-full h-full py-7 px-9 bg-gray-50",
        isOpen ? "md:pl-72" : "md:pl-24"
      )}>
      {children}
    </main>
  );
};

export default DashboardWrapper;
