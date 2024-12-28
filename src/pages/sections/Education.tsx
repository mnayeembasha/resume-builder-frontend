import { Button } from "../../components/ui/button";
import FormFieldTemplate from "../../components/FormFieldTemplate";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Checkbox } from ".././../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";

const Education = ({ form }) => {
  const { setValue, watch } = form;

  return (
    <div>
      <h2 className="text-lg font-semibold">Education</h2>
      <p className="text-sm text-gray-600 mb-4">
        Fill out your educational background. Some fields are mandatory.
      </p>

      {/* SSC Section */}
      <div className="space-y-4 border p-4 rounded mb-4">
        <h3 className="font-semibold">SSC (Mandatory)</h3>
        <FormFieldTemplate
          form={form}
          name={`education.ssc.institutionName`}
          label={"Institution Name"}
          placeholder={"Enter institution name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.boardName`}
          label={"Board Name"}
          placeholder={"Enter board name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.specialization`}
          label={"Specialization"}
          placeholder={"Enter specialization"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.state`}
          label={"State"}
          placeholder={"Enter state"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.city`}
          label={"City"}
          placeholder={"Enter city"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.mathematicsScore`}
          label={"Mathematics Score (CGPA / Percentage)"}
          placeholder={"Enter math score"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.physicsScore`}
          label={"Physics Score (CGPA / Percentage)"}
          placeholder={"Enter physics score"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.ssc.chemistryScore`}
          label={"Chemistry Score (CGPA / Percentage)"}
          placeholder={"Enter chemistry score"}
        />
        {/* Start Date */}
        <div>
          <Label htmlFor={`education.ssc.startDate`}>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.ssc.startDate`) && "text-muted-foreground"
                )}
              >
                {watch(`education.ssc.startDate`) ? (
                  new Date(
                    watch(`education.ssc.startDate`)
                  ).toLocaleDateString()
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
                  watch(`education.ssc.startDate`)
                    ? new Date(watch(`education.ssc.startDate`))
                    : undefined
                }
                onSelect={(date) => setValue(`education.ssc.startDate`, date)}
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
          <Label htmlFor={`education.ssc.endDate`}>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.ssc.endDate`) && "text-muted-foreground"
                )}
              >
                {watch(`education.ssc.endDate`) ? (
                  new Date(watch(`education.ssc.endDate`)).toLocaleDateString()
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
                  watch(`education.ssc.endDate`)
                    ? new Date(watch(`education.ssc.endDate`))
                    : undefined
                }
                onSelect={(date) => setValue(`education.ssc.endDate`, date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* 11th and 12th Grade Section */}
      <div className="space-y-4 border p-4 rounded mb-4">
        <h3 className="font-semibold">+11 and +12 (Mandatory)</h3>
        {/* <FormFieldTemplate
          form={form}
          name={`education.grades11And12.stream`}
          label={"Stream"}
          placeholder={"Select Stream"}
          isDropdown={true}
          options={[{ value: "MPC", label: "MPC" }]}
        /> */}

        <FormField
          control={form.control}
          name="education.grades11And12.stream"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stream</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="select stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MPC">MPC</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.institutionName`}
          label={"Institution Name"}
          placeholder={"Enter institution name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.boardName`}
          label={"Board Name"}
          placeholder={"Enter board name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.state`}
          label={"State"}
          placeholder={"Enter state"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.city`}
          label={"City"}
          placeholder={"Enter city"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.mathematicsScore`}
          label={"Mathematics Score"}
          placeholder={"Enter math score"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.physicsScore`}
          label={"Physics Score"}
          placeholder={"Enter physics score"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.grades11And12.chemistryScore`}
          label={"Chemistry Score"}
          placeholder={"Enter chemistry score"}
        />
        {/* Start Date */}
<div>
<Label htmlFor={`education.grades11And12.startDate`}>Start Date</Label>
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full pl-3 text-left font-normal",
        !watch(`education.grades11And12.startDate`) &&
          "text-muted-foreground"
      )}
    >
      {watch(`education.grades11And12.startDate`) ? (
        new Date(watch(`education.grades11And12.startDate`)).toLocaleDateString()
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
        watch(`education.grades11And12.startDate`)
          ? new Date(watch(`education.grades11And12.startDate`))
          : undefined
      }
      onSelect={(date) =>
        setValue(`education.grades11And12.startDate`, date)
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
<Label htmlFor={`education.grades11And12.endDate`}>End Date</Label>
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full pl-3 text-left font-normal",
        !watch(`education.grades11And12.endDate`) &&
          "text-muted-foreground"
      )}
    >
      {watch(`education.grades11And12.endDate`) ? (
        new Date(watch(`education.grades11And12.endDate`)).toLocaleDateString()
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
        watch(`education.grades11And12.endDate`)
          ? new Date(watch(`education.grades11And12.endDate`)
          )
          : undefined
      }
      onSelect={(date) =>
        setValue(`education.grades11And12.endDate`, date)
      }
      disabled={(date) =>
        date > new Date() || date < new Date("1900-01-01")
      }
      initialFocus
    />
  </PopoverContent>
</Popover>
</div>
      </div>

      {/* underGraduation Section */}
      <div className="space-y-4 border p-4 rounded mb-4">
        <h3 className="font-semibold">Under Graduation (Optional)</h3>
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.institutionName`}
          label={"Institution Name"}
          placeholder={"Enter institution name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.university`}
          label={"University"}
          placeholder={"Enter university"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.specialization`}
          label={"Specialization"}
          placeholder={"Enter specialization"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.state`}
          label={"State"}
          placeholder={"Enter state"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.city`}
          label={"City"}
          placeholder={"Enter city"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.underGraduation.cgpa`}
          label={"CGPA / Percentage"}
          placeholder={"Enter CGPA or percentage"}
        />
        {/* Start Date */}
        <div>
          <Label htmlFor={`education.underGraduation.startDate`}>
            Start Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.underGraduation.startDate`) &&
                    "text-muted-foreground"
                )}
              >
                {watch(`education.underGraduation.startDate`) ? (
                  new Date(
                    watch(`education.underGraduation.startDate`)
                  ).toLocaleDateString()
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
                  watch(`education.underGraduation.startDate`)
                    ? new Date(watch(`education.underGraduation.startDate`))
                    : undefined
                }
                onSelect={(date) =>
                  setValue(`education.underGraduation.startDate`, date)
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
          <Label htmlFor={`education.underGraduation.endDate`}>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.underGraduation.endDate`) &&
                    "text-muted-foreground"
                )}
              >
                {watch(`education.underGraduation.endDate`) ? (
                  new Date(
                    watch(`education.underGraduation.endDate`)
                  ).toLocaleDateString()
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
                  watch(`education.underGraduation.endDate`)
                    ? new Date(watch(`education.underGraduation.endDate`))
                    : undefined
                }
                onSelect={(date) =>
                  setValue(`education.underGraduation.endDate`, date)
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Graduation Section */}
      <div className="space-y-4 border p-4 rounded mb-4">
        <h3 className="font-semibold">Graduation (Optional)</h3>
        <FormFieldTemplate
          form={form}
          name={`education.graduation.institutionName`}
          label={"Institution Name"}
          placeholder={"Enter institution name"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.graduation.university`}
          label={"University"}
          placeholder={"Enter university"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.graduation.specialization`}
          label={"Specialization"}
          placeholder={"Enter specialization"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.graduation.state`}
          label={"State"}
          placeholder={"Enter state"}
        />
        <FormFieldTemplate
          form={form}
          name={`education.graduation.city`}
          label={"City"}
          placeholder={"Enter city"}
        />

        <FormFieldTemplate
          form={form}
          name={`education.graduation.cgpa`}
          label={"CGPA / Percentage"}
          placeholder={"Enter CGPA or percentage"}
        />
        {/* <FormFieldTemplate
          form={form}
          name={`education.graduation.ongoing`}
          label={"Ongoing"}
          placeholder={"Select if ongoing"}
          isCheckbox={true}
        /> */}

        <FormField
          control={form.control}
          name={`education.graduation.ongoing`}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`education.graduation.ongoing`}
                checked={field.value || false} // Ensure false if undefined
                onCheckedChange={(checked) => field.onChange(checked)} // Handle checked state
              />
              <label
                htmlFor={`education.graduation.ongoing`}
                className="text-sm font-medium text-gray-700"
              >
                Ongoing (current degree program)
              </label>
            </div>
          )}
        />

        {/* Start Date */}
        <div>
          <Label htmlFor={`education.graduation.startDate`}>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.graduation.startDate`) &&
                    "text-muted-foreground"
                )}
              >
                {watch(`education.graduation.startDate`) ? (
                  new Date(
                    watch(`education.graduation.startDate`)
                  ).toLocaleDateString()
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
                  watch(`education.graduation.startDate`)
                    ? new Date(watch(`education.graduation.startDate`))
                    : undefined
                }
                onSelect={(date) =>
                  setValue(`education.graduation.startDate`, date)
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
          <Label htmlFor={`education.graduation.endDate`}>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !watch(`education.graduation.endDate`) &&
                    "text-muted-foreground"
                )}
              >
                {watch(`education.graduation.endDate`) ? (
                  new Date(
                    watch(`education.graduation.endDate`)
                  ).toLocaleDateString()
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
                  watch(`education.graduation.endDate`)
                    ? new Date(watch(`education.graduation.endDate`))
                    : undefined
                }
                onSelect={(date) =>
                  setValue(`education.graduation.endDate`, date)
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Education;
