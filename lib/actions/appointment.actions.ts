"use server";
import { ID } from "node-appwrite";
import { databases, messaging, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
const { DATABASE_ID, APPOINTMENT_COLLECTION_ID } = process.env;
const resend = new Resend(process.env.RESEND_API_KEY);
export const createAppointment = async (values: CreateAppointmentParams) => {
  try {
    const result = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      values
    );
    return parseStringify(result);
  } catch (error: any) {
    console.log(error?.response?.data || error?.message);
  }
};

export const getAppointmentDetails = async (id: string) => {
  try {
    const result = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      id
    );
    return parseStringify(result);
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};

export const getAppointmentStatus = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!
    );

    const dataCount = result.documents.map((stat) => stat.status);

    const statusCount = dataCount.reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    console.log("status", statusCount);
    const data = {
      pending: statusCount.pending || 0,
      schedule: statusCount.schedule || 0,
      cancelled: statusCount.cancelled || 0,
    };
    return parseStringify(data);
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};

export const appointmentDetails = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!
    );

    return parseStringify(result.documents);
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};

export const updateAppointmentData = async (
  //id: string,
  appointment: {
    appointmentId: string;
    userId: string;
    patientId?: string;
    primaryPhysician?: string;
    reason?: string;
    schedule?: string;
    cancellationReason?: string;
    type?: "create" | "schedule" | "cancelled";
    status: "create" | "schedule" | "cancelled";
  }
  //type: "schedule" | "cancel"
) => {
  try {
    const result = await databases.updateDocument(
      DATABASE_ID!, // databaseId
      APPOINTMENT_COLLECTION_ID!, // collectionId
      appointment.appointmentId!, // documentId
      {
        primaryPhysician: appointment.primaryPhysician,
        reason: appointment.reason,
        schedule: appointment.schedule,
        status: appointment.status,
      } // data (optional)
    );
    console.log("Document updated:", result);
    if (!result) {
      throw new Error("Appointment not found!");
    }
    console.log("appointmentType", appointment.type);
    const emailMessage = `Hi, it's CarePulse, ${
      appointment.status === "schedule"
        ? `Your appointment has been scheduled for ${appointment.schedule}`
        : `we regret to inform that your appointment has been cancelled. 
        Reason ${appointment.cancellationReason}`
    }`;
    console.log("emailmessage", emailMessage);
    const subject = "Appointment Details";
    //await sendEmailNotification(subject, emailMessage, appointment.userId);
    await sendEmail(subject, emailMessage);
    revalidatePath("/admin");
    return parseStringify(result);
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
  }
};

// export const sendEmailNotification = async (
//   subject: string,
//   content: string,
//   userId: string
// ) => {
//   try {
//     const message = await messaging.createEmail(
//       ID.unique(),
//       subject,
//       content,
//       [],
//       [userId]
//     );

//     console.log("message", message);
//     return parseStringify(message);
//   } catch (error: any) {
//     console.log(error?.response?.data || error.message);
//   }
// };
export const sendEmail = async (subject: string, content: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["tayyabm336@gmail.com"],
      subject: subject,
      react: EmailTemplate({ subject: subject, content: content }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
