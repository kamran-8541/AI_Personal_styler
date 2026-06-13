import React from "react";
import { Navbar } from "./component/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen text-gray-900 overflow-hidden bg-[#f2f2f2]">
      <div className="relative z-20">
        <Navbar />
      </div>

      <section className="relative h-[calc(100vh-96px)] min-h-[420px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.prod.website-files.com/681afc3d8594bd00b7866ccd%2F681b032c0db34e3762f4fb28_aiuta-transcode.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 hidden md:flex items-center justify-center px-10">
          <div className="w-full max-w-[1500px] flex items-center justify-center text-[#0c1535] font-semibold leading-none">
            <span className="text-6xl lg:text-8xl">Your Virtual</span>
            <span className="w-[20vw] min-w-[120px] max-w-[320px]" />
            <span className="text-6xl lg:text-8xl">AI Stylist</span>
          </div>
        </div>

        <div className="absolute inset-0 md:hidden flex items-center justify-center px-6 text-center">
          <h2 className="text-5xl font-semibold leading-tight text-[#0c1535]">
            Your Virtual
            <br />
            AI Stylist
          </h2>
        </div>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Home />
  );
};

export default App;