import { auth } from "@/auth";
import { Appointment } from "./_components/appointment";
import { getUserDoctor } from "@/queries/users/get-doctor";

const AppointmentPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const data = await getUserDoctor(session.user.id);

  if (!data) {
    return <div>Doctor not found</div>;
  }

  return <Appointment id={params.id} doctorId={data.doctor?.id} />;
};

export default AppointmentPage;
