import React from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate ,useLocation} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/explore";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate(from, { replace: true });
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="src/component/AdobeStock_1737972709_Video_4K_Preview.mov"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Create Account ✨</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />

          <Motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg"
          >
            Sign Up
          </Motion.button>
        </form>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold">
            Log in
          </Link>
        </p>
      </Motion.div>
    </div>
  );
};

export default Signup;
