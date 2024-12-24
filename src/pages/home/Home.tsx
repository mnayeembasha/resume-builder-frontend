import { Button } from "../../components/ui/button";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-blue-500">
      <Navbar />
      <main className="min-h-[80vh] flex flex-col justify-center items-center">
        <div>
          <div className="font-medium bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text text-4xl text-center">
            Build Professional <span className="">Resumes</span> Effortlessly
          </div>
          <div className="my-8 flex justify-center">
            <Link to="/register">
              <Button className="w-[11rem] h-[3rem] bg-gradient-to-b from-blue-300 to-blue-700 text-lg">
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
