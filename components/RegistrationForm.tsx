"use client";
import { PatientFormValidation } from "@/lib/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { Button } from "./ui/button";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { GenderOptions, PatientFormDefaultValues } from "@/contants";
import DateSelector from "./DatePicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { getFileUrl, uploadFile } from "@/lib/actions/patients.actions";
import { databases, storage } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";

export enum FieldType {
  FullName = "fullName",
  Email = "email",
  Phone = "phone",
  DateSelect = "dateOfBirth",
  Checkbox = "checkbox",
  Address = "address",
  Occupation = "occupation",
  EmergencyContactName = "emergencyContactName",
  EmergencyContactNumber = "emergencyContactNumber",
  SelectOptions = "primaryPhysician",
  InsuranceProvider = "insuranceProvider",
  InsurancePolicyNumber = "insurancePolicyNumber",
  Allergies = "allergies",
  CurrentMedication = "currentMedication",
  FamilyMedicalHistory = "familyMedicalHistory",
  PastMedicalHistory = "pastMedicalHistory",
  SelectIdentificationType = "identificationType",
  IdentificationNumber = "identificationNumber",
  IdentificationDocument = "identificationDocument",
}

export const RegistrationForm = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      fullName: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // useEffect(() => {
  //   console.log("Form Errors:", form.formState.errors);
  // }, [form.formState.errors]);

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setLoading(true);
    // console.log("Form Errors:", form.formState.errors);

    // console.log("values", values);
    const formData = new FormData();
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      formData.append(
        "identificationDocument",
        values.identificationDocument[0]
      ); // ✅ Only one file
    } else {
      console.error("No file selected");
    }
    console.log("File in FormData:", formData.get("identificationDocument"));

    const file = values?.identificationDocument?.[0];
    if (!file) {
      return;
    }
    const uploaded = await uploadFile(file);
    console.log("file uploaded", uploaded);
    if (!uploaded || !uploaded.$id) {
      console.error("Upload failed or file object is invalid");
      return;
    }

    //const fileUrl = storage.getFileView("68542b920021e7f993b2", uploaded.$id);
    try {
      const patientData = await getFileUrl(uploaded, values, user);
      console.log("patient data", patientData);
      router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="mb-12 space-y-4">
        <h1 className="text-2xl font-bold md:text-xl-bold">Welcome 👋 </h1>
        <p className="text-dark-700">Let's us know about yourself.</p>
        <h2 className="font-bold m-7">Personal Information</h2>
        <div className="flex justify-center items-center scrollbar-hide">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomFormField
                control={form.control}
                label="Full Name"
                placeholder="Enter your FullName"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                type={FieldType.FullName}
              />
              <div className="flex justify-between items-center gap-5">
                <CustomFormField
                  control={form.control}
                  label="Email"
                  placeholder="Enter your Email"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                  type={FieldType.Email}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry={"PK"}
                          placeholder="Enter phone number"
                          value={field.value}
                          onChange={(phone) => field.onChange(phone)}
                          className="phone-input-wrapper"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <div>
                        <FormControl>
                          <DateSelector field={field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {GenderOptions.map((gender, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 bg-dark-500 border border-dark-500 px-4 py-2 rounded-md cursor-pointer hover:bg-dark-300 transition"
                            >
                              <RadioGroupItem value={gender} id={gender} />
                              <Label htmlFor={gender}>{gender}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center gap-5">
                <CustomFormField
                  control={form.control}
                  label="Address"
                  placeholder="Enter your Address"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.Address}
                />

                <CustomFormField
                  control={form.control}
                  label="Occupation"
                  placeholder="Software Engineer"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.Occupation}
                />
              </div>

              <div className="flex justify-between items-center gap-5">
                <CustomFormField
                  control={form.control}
                  label="Emergency Contact Name"
                  placeholder="Guardian's name"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.EmergencyContactName}
                />

                <CustomFormField
                  control={form.control}
                  label="Emergency Contact Number"
                  placeholder="ex:+92 3366543456"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.EmergencyContactNumber}
                />
              </div>

              <h2 className="font-bold">Medical Information</h2>

              <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Primary Care Physician"
                  placeholder="Select a Doctor"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.SelectOptions}
                />
              </div>

              <div className="flex justify-between items-center gap-5">
                <CustomFormField
                  control={form.control}
                  label="Insurance Provider"
                  placeholder="ex: Blue World"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.InsuranceProvider}
                />
                <CustomFormField
                  control={form.control}
                  label="Insurance Policy Number"
                  placeholder="ex: ABCD123456"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.InsurancePolicyNumber}
                />
              </div>

              <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Allergies(if any)"
                  placeholder="ex: Peanut, panicilin, pollen"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.Allergies}
                />
                <CustomFormField
                  control={form.control}
                  label="Current Medication"
                  placeholder="ex: panadol, paracetamol"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.CurrentMedication}
                />
              </div>

              <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Family Medical History(if relevant)"
                  placeholder="ex: Mother is ill"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.FamilyMedicalHistory}
                />
                <CustomFormField
                  control={form.control}
                  label="Past Medical History"
                  placeholder="ex: Asthma Diagnosis in childhood"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.PastMedicalHistory}
                />
              </div>

              {/* <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Identification Type"
                  placeholder="Select identification Type"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.SelectIdentificationType}
                />
              </div> */}

              <h2 className="font-bold">Identification and Verification</h2>

              <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Identification Type"
                  placeholder="Select identification Type"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.SelectIdentificationType}
                />
              </div>
              <div>
                <CustomFormField
                  control={form.control}
                  label="Identification Number"
                  placeholder="ex: 1234567"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.IdentificationNumber}
                />
              </div>
              <div className="flex justify-between items-center">
                <CustomFormField
                  control={form.control}
                  label="Scanned Copy of Identification Document"
                  placeholder="Click To Upload"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.IdentificationDocument}
                />
              </div>

              <Button
                type="submit"
                className="bg-green-600 px-8 mx-auto cursor-pointer hover:bg-green-700 text-white"
              >
                {loading ? "Loading..." : "Submit and Continue"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};
