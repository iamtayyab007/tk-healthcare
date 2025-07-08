"use server";
import { ID } from "node-appwrite";
import { databases, messaging } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { send } from "process";
const { DATABASE_ID, APPOINTMENT_COLLECTION_ID } = process.env;

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
    const smsMessage = `Hi, it's CarePulse, your appointment has be ${
      appointment.type === "schedule"
        ? `Your appointment has been scheduled for ${appointment.schedule}`
        : `we regret to inform that your appointment has been cancelled. 
        Reason ${appointment.cancellationReason}`
    }`;
    await sendSMSNotification(appointment.userId, smsMessage);
    revalidatePath("/admin");
    return parseStringify(result);
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};
