import { auth } from "@/auth";
import { getUserDoctor } from "@/queries/users/get-doctor";
import { AppointmentsClient } from "./_components/appointments-client";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
const AppointmentsPage = async () => {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const data = await getUserDoctor(session.user.id);

  if (!data) {
    return <div>Doctor not found</div>;
  }

  return (
    <Suspense fallback={<TableSkeleton />}>
      <AppointmentsClient doctorId={data.doctor?.id} />
    </Suspense>
  );
};

export default AppointmentsPage;
