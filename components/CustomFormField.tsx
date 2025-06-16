import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldType } from "./PatientForm";
import "react-phone-number-input/style.css";
import Image from "next/image";

interface FormProps {
  fullName?: string;
  email?: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  iconSrc: string;
  iconAlt: string;
  type: FieldType;
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
