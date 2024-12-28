import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,UseFormReturn } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import {z} from "zod";
import PersonalInformation from "./PersonalInformation";
import { formSchema } from "./formSchema";
import Summary from "./Summary";
import Navbar from "../../components/Navbar";
import BasicInformation from "./BasicInformation";
import { FormFields,defaultValues } from "./formSchema";
import Certifications from "./Certifications";
import Internships from "./Internships";
import Projects from "./Projects";
import  Skills  from "./Skills";
import DomainKnowledge from "./DomainKnowledge";
import Achievements from "./Achievements";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Education from "./Education";
const MultiStep = () => {
  const form:UseFormReturn<FormFields> = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted...");
    console.log(values);

    try {
      const {
        personalInformation,
        basicInformation,
        summary,
        education,
        certifications,
        internships,
        projects,
        skills,
        domainKnowledge,
        achievements,
      } = values;

      const formattedAddress = {
        addressLine: basicInformation.address.addressLine || "",
        country: basicInformation.address.country,
        state: basicInformation.address.state,
        city: basicInformation.address.city,
        pincode: basicInformation.address.pincode || "",
      };

      const payload = {
        personalInformation: {
          photo: personalInformation.photo || "",
        },
        basicInformation: {
          firstName: basicInformation.firstName,
          middleName: basicInformation.middleName || "",
          lastName: basicInformation.lastName,
          currentDesignation: basicInformation.currentDesignation,
          address: formattedAddress,
          email: basicInformation.email,
          mobile: basicInformation.mobile,
          linkedIn: basicInformation.linkedIn || "",
          github: basicInformation.github || "",
        },
        summary: {
          summary: summary.summary,
        },
        education:education,
        certifications: certifications || [],
        internships: internships || [],
        projects: projects || [],
        skills: skills || [],
        domainKnowledge: domainKnowledge || [],
        achievements: achievements || [],
      };

      // Sending data to the backend
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/resume-details`, payload, {
        withCredentials: true,
      });

      console.log("Backend response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="min-h-screen font-mona ">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-8">
        <div className="mb-10 text-center text-blue-500">
          <div className="text-2xl font-semibold">Registration</div>
          <div className="">Provide us a few details to continue...</div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-lg"
          >
            <PersonalInformation form={form} name="personalInformation.photo" />
            <BasicInformation form={form}/>
            <Summary form={form} name="summary.summary" />
            <hr className="my-3"/>
            <Certifications form={form}/>
            <hr className="my-3"/>
            <Internships form={form}/>
            <hr className="my-3"/>
            <Projects form={form}/>
            <hr className="my-3"/>
            <Skills form={form}/>
            <hr className="my-3"/>
            <DomainKnowledge form={form}/>
            <hr className="my-3"/>
            <Achievements form={form}/>
            <hr className="my-3"/>
            <Education form={form}/>

            <div className="flex"><Button type="submit">Submit</Button></div>
          </form>
        </Form>
      </div>
      {Object.keys(form.formState.errors).length > 0 && (
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        )}
    </div>

  );
};

export default MultiStep;
