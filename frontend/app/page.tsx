import ProjectDeadline from "@/components/ProjectDeadline";
import FocusTime from "@/components/FocusTime";

export default function Home() {
  return (
    <>
      <div className="text-2xl flex items-center justify-center p-5 w-full font-semibold">
        Welcome to FocusTracker
      </div>
      <main className="py-8 flex md:flex-row flex-col  gap-3 asfasdf">
        <FocusTime />
        <ProjectDeadline />
      </main>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        <a
          href="https://github.com/h-hamdy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-[35px] cursor-pointer"
            src="/github.png"
            alt="GitHub Profile"
          />
        </a>
        <a
          href="https://www.beautifulsound.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-[35px] cursor-pointer"
            src="/wave-sound.png"
            alt="GitHub Profile"
          />
        </a>
      </div>
    </>
  );
}
