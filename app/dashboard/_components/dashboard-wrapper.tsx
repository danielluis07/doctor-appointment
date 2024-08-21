"use client";

import { logOut } from "@/actions/logout";
import { useOpenSidebar } from "@/hooks/use-open-sidebar";
import { cn } from "@/lib/utils";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useOpenSidebar();

  return (
    <div>
      <nav>sidebar</nav>
      <main
        className={cn(
          "flex flex-col w-full h-full py-7 px-9 bg-gray-50",
          isOpen ? "md:pl-24" : "md:pl-72"
        )}>
        <nav>navbar</nav>
        <div onClick={() => logOut()}>logout</div>
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
