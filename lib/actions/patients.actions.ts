"use server";
import { databases, storage, users } from "../appwrite.config";
import { ID, Models, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { endpoint, PROJECT_ID } from "../appwrite.config";

interface GetUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}
const { DATABASE_ID, PATIENT_COLLECTION_ID } = process.env;
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.fullName
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const uploadFile = async (file: any) => {
  try {
    const response = await storage.createFile(
      "68542b920021e7f993b2",
      ID.unique(),
      file
    );
    return response;
  } catch (error: any) {
    console.log("error", error?.response?.data);
  }
};
// this actions is for adding a patient data to the appwrite db
export const getFileUrl = async (uploaded: any, values: any, user: any) => {
  try {
    const fileId = uploaded.$id;
    const fileUrl = `${endpoint}/v1/storage/buckets/68542b920021e7f993b2/files/${uploaded.$id}/view?project=${PROJECT_ID}`;
    console.log("userId", user.$id);

    console.log("patient file url", fileUrl);
    console.log("patient values", values);
    const patientData = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.$id,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(Date.now()).toISOString(),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocumentId: fileId,
        identificationDocumentUrl: fileUrl.toString(),
        privacyConsent: true,
      }
    );
    return parseStringify(patientData);
  } catch (error: any) {
    console.error(
      "Error creating document:",
      error?.response?.data || error.message || error
    );
    return null; // <-- this makes sure it doesn't return undefined
  }
};

export const getPatientData = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!, // databaseId
      PATIENT_COLLECTION_ID!, // collectionId
      [Query.equal("userId", userId)] // queries (optional)
    );
    return parseStringify(result.documents[0]);
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};
