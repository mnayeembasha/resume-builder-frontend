export interface Address {
    addressLine: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
  }

  export interface BasicInformation {
    firstName: string;
    middleName: string;
    lastName: string;
    currentDesignation: string;
    address: Address;
    email: string;
    mobile: string;
    linkedIn: string;
    github: string;
  }

  export interface Certification {
    certificationName: string;
    certificationId: string;
    institute: string;
    year: string;
  }

  export interface Internship {
    title: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    paid: string;
    ongoing: boolean;
    description: string;
  }

  export interface Project {
    name: string;
    client: string;
    link: string;
    startDate?: string;
    endDate?: string;
    attachments?: string;
  }
  export interface EducationSection{
    instistutionName:string,
    city:string;
    startDate:Date;
    endDate:Date;
    cgpa?:string;
  }
  export interface Education{
    ssc:EducationSection;
    grades11And12:EducationSection,
    underGraduation:EducationSection,
    graduation:EducationSection
  }

  export interface ResumeData {
    personalInformation: {
      photo: string;
    };
    basicInformation: BasicInformation;
    summary: {
      summary: string;
    };
    education:{ssc:EducationSection;
      grades11And12?:EducationSection,
      underGraduation?:EducationSection,
      graduation?:EducationSection};
    certifications?: Certification[];
    internships?: Internship[];
    projects?: Project[];
    skills?: string[];
    domainKnowledge?: string[];
    achievements?: string[];
    selectedTemplate?: string;
  }

  export interface Template {
    id: string;
    name: string;
    thumbnail: string;
  }