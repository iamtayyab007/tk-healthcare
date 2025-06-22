"use server";
import { storage, users } from "../appwrite.config";
import { ID, Models, Query } from "node-appwrite";
import { parseStringify } from "../utils";

interface GetUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

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
