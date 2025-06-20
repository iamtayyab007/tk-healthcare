"use client";
import { formSchema } from "@/lib/validationSchemas";
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
import { createUser } from "@/lib/actions/patients.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
export enum FieldType {
  FullName = "fullName",
  Email = "email",
  Phone = "phone",
}

export const PatientForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);
    try {
      const user = await createUser(values);
      if (user) {
        setLoading(false);
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="mb-12 space-y-4">
        <h1 className="text-xl-bold md:text-xl-bold">Hi there 👋 </h1>
        <p className="text-dark-700">Get started with appointments.</p>
      </section>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField
              control={form.control}
              fullName="fullName"
              label="Full Name"
              placeholder="Enter your FullName"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
              type={FieldType.FullName}
            />

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
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      className="phone-input-wrapper"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-green-600 px-50 sm:px-auto mx-auto cursor-pointer hover:bg-gray-300 text-black"
            >
              {loading ? "Loading please wait...." : "Get Started"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
