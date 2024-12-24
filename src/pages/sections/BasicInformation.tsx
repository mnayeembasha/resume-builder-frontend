import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";



import FormFieldTemplate from "../../components/FormFieldTemplate.tsx";

const BasicInformation = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* First Name */}
      <FormFieldTemplate
        form={form}
        name={"basicInformation.firstName"}
        label={"First Name"}
        placeholder={"Enter your first name"}
      />
      <FormFieldTemplate
        form={form}
        name={"basicInformation.middleName"}
        label={"Middle Name"}
        placeholder={"Enter your middle name"}
      />
      <FormFieldTemplate
        form={form}
        name={"basicInformation.lastName"}
        label={"Last Name"}
        placeholder={"Enter your last name"}
      />

      {/* current designation */}
      <FormField
        control={form.control}
        name="basicInformation.currentDesignation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Designation</FormLabel>
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="select current designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Fresher</SelectItem>
                <SelectItem value="automation-tester">
                  Automation Tester
                </SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

        <hr/>
     <div className="mt-5 font-semibold">  Residance Address </div>
    <FormFieldTemplate form={form} name={"basicInformation.address.pincode"} label={"Pincode"} placeholder={"Enter your Pincode"}/>
    <FormFieldTemplate form={form} name={"basicInformation.address.country"} label={"Country"} placeholder={"Enter your Country"}/>
    <FormFieldTemplate form={form} name={"basicInformation.address.state"} label={"State"} placeholder={"Enter your State"}/>
    <FormFieldTemplate form={form} name={"basicInformation.address.city"} label={"City"} placeholder={"Enter your City"}/>
    <FormFieldTemplate form={form} name={"basicInformation.address.addressLine"} label={"Address Line"} placeholder={"Enter your address line"}/>

      <FormFieldTemplate
        form={form}
        name={"basicInformation.email"}
        label={"Email"}
        placeholder={"Enter your email"}
      />
      <FormFieldTemplate
        form={form}
        name={"basicInformation.mobile"}
        label={"Mobile Number"}
        placeholder={"Enter your mobile number"}
      />

      <FormFieldTemplate
        form={form}
        name={"basicInformation.github"}
        label={"Github Profile"}
        placeholder={"Enter your GitHub profile URL"}
      />
      <FormFieldTemplate
        form={form}
        name={"basicInformation.linkedIn"}
        label={"LinkedIn Profile"}
        placeholder={"Enter your LinkedIn profile URL"}
      />


    </div>
  );
};
export default BasicInformation;
