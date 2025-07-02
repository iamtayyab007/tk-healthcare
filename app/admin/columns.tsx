"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type patientData = {
  id: string;
  patient: string;
  status: "pending" | "scheduled" | "cancelled";

  doctor: string;
  action: "schedule" | "cancel";
  $createdAt?: string;
};

export const columns: ColumnDef<patientData>[] = [
  {
    accessorKey: "fullName",
    header: "Patient",
  },
  {
    accessorKey: "$createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.$createdAt!);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", // "Jan", "Feb", etc.
        day: "numeric", // 1, 2, 3...
      });
    },
  },
  {
    accessorKey: "appointments.status",
    header: "Status",
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
  },
  {
    accessorKey: "",
    header: "Actions",
  },
];
