import { motion as Motion } from "framer-motion";
import { Navbar } from "./Navbar";

const blogs = [
  {
    era: "90s Streetwear",
    quote: "Where rebellion met baggy silhouettes.",
    image:
      "https://i.pinimg.com/1200x/81/a3/d2/81a3d255bbdd9b57fde7c743d02367cb.jpg",
    styles: ["Baggy Jeans", "Graphic Tees", "Sneakers", "Hip-Hop Vibes"],
  },
  {
    era: "Y2K 2000s",
    quote: "Bold, shiny, and adorable.",
    image:
      "https://assets.vogue.com/photos/678ac4a7e831a5e94ddc5394/master/w_2560%2Cc_limit/2161812386",
    styles: ["Low-rise Jeans", "Crop Tops", "Shiny Fabrics", "Pop Aesthetic"],
  },
  {
    era: "Gen-Z Street",
    quote: "Comfort meets experimental self-expression.",
    image:
      "https://i.pinimg.com/564x/0a/44/62/0a44626749fdeadc70cab90d185a1bc2.jpg",
    styles: ["Oversized Hoodies", "Chunky Sneakers", "Cargo Pants", "Layered Fits"],
  },
  {
    era: "Luxury Aesthetic",
    quote: "Minimal, powerful, timeless.",
    image:
      "https://i.pinimg.com/736x/e0/4f/3e/e04f3e3c5fa76fcfcd33f0e7c3469f91.jpg",
    styles: ["Tailored Blazers", "Neutral Colors", "Premium Fabrics", "Clean Cuts"],
  },
  {
    era: "Future-Gen",
    quote: "Space-time, futuristic, new era.",
    image:
      "https://i.pinimg.com/736x/9c/47/71/9c477164333e13e9ba0d8433c80e78e3.jpg",
    styles: ["Robotic Fits", "Metallic Look", "Luminous Details", "Full body suits"],
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Navbar />

      <div className="px-6 py-20">
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Fashion Through Generations
        </h1>

        <p className="text-center max-w-3xl mx-auto text-gray-600 mb-20 text-lg">
          Explore how fashion evolved across decades - from rebellious streetwear
          to clean luxury. Every generation tells a story through style.
        </p>

        <div className="space-y-32 max-w-6xl mx-auto">
          {blogs.map((blog, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12`}
            >
              <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={blog.image}
                  alt={blog.era}
                  className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-4xl font-bold mb-4">{blog.era}</h2>
                <p className="italic text-indigo-600 mb-6 text-lg">"{blog.quote}"</p>

                <div className="grid grid-cols-2 gap-4">
                  {blog.styles.map((style, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 bg-white rounded-xl shadow text-sm font-medium text-gray-700"
                    >
                      {style}
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
