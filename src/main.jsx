import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Explore from "./component/Explore.jsx";
import ExploreStylist from "./component/ExploreStylist.jsx";
import About from "./component/About.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Blog from "./component/Blog.jsx";
import VirtualTryOn from "./component/VirtualTryOn.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/explorestylist" element={<ExploreStylist />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/virtualtryOn" element={<VirtualTryOn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
