import { Link } from "react-router-dom";
import { ModeToggle } from "./ui/mode-toggle";

const Navbar = () => {
  return (
    <div className="text-blue-600 sticky top-0 z-50 border-b flex justify-between items-center px-8 py-5 backdrop-blur-lg">
      <Link to="/" className="text-2xl tracking-tight font-semibold">ResumeBuilder </Link>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

// firstName: "Nayeem",
// lastName: "Basha",
// collegeName: "RGUKT Nuzvid",
// specialization: "undergraduate",
// course: "btech",
// branch: "cse",
// passOutYear: "2025",
// cgpaOrPercentage: "35",
// gender: "male",
// githubProfile: "https://github.com/mnayeembasha",
// linkedInProfile: "https://linkedin.com/in/mnayeemabasha",
// jobPreferredCountries: [],
// jobPreferredStates: [],
// jobPreferredCities: [],

export default Navbar;
