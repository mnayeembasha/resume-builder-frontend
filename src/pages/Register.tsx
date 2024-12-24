import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import { Button } from "../components/ui/button";
const CSC_API_KEY = import.meta.env.VITE_CSC_API_KEY;
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { MultiSelect } from "../components/multi-select.tsx";
import Navbar from "../components/Navbar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import coursesData from "../assets/courseData.json";
const courseKeys = Object.keys(coursesData) as Array<keyof typeof coursesData>;

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "../lib/utils";
import { BACKEND_URL } from "../config";

const formSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  collegeName: z.string().min(5).max(50),
  specialization: z.enum(["undergraduate", "postgraduate"]),
  course: z.string().min(2),
  branch: z.string().min(2),
  passOutYear: z.string(),
  cgpaOrPercentage: z.string(),
  gender: z.enum(["male", "female", "other"]),
  githubProfile: z.string().url(),
  linkedInProfile: z.string().url(),
  jobPreferredCountries: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 countries" }),
  jobPreferredStates: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 states" }),
  jobPreferredCities: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 cities" }),
  dateOfBirth: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    })
  ),
});

// TypeScript types for the API responses
type Country = {
  name: string;
  code: string;
};

type State = {
  name: string;
  code: string;
  countryCode: string;
};

type City = {
  name: string;
  code: string;
  stateCode: string;
  countryCode: string;
};

const RegisterForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const fetchCountries = async () => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY": CSC_API_KEY,
      },
    };

    try {
      const response = await axios(config);
      const data: Country[] = response.data.map((item: any) => ({
        name: item.name,
        code: item.iso2,
      }));
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStatesOfCountry = async (
    countryCode: string
  ): Promise<State[]> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY": CSC_API_KEY,
      },
    };

    try {
      const response = await axios(config);
      return response.data.map((item: any) => ({
        name: item.name,
        code: item.iso2,
        countryCode: countryCode,
      }));
    } catch (error) {
      console.error(`Error fetching states for country ${countryCode}:`, error);
      return [];
    }
  };

  const fetchCitiesOfState = async (
    countryCode: string,
    stateCode: string
  ): Promise<City[]> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        "X-CSCAPI-KEY": CSC_API_KEY,
      },
    };

    try {
      const response = await axios(config);
      return response.data.map((item: any) => ({
        name: item.name,
        code: item.id, // Assuming city ID as the unique code
        stateCode: stateCode,
        countryCode: countryCode,
      }));
    } catch (error) {
      console.error(`Error fetching cities for state ${stateCode}:`, error);
      return [];
    }
  };

  // Fetch and aggregate states for multiple selected countries
  // const fetchStates = async (countryCodes: string[]) => {
  //   const allStates = await Promise.all(
  //     countryCodes.map((code) => fetchStatesOfCountry(code))
  //   );
  //   setStates(allStates.flat());
  // };

  // Fetch states when countries are selected
  const handleCountryChange = async (selectedCountries: string[]) => {
    const allStates = await Promise.all(
      selectedCountries.map((code) => fetchStatesOfCountry(code))
    );
    setStates(allStates.flat());
    setCities([]); // Reset cities
  };

  // Fetch cities when states are selected
  const handleStateChange = async (
    selectedStates: { countryCode: string; code: string }[]
  ) => {
    const statePairs = selectedStates.map((state) => ({
      countryCode: state.countryCode,
      stateCode: state.code,
    }));

    const allCities = await Promise.all(
      statePairs.map(({ countryCode, stateCode }) =>
        fetchCitiesOfState(countryCode, stateCode)
      )
    );
    setCities(allCities.flat());
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Nayeem",
      lastName: "Basha",
      collegeName: "RGUKT Nuzvid",
      specialization: "undergraduate",
      course: "btech",
      branch: "cse",
      passOutYear: "2026",
      cgpaOrPercentage: "90",
      gender: "male",
      githubProfile: "https://github.com/mnayeembasha",
      linkedInProfile: "https://linkedin.com/in/mnayeemabasha",
      jobPreferredCountries: [],
      jobPreferredStates: [],
      jobPreferredCities: [],
      dateOfBirth: new Date("2004-01-01"),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted...");
    console.log(values);

    const {
      firstName,
      lastName,
      collegeName,
      specialization,
      course,
      branch,
      gender,
      githubProfile,
      linkedInProfile,
      jobPreferredCountries,
      jobPreferredStates,
      jobPreferredCities,
    } = values;

    const dateOfBirth = values.dateOfBirth.toISOString().split("T")[0];
    const passOutYearInt = parseInt(values.passOutYear as any, 10);
    const cgpaOrPercentageInt = parseInt(values.cgpaOrPercentage as any); // parseFloat if you expect decimal values

    if (isNaN(passOutYearInt) || isNaN(cgpaOrPercentageInt)) {
      alert(
        "Please enter valid numeric values for Pass Out Year and CGPA/Percentage."
      );
      return;
    }

    const allSelectedCountries = jobPreferredCountries.map((countryCode)=>{
      return (countries.find((country)=>{
        console.log("state.code=",country.code);
        console.log("stateCode=",countryCode);
        return country.code===countryCode
      }))?.name;
    })
    const allSelectedStates = jobPreferredStates.map((stateCode)=>{
      return (states.find((state)=>{
        console.log("state.code=",state.code);
        console.log("stateCode=",stateCode);
        return state.code===stateCode
      }))?.name;
    })


     try {

       const response = await axios.post(
         `${BACKEND_URL}/api/v1/user/register`,
         {
           firstName,
           lastName,
           collegeName,
           specialization,
           course,
           branch,
           passOutYear: passOutYearInt,
           cgpaOrPercentage: cgpaOrPercentageInt,
           gender,
           githubProfile,
           linkedInProfile,
           jobPreferredCountries:allSelectedCountries,
           jobPreferredStates:allSelectedStates,
           jobPreferredCities,
           dateOfBirth
         },
         {
           withCredentials: true,
         }
       );
       console.log(response.data);
       alert("Form submitted successfully!");
     } catch (error) {
       console.error("Error submitting form:", error);
       alert("Failed to submit the form. Please try again.");
     }
  }

  return (
    <div className="min-h-screen font-mona">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-8">
        <div className="mb-10 text-center">
          <div className="text-2xl font-semibold">Registration</div>
          <div className="">Provide us a few details to continue...</div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-lg"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* College Name */}
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specialization */}
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">
                          Undergraduate
                        </SelectItem>
                        <SelectItem value="postgraduate">
                          Postgraduate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCourse(value); // Update the selected course
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseKeys.map((courseKey) => (
                          <SelectItem key={courseKey} value={courseKey}>
                            {courseKey}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Branch */}
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      disabled={!selectedCourse}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedCourse
                              ? "Select your branch"
                              : "Select a course first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCourse &&
                          coursesData[selectedCourse]?.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pass Out Year */}
            <FormField
              control={form.control}
              name="passOutYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pass Out Year</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Enter your pass out year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CGPA/Percentage */}
            <FormField
              control={form.control}
              name="cgpaOrPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CGPA/Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Enter your CGPA or Percentage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GitHub Profile */}
            <FormField
              control={form.control}
              name="githubProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter your GitHub profile URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LinkedIn Profile */}
            <FormField
              control={form.control}
              name="linkedInProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter your LinkedIn profile URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multi Select: jobPreferredCountries */}
            <FormField
              control={form.control}
              name="jobPreferredCountries"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Job Preferred Countries</FormLabel>
                  <MultiSelect
                    options={countries.map((country) => ({
                      label: country.name,
                      value: country.code,
                    }))}
                    value={field.value || []}
                    onValueChange={(selected) => {
                      field.onChange(selected);
                      handleCountryChange(selected); // Fetch states based on selected countries
                    }}
                    placeholder="Select preferred countries"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multi Select: jobPreferredStates */}
            <FormField
              control={form.control}
              name="jobPreferredStates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Job Preferred States</FormLabel>
                  <MultiSelect
                    options={states.map((state) => ({
                      label: state.name,
                      value: state.code,
                    }))}
                    value={field.value || []}
                    onValueChange={(selected) => {
                      const selectedStates = selected.map((code) =>
                        states.find((state) => state.code === code)
                      );
                      field.onChange(selected);
                      handleStateChange(selectedStates || []);
                    }}
                    placeholder="Select preferred states"
                    disabled={states.length === 0}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multi Select: jobPreferredCities */}
            <FormField
              control={form.control}
              name="jobPreferredCities"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Cities</FormLabel>
                  <MultiSelect
                    options={cities.map((city) => ({
                      label: city.name,
                      value: city.name,
                    }))}
                    value={field.value || []}
                    onValueChange={(selected) => {
                      const selectedCities = selected.map((name) => {
                        return cities.find((city) => city.name === name)?.name;
                      });
                      field.onChange(selectedCities);
                    }}
                    placeholder="Select preferred cities"
                    disabled={cities.length === 0}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
  control={form.control}
  name="dateOfBirth"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date of birth</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value || new Date("2004-01-01")} // Default to 2004 if no value
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            defaultMonth={field.value || new Date("2004-01-01")} // Ensure initial view is 2004
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
            {/* Submit Button */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {Object.keys(form.formState.errors).length > 0 && (
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};
export default RegisterForm;
