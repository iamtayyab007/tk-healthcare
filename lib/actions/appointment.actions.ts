"use server";
import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";
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
      schedule: statusCount.scheduled || 0,
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
