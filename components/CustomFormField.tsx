import { Control, Field } from "react-hook-form";
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
  control: Control<any>;
  label?: string;
  placeholder: string;
  iconSrc: string;
  iconAlt: string;
  type: FieldType;
  children?: React.ReactNode;
  phone?: string | undefined;
}
function RenderCustomField({ field, props }: { field: any; props: FormProps }) {
  const { control, label, placeholder, iconAlt, iconSrc, type } = props;
  switch (type) {
    case FieldType.FullName:
      return (
        <div>
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
        </div>
      );
    case FieldType.Email:
      return (
        <div>
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
        </div>
      );

    case FieldType.Occupation:
      return (
        <div>
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
        </div>
      );

    case FieldType.Address:
      return (
        <div>
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
        </div>
      );

    case FieldType.EmergencyContactName:
      return (
        <div>
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
        </div>
      );

    case FieldType.EmergencyContactNumber:
      return (
        <div>
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
        </div>
      );

    case FieldType.SelectOptions:
      return (
        <div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>
      );

    case FieldType.InsuranceProvider:
      return (
        <div>
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
        </div>
      );

    case FieldType.InsurancePolicyNumber:
      return (
        <div>
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
        </div>
      );

    case FieldType.Allergies:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.CurrentMedication:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.FamilyMedicalHistory:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );
    case FieldType.AppointmentReason:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.AdditionalComments:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.CancellationReason:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.PastMedicalHistory:
      return (
        <div>
          <FormControl>
            <Textarea placeholder={placeholder} className="w-68" {...field} />
          </FormControl>

          <FormMessage />
        </div>
      );

    case FieldType.SelectIdentificationType:
      return (
        <div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>
      );

    case FieldType.IdentificationNumber:
      return (
        <div>
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
        </div>
      );

    case FieldType.IdentificationDocument:
      return (
        <div>
          <FormControl>
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              {/* Icon placed absolutely to the left */}

              {/* Input with padding to account for icon */}
              <DragDrop value={field.value} onChange={field.onChange} />
            </div>
          </FormControl>

          <FormMessage />
        </div>
      );

    default:
      return null;
  }
}
export default function CustomFormField(props: FormProps) {
  const { type, control, label, iconSrc, iconAlt, placeholder } = props;

  return (
    <FormField
      control={control}
      name={type}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>

          <RenderCustomField props={props} field={field} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );

  {
    /* <RenderCustomField
        control={control}
        label={label}
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        type={FieldType.Email}
        placeholder={placeholder}
      /> */
  }
}
