import { useOpenSidebar } from "@/hooks/use-open-sidebar";
import { cn } from "@/lib/utils";
import DashboardWrapper from "./_components/dashboard-wrapper";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@/auth";

export default async function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <Sidebar user={session.user} />
      <DashboardWrapper>
        <Navbar user={session.user} />
        {children}
      </DashboardWrapper>
    </div>
  );
}
