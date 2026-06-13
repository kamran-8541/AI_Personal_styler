import React from "react";
import { motion as Motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Navbar } from "./Navbar";
import cmo from "../assets/CEO.jpg";
import ceo from "../assets/Cmo.jpg";
import SDE from "../assets/sde.jpeg";

const About = () => {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navbar />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 space-y-14">
        <Motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="font-light">SnapStyle</span>
        </Motion.h1>

      
        <Motion.p
          className="max-w-3xl text-lg md:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          SnapStyle is your personal{" "}
          <span className="font-semibold text-gray-900">AI stylist</span>,
          helping you discover looks that reflect your individuality. We blend
          technology and design to make fashion intuitive, smart, and effortless.
        </Motion.p>

      
        <div className="my-team w-full max-w-5xl mt-10">
          <h2 className="text-3xl font-semibold mb-10 tracking-tight">Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          
            <div className="flex flex-col items-center space-y-3">
              <img
                src={ceo}
                className="w-[200px] h-[200px] bg-gray-200 object-cover rounded-md"
                alt="CEO"
              />
              <h3 className="text-xl font-semibold">Mansi Rawat</h3>
              <p className="text-gray-600 text-sm tracking-wide uppercase">
                Chief Executive Officer
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <img
                src={SDE}
                className="w-[200px] h-[200px] bg-gray-200 object-cover rounded-md"
                alt="CTO"
              />
              <h3 className="text-xl font-semibold">Istkhar</h3>
              <p className="text-gray-600 text-sm tracking-wide uppercase">
                Chief Technology Officer
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <img
                src={cmo}
                className="w-[200px] h-[200px] bg-gray-200 object-cover rounded-md"
                alt="CMO"
              />
              <h3 className="text-xl font-semibold">Kamran Alam</h3>
              <p className="text-gray-600 text-sm tracking-wide uppercase">
                Chief Marketing Officer
              </p>
            </div>
          </div>
        </div>

        <Motion.div
          className="mt-20 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <FaHeart className="text-3xl text-gray-800 mx-auto mb-4" />
          <p>
            We believe style is not about trends — it’s about self-expression.
            SnapStyle exists to simplify, inspire, and empower how you dress.
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default About;
