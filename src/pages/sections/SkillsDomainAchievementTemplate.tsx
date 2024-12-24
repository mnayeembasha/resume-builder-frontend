import { useFieldArray } from "react-hook-form";
import { Button } from "../../components/ui/button";
import FormFieldTemplate from "../../components/FormFieldTemplate";
const SkillsDomainAchievementTemplate = ({ form, sectionName, label, placeholder, maxItems }) => {
    const { control } = form;

    const { fields, append, remove } = useFieldArray({
      control,
      name: sectionName,
    });

    return (
      <div>
        <h2 className="text-lg font-semibold">{label}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add your {label.toLowerCase()}. You can add up to {maxItems} items.
        </p>
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded mb-4">
            <FormFieldTemplate
              form={form}
              name={`${sectionName}.${index}`}
              label={`${label} ${index + 1}`}
              placeholder={placeholder}
            />
            <Button
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
              className="mt-2"
            >
              Remove {label}
            </Button>
          </div>
        ))}
        {fields.length < maxItems && (
          <Button
            variant="outline"
            type="button"
            onClick={() => append("")}
          >
            Add {label}
          </Button>
        )}
      </div>
    );
  };

  export default SkillsDomainAchievementTemplate;