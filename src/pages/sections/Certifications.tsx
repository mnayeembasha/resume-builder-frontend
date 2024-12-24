import { useFieldArray } from "react-hook-form";
import { Button } from "../../components/ui/button";
import FormFieldTemplate from "../../components/FormFieldTemplate";
const Certifications = ({ form }) => {
  const { control } = form;

  // Use `useFieldArray` to manage the list of certifications
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Technology Certifications</h2>
      <p className="text-sm text-gray-600 mb-4">
        Add your certifications. This section is optional, and you can add
        multiple entries.
      </p>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 border p-4 rounded mb-4">
          <FormFieldTemplate
            form={form}
            name={`certifications.${index}.certificationName`}
            label={"Certification Name"}
            placeholder={"Enter certification name"}
          />
          <FormFieldTemplate
            form={form}
            name={`certifications.${index}.certificationId`}
            label={"Certification ID"}
            placeholder={"Enter certification ID"}
          />
          <FormFieldTemplate
            form={form}
            name={`certifications.${index}.institute`}
            label={"Authorized Institute/Organization"}
            placeholder={"Enter Instistute"}
          />
          <FormFieldTemplate
            form={form}
            name={`certifications.${index}.year`}
            label={"Year of Certification Completion"}
            placeholder={"Enter year of completion of certificate"}
          />

          <Button
            variant="destructive"
            type="button"
            onClick={() => remove(index)}
            className="mt-2"
          >
            Remove Certification
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        type="button"
        onClick={() =>
          append({
            certificationName: "",
            certificationId: "",
            institute: "",
            year: "",
          })
        }
      >
        Add Certification
      </Button>
    </div>
  );
};

export default Certifications;
