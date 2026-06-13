import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaTshirt, FaUserTie, FaCrown, FaLock } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import ChatBot from "./ChatBot";
import { Navbar } from "./Navbar";

const categories = [
  {
    title: "Casual Vibes",
    key: "casual",
    query: "casual outfit fashion front view full body model",
    desc: "Everyday comfort meets modern style.",
    icon: <FaTshirt className="text-4xl text-indigo-700" />,
    color: "from-indigo-50 to-white",
  },
  {
    title: "Formal Fits",
    key: "formal",
    query: "formal outfit style front view full body model",
    desc: "Dress to impress with tailored elegance.",
    icon: <FaUserTie className="text-4xl text-purple-700" />,
    color: "from-purple-50 to-white",
  },
  {
    title: "Party Glam",
    key: "party",
    query: "party outfit fashion front view full body model",
    desc: "Sparkle and shine for your next big night.",
    icon: <FaCrown className="text-4xl text-pink-700" />,
    color: "from-pink-50 to-white",
  },
  {
    title: "Ethnic Charm",
    key: "traditional",
    query: "ethnic traditional outfit fashion front view full body model",
    desc: "Celebrate culture with timeless ethnic styles.",
    icon: <FaLock className="text-4xl text-blue-700" />,
    color: "from-blue-50 to-white",
  },
];

const OUTFITS_PER_PAGE = 50;
const genderOptions = [
  { label: "All", value: "all" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
];

const ExplorePage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedGender, setSelectedGender] = useState("all");

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8010";

  const normalizeImageKey = (url) => {
    const raw = String(url || "").trim();
    if (!raw) return "";

    try {
      const parsed = new URL(raw);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return raw.split("?")[0];
    }
  };

  const fetchCategoryOutfits = async (category, page, append = false, gender = selectedGender) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setRecommendations([]);
      setStatusMessage("");
    }

    try {
      const searchParams = new URLSearchParams({
        query: category.query,
        per_page: String(OUTFITS_PER_PAGE),
        page: String(page),
        category: category.key,
        gender,
      });

      const response = await fetch(`${API_URL}/outfits?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Outfit API failed with status ${response.status}`);
      }

      const data = await response.json();
      const outfits = Array.isArray(data.outfits) ? data.outfits : [];

      setCurrentPage(page);
      setTotalPages(Number(data.total_pages) || 0);
      setTotalResults(Number(data.total_results) || 0);

      if (outfits.length === 0) {
        setStatusMessage(
          append
            ? "No more outfits found for this category."
            : `No outfits found for ${category.title}${gender !== "all" ? ` (${gender})` : ""}.`
        );
        return;
      }

      setStatusMessage("");
      setRecommendations((prev) => {
        const uniqueImages = new Map();

        if (append) {
          prev.forEach((item) => {
            const key = normalizeImageKey(item.image);
            if (key && !uniqueImages.has(key)) {
              uniqueImages.set(key, item.image);
            }
          });
        }

        outfits.forEach((image) => {
          const key = normalizeImageKey(image);
          if (key && !uniqueImages.has(key)) {
            uniqueImages.set(key, image);
          }
        });

        return Array.from(uniqueImages.values()).map((image) => ({
          image,
        }));
      });
    } catch (err) {
      console.error(err);
      setStatusMessage("Failed to fetch outfits. Check AI service on port 8010.");
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    setTotalPages(0);
    setTotalResults(0);
    await fetchCategoryOutfits(category, 1, false, selectedGender);
  };

  const handleGenderChange = async (gender) => {
    setSelectedGender(gender);
    setCurrentPage(0);
    setTotalPages(0);
    setTotalResults(0);
    if (selectedCategory) {
      await fetchCategoryOutfits(selectedCategory, 1, false, gender);
    }
  };

  const handleLoadMore = async () => {
    if (!selectedCategory || loading || loadingMore) return;
    if (totalPages > 0 && currentPage >= totalPages) return;
    await fetchCategoryOutfits(selectedCategory, currentPage + 1, true, selectedGender);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />

      <div className="px-6 py-20">
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Explore Your Style
          </h2>
        </Motion.div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-3">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleGenderChange(option.value)}
              className={
                selectedGender === option.value
                  ? "rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow"
                  : "rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700"
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((item) => (
            <Motion.div
              key={item.key}
              onClick={() => handleCategoryClick(item)}
              whileHover={{ scale: 1.03 }}
              className={`bg-gradient-to-br ${item.color} flex cursor-pointer items-center justify-between rounded-2xl border p-6`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-gray-600">{item.desc}</p>
                </div>
              </div>
              <FiArrowRight className="text-2xl" />
            </Motion.div>
          ))}
        </div>

        {loading && <p className="mt-8 text-center text-gray-600">Loading recommendations...</p>}
        {!loading && statusMessage && <p className="mt-8 text-center font-medium text-red-600">{statusMessage}</p>}

        {recommendations.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-bold">Recommended Outfits</h2>
            <p className="mb-8 text-center text-gray-600">
              Showing {recommendations.length}
              {totalResults > 0 ? ` of ${totalResults}` : ""} looks
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendations.map((item, index) => (
                <Motion.div
                  key={`${item.image}-${index}`}
                  whileHover={{ scale: 1.04 }}
                  className="mx-auto w-full max-w-[240px] overflow-hidden rounded-xl border bg-white shadow-md"
                >
                  <img
                    src={item.image}
                    alt={selectedCategory ? `${selectedCategory.title} outfit` : "Outfit"}
                    className="h-56 w-full bg-gray-100 object-contain"
                  />

                  <div className="flex justify-center p-4">
                    <button
                      type="button"
                      disabled
                      className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700 opacity-80"
                    >
                      Virtual Try On
                    </button>
                  </div>
                </Motion.div>
              ))}
            </div>

            {selectedCategory && (totalPages === 0 || currentPage < totalPages) && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore || loading}
                  className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? "Showing more..." : "Show More Outfits"}
                </button>
              </div>
            )}
          </div>
        )}

        <ChatBot />
      </div>
    </div>
  );
};

export default ExplorePage;
