"use client";

import StatusForTable from "@/components/StatusForTable";
import { Doctors } from "@/contants";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Appointment>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original.patient.userId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-gray-600">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(patient)}
            >
              Copy patient id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "#",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      const index = row.index;

      return <div className="text-left font-medium">{index + 1}</div>;
    },
  },
  {
    accessorKey: "patient",
    header: () => <div className="text-left">Patient</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.original.patient.fullName}
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.schedule);
      return `${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true, // for AM/PM format
      })}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusForTable status={row.original.status} />;
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-1">
          <Image
            src={doctor?.image || ""}
            alt="doctor"
            width={20}
            height={20}
          />
          <p>{doctor?.name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "",
    header: "Actions",
  },
];
