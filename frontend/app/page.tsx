import ProjectDeadline from "@/components/ProjectDeadline";
import FocusTime from "@/components/FocusTime";
import NavBar from "@/components/NavBar";

export default function Home() {

  return (
    <div className="min-h-screen w-full bg-gradient-to-br">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
        {" "}
        <NavBar/>
        <div className="text-2xl flex items-center justify-center p-5 w-full font-semibold">
          Welcome to FocusTracker
        </div>
        <main className="py-8 flex md:flex-row flex-col  gap-3 asfasdf">
          <FocusTime/>
          <ProjectDeadline/>
        </main>
      </div>
    </div>
  );
}
