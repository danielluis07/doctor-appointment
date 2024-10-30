import { auth } from "@/auth";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { getUserPatient } from "@/queries/users/get-patient";
import { Suspense } from "react";
import { AppointmentsClient } from "./_components/appointments-client";

const AppointmentPage = async () => {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const data = await getUserPatient(session.user.id);

  if (!data) {
    return <div>Patient not found</div>;
  }

  return (
    <Suspense fallback={<TableSkeleton />}>
      <AppointmentsClient patientId={data?.patient?.id} />
    </Suspense>
  );
};

export default AppointmentPage;
