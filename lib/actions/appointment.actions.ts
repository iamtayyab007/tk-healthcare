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
