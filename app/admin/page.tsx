import Image from "next/image";
import Status from "@/components/Status";
import {
  appointmentDetails,
  getAppointmentStatus,
} from "@/lib/actions/appointment.actions";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LogoutButton from "@/components/LogoutButton";

export default async function Admin() {
  const getAppointmentData = await getAppointmentStatus();
  const schedule = getAppointmentData?.schedule ?? [];
  const pending = getAppointmentData?.pending ?? [];
  const cancelled = getAppointmentData?.cancelled ?? [];
  //console.log("appointment", getAppointmentData);

  //const PatientData = await getAllPatientData();
  const fetchAppointmentData = await appointmentDetails();
  console.log("appointmentDetails", fetchAppointmentData);

  return (
    <div className="h-screen max-h-screen px-5 py-3">
      <header className="flex justify-between items-center bg-black rounded p-3">
        <div>
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="flex gap-3 items-center">
          {" "}
          <Image
            src="/assets/images/admin.png"
            alt="logo"
            width={40}
            height={40}
          />
          <h3>Admin</h3>
          <div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <section className="flex flex-col gap-2 p-7">
        <h1 className="text-2xl font-bold"> Welcome, Admin</h1>
        <p>Start day with managing new appointments</p>
      </section>
      <section className="p-5 flex flex-row gap-3">
        <Status icon="schedule" count={schedule} />
        <Status icon="pending" count={pending} />
        <Status icon="cancelled" count={cancelled} />
      </section>

      <section>
        <DataTable columns={columns} data={fetchAppointmentData} />
      </section>
    </div>
  );
}
