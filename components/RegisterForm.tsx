"use client";
import { formSchema, PatientFormValidation } from "@/lib/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { Button } from "./ui/button";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { PatientFormDefaultValues } from "@/contants";
export enum FieldType {
  FullName = "name",
  Email = "email",
  Phone = "phone",
  DateSelect = "dateOfBirth",
}

export const RegistrationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    console.log(values);
  }
  return (
    <>
      <section className="mb-12 space-y-4">
        <h1 className="text-xl-bold md:text-xl-bold">Welcome 👋 </h1>
        <p className="text-dark-700">Let's us know about yourself.</p>
        <h2 className="font-bold">Personal Information</h2>
      </section>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField
              control={form.control}
              name="fullName"
              label="Full Name"
              placeholder="Enter your FullName"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
              type={FieldType.FullName}
            />
            <div className="flex justify-between items-center">
              <CustomFormField
                control={form.control}
                name="email"
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
                        {...field}
                        // value={field.value}
                        // onChange={(phone) => field.onChange(phone)}
                        className="phone-input-wrapper"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center">
              <CustomFormField
                control={form.control}
                email="email"
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
                        {...field}
                        // value={field.value}
                        // onChange={(phone) => field.onChange(phone)}
                        className="phone-input-wrapper"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="bg-green-600 px-50 sm:px-auto mx-auto cursor-pointer hover:bg-gray-300 text-black"
            >
              Submit and Continue
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
