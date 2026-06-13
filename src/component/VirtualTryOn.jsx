import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";

// Inject Google Fonts once into <head> — never render <link> inside JSX
if (typeof document !== "undefined" && !document.getElementById("vto-fonts")) {
  const link = document.createElement("link");
  link.id = "vto-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap";
  document.head.appendChild(link);
}

const outfits = [
  { key: "hoodie", label: "Hoodie", icon: "👕", path: "/outfits/hoodie.png" },
  { key: "jacket", label: "Jacket", icon: "🧥", path: "/outfits/jacket.png" },
  { key: "tshirt", label: "T-Shirt", icon: "👔", path: "/outfits/tshirt.png" },
];

const steps = [
  "Upload a portrait or full-body photo",
  "Pick a garment to place on canvas",
  "Drag and resize to align it",
];

const VirtualTryOn = () => {
  const canvasElementRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const outfitObjectRef = useRef(null);
  const [status, setStatus] = useState("Upload a photo to start styling.");
  const [activeOutfit, setActiveOutfit] = useState(null);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!canvasElementRef.current || fabricCanvasRef.current) return undefined;

    const canvas = new Canvas(canvasElementRef.current, {
      width: 560,
      height: 720,
      backgroundColor: "#f8f7f4",
      preserveObjectStacking: true,
      selection: false,
    });

    canvas.requestRenderAll();
    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
      outfitObjectRef.current = null;
    };
  }, []);

  const getCanvas = () => fabricCanvasRef.current;

  const uploadImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const canvas = getCanvas();
      if (!canvas) return;
      try {
        const image = await FabricImage.fromURL(e.target.result);
        const scale = Math.max(
          canvas.getWidth() / image.width,
          canvas.getHeight() / image.height
        );
        image.set({ originX: "left", originY: "top", left: 0, top: 0, selectable: false, evented: false });
        image.scale(scale);
        canvas.backgroundImage = image;
        canvas.requestRenderAll();
        setPhotoLoaded(true);
        setStatus("Photo loaded. Pick a garment to try on.");
      } catch {
        setStatus("Could not load that image. Try a different file.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    uploadImage(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadImage(e.dataTransfer.files?.[0]);
  };

  const addOutfit = async (outfit) => {
    const canvas = getCanvas();
    if (!canvas) return;
    try {
      if (outfitObjectRef.current) {
        canvas.remove(outfitObjectRef.current);
        outfitObjectRef.current = null;
      }
      const img = await FabricImage.fromURL(outfit.path);
      img.set({
        originX: "center",
        originY: "center",
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() * 0.37,
        cornerStyle: "circle",
        cornerColor: "#1a1a1a",
        borderColor: "#1a1a1a",
        transparentCorners: false,
        padding: 6,
        selectable: true,
        evented: true,
      });
      img.scaleToWidth(canvas.getWidth() * 0.44);
      img.lockScalingFlip = true;
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
      outfitObjectRef.current = img;
      setActiveOutfit(outfit.key);
      setStatus(`${outfit.label} placed. Drag to align with the body.`);
    } catch {
      setStatus("Could not load the outfit image.");
    }
  };

  const clearCanvas = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    if (outfitObjectRef.current) {
      canvas.remove(outfitObjectRef.current);
      outfitObjectRef.current = null;
    }
    canvas.backgroundImage = null;
    canvas.requestRenderAll();
    setPhotoLoaded(false);
    setActiveOutfit(null);
    setStatus("Canvas cleared. Upload a new photo to restart.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1a1a1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Header */}
        <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e8e6e0" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", margin: "0 0 6px" }}>Virtual Studio</p>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: "-0.01em", lineHeight: 1 }}>
              Try-On
            </h1>
          </div>
          <button
            onClick={clearCanvas}
            style={{
              background: "transparent",
              border: "1px solid #d4d0c8",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: "#888",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#d4d0c8"; }}
          >
            ↺ Clear
          </button>
        </header>

        {/* Body grid */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* Left panel */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Steps */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", padding: "1.25rem" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", margin: "0 0 14px" }}>How it works</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#555", lineHeight: 1.5 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: photoLoaded && i === 0 ? "#1a1a1a" : "#f0ede8",
                      color: photoLoaded && i === 0 ? "#fff" : "#999",
                      fontSize: 10, fontWeight: 500, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s", marginTop: 2,
                    }}>{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Upload */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", padding: "1.25rem" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", margin: "0 0 12px" }}>Your photo</p>
              <label
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                style={{
                  display: "block",
                  border: `1.5px dashed ${isDragging ? "#1a1a1a" : "#d4d0c8"}`,
                  borderRadius: 10,
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  background: isDragging ? "#f0ede8" : "transparent",
                  transition: "all 0.15s",
                }}
                onMouseOver={e => { if (!isDragging) e.currentTarget.style.background = "#faf9f7"; }}
                onMouseOut={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontSize: 22, marginBottom: 8, opacity: 0.5 }}>↑</div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 3px", color: "#444" }}>
                  {photoLoaded ? "Replace photo" : "Upload photo"}
                </p>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>PNG, JPG — or drag & drop</p>
                <input type="file" accept="image/*" onChange={handleFileInput} style={{ display: "none" }} />
              </label>
            </div>

            {/* Garments */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", padding: "1.25rem" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", margin: "0 0 12px" }}>Garments</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {outfits.map((outfit) => (
                  <button
                    key={outfit.key}
                    onClick={() => addOutfit(outfit)}
                    style={{
                      background: activeOutfit === outfit.key ? "#1a1a1a" : "#f8f7f4",
                      border: `1px solid ${activeOutfit === outfit.key ? "#1a1a1a" : "#e8e6e0"}`,
                      borderRadius: 10,
                      padding: "12px 6px",
                      cursor: "pointer",
                      textAlign: "center",
                      color: activeOutfit === outfit.key ? "#fff" : "#555",
                      fontSize: 12,
                      fontWeight: 500,
                      transition: "all 0.15s",
                      fontFamily: "inherit",
                    }}
                    onMouseOver={e => { if (activeOutfit !== outfit.key) { e.currentTarget.style.background = "#f0ede8"; e.currentTarget.style.borderColor = "#c8c4bb"; } }}
                    onMouseOut={e => { if (activeOutfit !== outfit.key) { e.currentTarget.style.background = "#f8f7f4"; e.currentTarget.style.borderColor = "#e8e6e0"; } }}
                  >
                    <span style={{ display: "block", fontSize: 20, marginBottom: 4 }}>{outfit.icon}</span>
                    {outfit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div style={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #e8e6e0",
              padding: "10px 14px",
              fontSize: 12,
              color: "#888",
              display: "flex",
              alignItems: "center",
              gap: 8,
              lineHeight: 1.5,
            }}>
              <span style={{ fontSize: 14, opacity: 0.6 }}>ℹ</span>
              {status}
            </div>
          </aside>

          {/* Canvas panel */}
          <section style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", margin: 0 }}>Preview</p>
              <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.04em" }}>560 × 720</span>
            </div>

            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid #e8e6e0", background: "#f8f7f4" }}>
              <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1,
                opacity: photoLoaded ? 0 : 1, transition: "opacity 0.2s",
              }}>
                <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 10 }}>🖼</div>
                <p style={{ fontSize: 13, color: "#bbb", margin: 0 }}>Upload a photo to begin</p>
              </div>
              <canvas
                ref={canvasElementRef}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;