import Image from "next/image";
import React from "react";

type StatusProps = {
  icon: "schedule" | "pending" | "cancelled";
  count: number;
};

function StatusType({ icon, count }: StatusProps) {
  switch (icon) {
    case "schedule":
      return (
        <>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/assets/icons/appointments.svg"
              alt="appointments"
              height={40}
              width={40}
            />
            <h2 className="text-2xl font-bold">{count}</h2>
          </div>
          <h3>Total Number of scheduled appointments</h3>
        </>
      );

    case "pending":
      return (
        <>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/assets/icons/pending.svg"
              alt="pendings"
              height={40}
              width={40}
            />
            <h2 className="text-2xl font-bold">{count}</h2>
          </div>
          <h3>Total Number of pending appointments</h3>
        </>
      );

    case "cancelled":
      return (
        <>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/assets/icons/cancelled.svg"
              alt="cancelled"
              height={40}
              width={40}
            />
            <h2 className="text-2xl font-bold">{count}</h2>
          </div>
          <h3>Total Number of cancelled appointments</h3>
        </>
      );

    default:
      return null;
  }
}

function Status({ icon, count }: StatusProps) {
  return (
    <>
      <div className="bg-gray-700 rounded-xl w-[450px] p-5 flex flex-col gap-7">
        <StatusType icon={icon} count={count} />
        {/* <div className="flex flex-row gap-2 items-center">
        <Image
          src="/assets/icons/appointments.svg"
          alt="appointments"
          height={40}
          width={40}
        />
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
      <h3>Total Number of scheduled appointments</h3> */}
      </div>
    </>
  );
}

export default Status;
