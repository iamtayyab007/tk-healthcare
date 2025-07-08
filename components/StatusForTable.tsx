import React from "react";
import { StatusIcon } from "@/contants";
import Image from "next/image";
function StatusForTable({
  status,
}: {
  status: "schedule" | "cancelled" | "pending";
}) {
  console.log("status", status);
  if (status === "schedule") {
    return (
      <div className="flex flex-row items-center gap-1">
        <Image
          src={StatusIcon.schedule}
          alt="schedule"
          width={20}
          height={20}
        />
        <p>{status}</p>
      </div>
    );
  } else if (status === "pending") {
    return (
      <div className="flex flex-row items-center gap-1">
        <Image src={StatusIcon.pending} alt="pending" width={20} height={20} />
        <p>{status}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center gap-1">
        <Image
          src={StatusIcon.cancelled}
          alt="cancelled"
          width={20}
          height={20}
        />
        <p>{status}</p>
      </div>
    );
  }
}

export default StatusForTable;
