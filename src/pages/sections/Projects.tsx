import { useFieldArray } from "react-hook-form";
import { Button } from "../../components/ui/button";
import FormFieldTemplate from "../../components/FormFieldTemplate";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { FormLabel } from "../../components/ui/form";

const Projects = ({ form }) => {
  const { control, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Projects</h2>
      <p className="text-sm text-gray-600 mb-4">
        Add your projects. This section is optional, and you can add multiple entries.
      </p>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 border p-4 rounded mb-4">
          {/* Project Name */}
          <FormFieldTemplate
            form={form}
            name={`projects.${index}.name`}
            label={"Project Name"}
            placeholder={"Enter project name"}
          />

          {/* Client/Organization */}
          <FormFieldTemplate
            form={form}
            name={`projects.${index}.client`}
            label={"Client/Organization"}
            placeholder={"Enter client/organization name"}
          />

          {/* Start Date */}
          <div>
            <FormLabel htmlFor={`projects.${index}.startDate`}>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !watch(`projects.${index}.startDate`) && "text-muted-foreground"
                  )}
                >
                  {watch(`projects.${index}.startDate`) ? (
                    new Date(watch(`projects.${index}.startDate`)).toLocaleDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    watch(`projects.${index}.startDate`)
                      ? new Date(watch(`projects.${index}.startDate`))
                      : undefined
                  }
                  onSelect={(date) => setValue(`projects.${index}.startDate`, date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div>
            <FormLabel htmlFor={`projects.${index}.endDate`}>End Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !watch(`projects.${index}.endDate`) && "text-muted-foreground"
                  )}
                >
                  {watch(`projects.${index}.endDate`) ? (
                    new Date(watch(`projects.${index}.endDate`)).toLocaleDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    watch(`projects.${index}.endDate`)
                      ? new Date(watch(`projects.${index}.endDate`)
                      )
                      : undefined
                  }
                  onSelect={(date) => setValue(`projects.${index}.endDate`, date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Project Link */}
          <FormFieldTemplate
            form={form}
            name={`projects.${index}.link`}
            label={"Project Link"}
            placeholder={"Enter project link (optional)"}
          />

          {/* Attachments */}
          <FormFieldTemplate
            form={form}
            name={`projects.${index}.attachments`}
            label={"Attachments"}
            placeholder={"Attach reports or presentations (optional)"}
          />

          {/* Remove Button */}
          <Button
            variant="destructive"
            type="button"
            onClick={() => remove(index)}
            className="mt-2"
          >
            Remove Project
          </Button>
        </div>
      ))}
      {/* Add Project Button */}
      <Button
        variant="outline"
        type="button"
        onClick={() =>
          append({
            name: "",
            client: "",
            startDate: "",
            endDate: "",
            link: "",
            attachments: "",
          })
        }
      >
        Add Project
      </Button>
    </div>
  );
};

export default Projects;
