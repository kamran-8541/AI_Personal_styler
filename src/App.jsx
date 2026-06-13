import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./component/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
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

        <div className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 px-0 sm:bottom-8 sm:w-[calc(100%-3rem)]">
          <div className="grid gap-4 border border-black bg-white p-4 md:grid-cols-[1.25fr_0.75fr] md:items-center md:p-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-black/60">Try-on studio</p>
              <h3 className="mt-2 text-lg font-medium text-black sm:text-2xl">
                Open the virtual fitting room and place outfits on your photo.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                Upload a picture, choose a garment, and refine the placement directly on the canvas.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/virtualtryOn"
                className="inline-flex items-center justify-center border border-black px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
              >
                Open Virtual Try-On
              </Link>
            </div>
          </div>
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
