export const initialResumeData = {
  personalInformation: {
    photo: "https://as1.ftcdn.net/v2/jpg/07/02/98/70/1000_F_702987027_NnBUPLoKDppCJl0XJJJRm15E1sQoy9I1.jpg"
  },
  basicInformation: {
    firstName: "Nayeem",
    middleName: "",
    lastName: "Basha",
    currentDesignation: "fresher",
    address: {
      addressLine: "VelevarthyPadu Road",
      country: "India",
      state: "Andhra Pradesh",
      city: "Guntur",
      pincode: "522438"
    },
    email: "mnayeembasha@gmail.com",
    mobile: "9391188027",
    linkedIn: "https://linkedin.com/in/mnayeembasha",
    github: "https://github.com/mnayeembasha"
  },
  summary: {
    summary: "A passionate developer with expertise in building scalable web applications."
  },
  certifications: [
    {
      certificationName: "web developer",
      certificationId: "123",
      institute: "rgukt",
      year: "2022"
    }
  ],
  internships: [
    {
      title: "Frontend Developer",
      organization: "SELABS",
      location: "US",
      startDate: "2024-12-01T00:30:00.000Z",
      endDate: "2024-12-29T00:30:00.000Z",
      paid: "paid",
      ongoing: true,
      description: "Develop professional frontend websites"
    }
  ],
  projects: [
    {
      name: "SecondBrain",
      client: "100xdevs",
      startDate: "2024-11-01T00:30:00.000Z",
      endDate: "2024-12-20T00:30:00.000Z",
      link: "https://mnayeembasha.github.io/task-runners",
      attachments: "no"
    },
    {
      name: "AIRBNB",
      client: "airbnb",
      startDate: "2024-09-01T00:30:00.000Z",
      endDate: "2024-12-06T00:30:00.000Z",
      link: "https://mnayeembasha.github.io/airbnb",
      attachments: "nope"
    }
  ],
  education: {
    ssc: {
      instistutionName: "Ratnam High School",
      city: "Guntur",
      startDate: new Date("12-06-2019"),
      endDate: new Date("2020-04-14"),
    }
  },
  skills: ["React", "MongoDB", "NodeJs", "ExpressJs", "Git", "Github"],
  domainKnowledge: ["Software Development", "Artificial Intelligence", "Machine Learning"],
  achievements: ["Won Bootstrap Hackathon", "Best Project Award in College Fest"],
  // projects:[{
  //   name:'abc',
  //   client:'abc',
  //   link:'abc'
  // }]
};