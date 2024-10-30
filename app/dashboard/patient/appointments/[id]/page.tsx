import { auth } from "@/auth";
import { Appointment } from "./_components/appointment";
import { getUserPatient } from "@/queries/users/get-patient";

const AppointmentPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const data = await getUserPatient(session.user.id);

  if (!data) {
    return <div>Patient not found</div>;
  }

  return <Appointment id={params.id} patientId={data?.patient?.id} />;
};

export default AppointmentPage;
