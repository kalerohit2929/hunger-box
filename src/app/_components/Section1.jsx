import React from 'react'
import Link from "next/link"

const Section1 = () => {
    return (
    <>
    

<div
  className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#1A1A1A]"
//   style={{
//     backgroundImage: "url('/bg1.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//   }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.65)" }} />

  {/* Floating food particles */}
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
    {["🍕", "🍔", "🍜", "🌮", "🍣", "🍩", "🥗", "🍱"].map((emoji, i) => (
      <span
        key={i}
        className="absolute text-3xl opacity-10 animate-bounce"
        style={{
          left: `${10 + i * 11}%`,
          top: `${15 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${2 + i * 0.3}s`,
        }}
      >
        {emoji}
      </span>
    ))}
  </div>

  {/* Main content */}
  <div className="relative z-10 flex flex-col justify-center items-center text-center px-6">

    {/* Badge */}
    <span
      className="mb-5 px-5 py-1.5 rounded-full text-sm tracking-widest uppercase"
      style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
    >
      🔥 Fast Delivery · Fresh Food
    </span>

    {/* Main title */}
    <h1 className="flex flex-wrap justify-center items-center gap-3 leading-none">
      <span
        className="font-extrabold tracking-tight"
        style={{ color: "#CCCCCC", fontSize: "clamp(40px, 7vw, 90px)" }}
      >
        HUNGER
      </span>
      <span
        className="font-extrabold tracking-tight"
        style={{ color: "#F4A020", fontSize: "clamp(40px, 7vw, 90px)" }}
      >
        BOX
      </span>
    </h1>

    {/* Tagline */}
    <p
      className="mt-4 font-light tracking-wide italic"
      style={{ color: "rgba(204,204,204,0.8)", fontSize: "clamp(14px, 1.8vw, 22px)" }}
    >
      — hunger solved in a box
    </p>

    {/* Divider */}
    <div className="mt-6 flex items-center gap-3">
      <div className="w-20 h-px" style={{ backgroundColor: "rgba(244,160,32,0.4)" }} />
      <span style={{ color: "#F4A020" }}>✦</span>
      <div className="w-20 h-px" style={{ backgroundColor: "rgba(244,160,32,0.4)" }} />
    </div>

    {/* Sub text */}
    <p
      className="mt-3 tracking-widest uppercase text-sm"
      style={{ color: "rgba(204,204,204,0.4)" }}
    >
      Order · Deliver · Enjoy
    </p>

    {/* CTA Buttons */}
    <div className="mt-8 flex flex-row gap-4">
      <Link
        href="/menu"
        className="px-8 py-3 font-bold rounded-full transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: "#F4A020",
          color: "#1A1A1A",
          fontSize: "clamp(14px, 1.2vw, 18px)",
          boxShadow: "0 8px 30px rgba(244,160,32,0.3)",
        }}
      >
        Order Now 🚀
      </Link>
      <Link
        href="/restaurant"
        className="px-8 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105"
        style={{
          border: "1px solid rgba(204,204,204,0.4)",
          color: "#CCCCCC",
          fontSize: "clamp(14px, 1.2vw, 18px)",
        }}
      >
        Add Restaurant
      </Link>
    </div>

  </div>

  {/* Scroll hint */}
  <div
    className="absolute bottom-8 flex flex-col items-center gap-1 text-xs tracking-widest"
    style={{ color: "rgba(204,204,204,0.3)" }}
  >
    <span>SCROLL</span>
    <span className="animate-bounce">↓</span>
  </div>

</div>
    </>
    )
}

export default Section1