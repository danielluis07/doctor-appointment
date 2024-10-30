import { auth } from "@/auth";
import DashboardWrapper from "../patient/_components/dashboard-wrapper";
import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

export default async function PatientDashboardLayout({
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
