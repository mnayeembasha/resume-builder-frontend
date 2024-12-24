import { useFieldArray } from "react-hook-form";
import { Button } from "../../components/ui/button";
import FormFieldTemplate from "../../components/FormFieldTemplate";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {  CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";

const Internships = ({ form }) => {
  const { control ,setValue,watch} = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "internships",
  });

  return (

    <div>
      <h2 className="text-lg font-semibold">Internships</h2>
      <p className="text-sm text-gray-600 mb-4">
        Add your internships. This section is optional, and you can add multiple
        entries.
      </p>
      {fields.map((field, index) => (

        <div key={field.id} className="space-y-4 border p-4 rounded mb-4">
          <FormFieldTemplate
            form={form}
            name={`internships.${index}.title`}
            label={"Internship Title"}
            placeholder={"Enter internship title"}
          />
          <FormFieldTemplate
            form={form}
            name={`internships.${index}.organization`}
            label={"Organization/Company"}
            placeholder={"Enter organization name"}
          />
          <FormFieldTemplate
            form={form}
            name={`internships.${index}.location`}
            label={"Location"}
            placeholder={"Enter internship location"}
          />
                  {/* Start Date */}
                  <div>
            <Label htmlFor={`internships.${index}.startDate`}>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !watch(`internships.${index}.startDate`) &&
                      "text-muted-foreground"
                  )}
                >
                  {watch(`internships.${index}.startDate`) ? (
                    new Date(watch(`internships.${index}.startDate`)).toLocaleDateString()
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
                    watch(`internships.${index}.startDate`)
                      ? new Date(watch(`internships.${index}.startDate`))
                      : undefined
                  }
                  onSelect={(date) =>
                    setValue(`internships.${index}.startDate`, date)
                  }
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
            <Label htmlFor={`internships.${index}.endDate`}>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !watch(`internships.${index}.endDate`) &&
                      "text-muted-foreground"
                  )}
                >
                  {watch(`internships.${index}.endDate`) ? (
                    new Date(watch(`internships.${index}.endDate`)).toLocaleDateString()
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
                    watch(`internships.${index}.endDate`)
                      ? new Date(watch(`internships.${index}.endDate`)
                      )
                      : undefined
                  }
                  onSelect={(date) =>
                    setValue(`internships.${index}.endDate`, date)
                  }
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>



          {/*Paid / Unpaid */}
          <FormField
          control={form.control}
          name={`internships.${index}.paid`}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Is the internship paid or unpaid?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value || "unpaid"}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="paid" />
                    </FormControl>
                    <FormLabel className="font-normal">Paid</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="unpaid" />
                    </FormControl>
                    <FormLabel className="font-normal">Unpaid</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            {/*Ongoing Internshio */}
            <FormField
  control={form.control}
  name={`internships.${index}.ongoing`}
  render={({ field }) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`internships.${index}.ongoing`}
        checked={field.value || false} // Ensure false if undefined
        onCheckedChange={(checked) => field.onChange(checked)} // Handle checked state
      />
      <label
        htmlFor={`internships.${index}.ongoing`}
        className="text-sm font-medium text-gray-700"
      >
        Ongoing
      </label>
    </div>
  )}
/>
          <FormFieldTemplate
            form={form}
            name={`internships.${index}.description`}
            label={"Description of Internship"}
            placeholder={"Describe tasks and responsibilities"}
          />
          <Button
            variant="destructive"
            type="button"
            onClick={() => remove(index)}
            className="mt-2"
          >
            Remove Internship
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        type="button"
        onClick={() =>
          append({
            title: "",
            organization: "",
            location: "",
            startDate: "",
            endDate: "",
            paid: "",
            ongoing: false,
            description: "",
          })
        }
      >
        Add Internship
      </Button>
    </div>

  );
};

export default Internships;
