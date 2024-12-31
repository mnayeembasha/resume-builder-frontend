import { Button } from "../../components/ui/button";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Build Professional Resumes Effortlessly
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Your one-stop solution for creating and customizing resumes!
          </p>
          <div className="mt-6">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-lg hover:scale-105 transition-transform">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
