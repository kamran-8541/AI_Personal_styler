import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaTshirt, FaUserTie, FaUmbrellaBeach, FaGlassCheers } from "react-icons/fa";

const OUTFITS = [
  { title: "Casual", icon: <FaTshirt /> },
  { title: "Office", icon: <FaUserTie /> },
  { title: "Vacation", icon: <FaUmbrellaBeach /> },
  { title: "Party", icon: <FaGlassCheers /> },
];

const ExploreStylist = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (category) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    setRecommendations([]);

    try {
      const res = await fetch("http://localhost:5000/api/stylist/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Request failed");
        return;
      }

      setRecommendations(data.result);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-6">Personal Stylist</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {OUTFITS.map((item) => (
          <Motion.button
            key={item.title}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-purple-600 text-white rounded"
            onClick={() => handleCategoryClick(item.title)}
          >
            <span className="inline-flex items-center gap-2">
              {item.icon}
              {item.title}
            </span>
          </Motion.button>
        ))}
      </div>

      {loading && <p>Loading suggestions...</p>}

      {recommendations.length > 0 && (
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />

                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">Styled by SnapStyle AI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreStylist;
