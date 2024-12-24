import { z } from "zod";

/* export const formSchema = z.object({
  personalInformation: z.object({
    photo: z.string().optional(),
  }),
  basicInformation: z.object({
    firstName: z.string().min(1, "First name is required."),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required."),
    currentDesignation: z.string().min(1, "Designation is required."),
    address: z.object({
      addressLine: z.string().optional(),
      country: z.string().min(1, "Country is required."),
      state: z.string().min(1, "State is required."),
      city: z.string().min(1, "City is required."),
      pincode: z
        .string()
        .regex(/^\d{4,6}$/, "Pincode must be 4 to 6 digits.")
        .optional(),
    }),
    email: z.string().email("Please enter a valid email address."),
    mobile: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
    linkedIn: z.string().url("Please enter a valid LinkedIn URL").optional(),
    github: z.string().url("Please enter a valid GitHub URL").optional(),
  }),
  summary: z.object({
    summary: z.string().min(1, "Summary is required."),
  }),
  education: z
    .array(
      z.object({
        institutionName: z.string().min(1, "Institution name is required."),
        boardName: z.string().optional(),
        specialization: z.string().optional(),
        state: z.string().min(1, "State is required."),
        city: z.string().min(1, "City is required."),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        mathematicsScore: z.string().optional(),
        physicsScore: z.string().optional(),
        chemistryScore: z.string().optional(),
      })
    )
    .min(1, "At least one education entry is required."),
  certifications: z
    .array(
      z.object({
        certificationName: z.string().min(1, "Certification name is required."),
        certificationId: z.string().optional(),
        institute: z.string().optional(),
        year: z
          .string()
          .regex(/^\d{4}$/, "Year must be a valid 4-digit year.")
          .optional(),
      })
    )
    .optional(),
  internships: z
    .array(
      z.object({
        title: z.string().min(1, "Internship title is required."),
        organization: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        paid: z.boolean().optional(),
        ongoing:z.boolean().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name is required."),
        client: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        link: z.string().url("Please enter a valid project link").optional(),
        attachments: z.string().optional(),
      })
    )
    .optional(),
  skills: z
    .array(z.string().min(1, "Skill is required."))
    .max(6, "You can add a maximum of 6 skills.")
    .optional(),
  domainKnowledge: z
    .array(z.string().min(1, "Domain knowledge is required."))
    .max(6, "You can add a maximum of 6 domain knowledge items.")
    .optional(),
  achievements: z
    .array(z.string().min(1, "Achievement is required."))
    .max(6, "You can add a maximum of 6 achievements.")
    .optional(),
}); */

export const formSchema = z.object({
  personalInformation: z.object({
    photo: z.string().url().optional(),
  }),
  basicInformation: z.object({
    firstName: z.string().min(1, "First name is required."),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required."),
    currentDesignation: z.string().min(1, "Designation is required."),
    address: z.object({
      addressLine: z.string().optional(),
      country: z.string().min(1, "Country is required."),
      state: z.string().min(1, "State is required."),
      city: z.string().min(1, "City is required."),
      pincode: z
        .string()
        .regex(/^\d{4,6}$/, "Pincode must be 4 to 6 digits.")
        .optional(),
    }),
    email: z.string().email("Please enter a valid email address."),
    mobile: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
    linkedIn: z.string().url("Please enter a valid LinkedIn URL").optional(),
    github: z.string().url("Please enter a valid GitHub URL").optional(),
  }),
  summary: z.object({
    summary: z.string().min(1, "Summary is required."),
  }),
  certifications: z
    .array(
      z.object({
        certificationName: z.string().min(1, "Certification name is required."),
        certificationId: z.string().optional(),
        institute: z.string().optional(),
        year: z
          .string()
          .regex(/^\d{4}$/, "Year must be a valid 4-digit year.")
          .optional(),
      })
    )
    .optional(),
  internships: z
    .array(
      z.object({
        title: z.string().min(1, "Internship title is required."),
        organization: z.string().optional(),
        location: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        paid: z.enum(["paid", "unpaid"]).optional(),
        ongoing: z.boolean().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
    projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name is required."),
        client: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        link: z.string().url("Please enter a valid project link").optional(),
        attachments: z.string().optional(),
      })
    )
    .optional(),
    skills: z
    .array(z.string().min(1, "Skill is required."))
    .max(6, "You can add a maximum of 6 skills.")
    .optional(),
  domainKnowledge: z
    .array(z.string().min(1, "Domain knowledge is required."))
    .max(6, "You can add a maximum of 6 domain knowledge items.")
    .optional(),
  achievements: z
    .array(z.string().min(1, "Achievement is required."))
    .max(6, "You can add a maximum of 6 achievements.")
    .optional(),
});

export type FormFields = z.infer<typeof formSchema>;

export const defaultValues = {
  personalInformation: {
    photo: "https://example.com/default-photo.jpg",
  },
  basicInformation: {
    firstName: "Nayeem",
    middleName: "Basha",
    lastName: "Maseed",
    currentDesignation: "Fresher",
    address: {
      addressLine: "VelevarthyPadu Road",
      country: "India",
      state: "Andhra Pradesh",
      city: "Guntur",
      pincode: "522438",
    },
    email: "mnayeembasha@gmail.com",
    mobile: "9391188027",
    linkedIn: "https://linkedin.com/in/mnayeembasha",
    github: "https://github.com/mnayeembasha",
  },
  summary: {
    summary:
      "A passionate developer with expertise in building scalable web applications.",
  },
};
