import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldType } from "./RegistrationForm";
import "react-phone-number-input/style.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doctors, IdentificationTypes } from "@/contants";
import { Textarea } from "@/components/ui/textarea";
import DragDrop from "./DrapDrop";

interface FormProps {
  fullName?: string;
  email?: string;
  control?: Control<any>;
  label: string;
  placeholder: string;
  iconSrc: string;
  iconAlt: string;
  type: FieldType;
  children?: React.ReactNode;
  phone?: string | undefined;
}
function RenderCustomField(props: FormProps) {
  const { control, label, placeholder, iconAlt, iconSrc, type } = props;
  switch (type) {
    case FieldType.FullName:
      return (
        <div>
          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}
                    <Image
                      src={iconSrc}
                      height={24}
                      width={24}
                      alt={iconAlt}
                      className="ml-2"
                    />
                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    case FieldType.Email:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.Email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}
                    <Image
                      src={iconSrc}
                      height={24}
                      width={24}
                      alt={iconAlt}
                      className="ml-2"
                    />
                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.Occupation:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.Occupation}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.Address:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.Address}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.EmergencyContactName:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.EmergencyContactName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.EmergencyContactNumber:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.EmergencyContactNumber}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md bg-dark-400">
                    <PhoneInput
                      international
                      defaultCountry={"PK"}
                      placeholder="Enter phone number"
                      {...field}
                      // value={field.value}
                      // onChange={(phone) => field.onChange(phone)}
                      className="phone-input-wrapper "
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.SelectOptions:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.SelectOptions}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-7">
                <FormLabel>Primary care physician</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-xl ">
                      <SelectValue placeholder="Select a Doctor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black">
                    {Doctors.map((Doctor) => (
                      <>
                        <div className="flex flex-row items-center justify-center gap-3 p-1">
                          <SelectItem
                            className="hover:bg-gray-500 cursor-pointer"
                            value={Doctor.name}
                          >
                            <Image
                              src={Doctor.image}
                              alt="doctor"
                              height={30}
                              width={30}
                            />
                            {Doctor.name}
                          </SelectItem>
                        </div>
                      </>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.InsuranceProvider:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.InsuranceProvider}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.InsurancePolicyNumber:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.InsurancePolicyNumber}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.Allergies:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.Allergies}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className="w-68"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.CurrentMedication:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.CurrentMedication}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className="w-68"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.FamilyMedicalHistory:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.FamilyMedicalHistory}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className="w-68"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.PastMedicalHistory:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.PastMedicalHistory}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className="w-68"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.SelectIdentificationType:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.SelectIdentificationType}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-7">
                <FormLabel>{label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-xl ">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black">
                    {IdentificationTypes.map((types) => (
                      <>
                        <div className="flex flex-row items-center justify-center gap-3 p-1">
                          <SelectItem
                            className="hover:bg-gray-500 cursor-pointer"
                            value={types}
                          >
                            {types}
                          </SelectItem>
                        </div>
                      </>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.IdentificationNumber:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.IdentificationNumber}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="border-0 w-64"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case FieldType.IdentificationDocument:
      return (
        <div>
          <FormField
            control={control}
            name={FieldType.IdentificationDocument}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* Icon placed absolutely to the left */}

                    {/* Input with padding to account for icon */}
                    <DragDrop value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    default:
      return null;
  }
}
export default function CustomFormField(props: FormProps) {
  const { type, control, label, iconSrc, iconAlt, placeholder } = props;

  return (
    <div>
      <RenderCustomField
        control={control}
        label={label}
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        type={type}
        placeholder={placeholder}
      />
      {/* <RenderCustomField
        control={control}
        label={label}
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        type={FieldType.Email}
        placeholder={placeholder}
      /> */}
    </div>
  );
}
