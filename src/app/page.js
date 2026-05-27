'use client'
import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import Section1 from "./_components/Section1"
import Footer from "./_components/Footer";
import OffersDeals from './_components/OffersDeals';
import StatsBar from './_components/StatsBar'
// import ReviewCard from "./_components/ReviewCard"
import ReviewCard from "./_components/ReviewCard "
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, [])

  const loadLocations = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json();
    if (response.success) setLocations(response.result);
  }

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) url = url + "?location=" + params.location;
    else if (params?.restaurant) url = url + "?restaurant=" + params.restaurant;
    let response = await fetch(url);
    response = await response.json();
    if (response.success) setRestaurants(response.result);
  }

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  }

  return (
    <div style={{ backgroundColor: "#0F0F0F", minHeight: "100vh" }}>

      {/* Navbar */}
      <CustomerHeader />

      {/* Hero section */}
      <Section1 />
      

      {/* Search & filter section */}
      <div
        className="text-white text-center px-4 md:px-8 py-14 md:py-20"
        style={{
          backgroundImage: "url('https://a.storyblok.com/f/88809/1150x450/30a9c4f9a6/igevia_header_fastfood01_450.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.85)",
          backgroundBlendMode: "multiply",
        }}
      >
        <span
          className="inline-block mb-4 px-4 py-1 rounded-full text-xs tracking-widest uppercase"
          style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
        >
          🍽️ Find Your Favourite Food
        </span>

        <h2
          className="font-extrabold mb-3"
          style={{ color: "#F4A020", fontSize: "clamp(28px, 5vw, 52px)" }}
        >
          What are you craving?
        </h2>

        <p className="mb-8 text-sm md:text-base" style={{ color: "rgba(204,204,204,0.5)" }}>
          Search from hundreds of restaurants near you
        </p>

        {/* Search bar */}
        <div
          className="rounded-2xl p-3 w-full md:w-[70%] lg:w-[55%] mx-auto flex flex-col md:flex-row gap-3 relative"
          style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(244,160,32,0.5)" }}
        >
          {/* Location picker */}
          <div className="relative w-full md:w-[35%]">
            <input
              type="text"
              value={selectedLocation}
              onClick={() => setShowLocation(true)}
              className="w-full h-11 bg-transparent px-4 text-white outline-none text-sm"
              placeholder="📍 Select Location"
            />
            {showLocation && (
              <ul
                className="absolute top-12 left-0 w-full rounded-xl overflow-hidden z-50"
                style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(244,160,32,0.4)" }}
              >
                {locations.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleListItem(item)}
                    className="px-4 py-3 text-left text-sm cursor-pointer transition-all"
                    style={{ borderBottom: "1px solid #2A2A2A", color: "#CCCCCC" }}
                    onMouseEnter={e => { e.target.style.backgroundColor = "#2A2A2A"; e.target.style.color = "#F4A020" }}
                    onMouseLeave={e => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "#CCCCCC" }}
                  >
                    📍 {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: "#2A2A2A" }} />

          {/* Search input */}
          <input
            type="text"
            className="w-full md:flex-1 h-11 bg-transparent px-4 text-white outline-none text-sm"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
            placeholder="🔍 Search restaurant or food..."
          />

          {/* Search button */}
          <button
            className="h-11 px-6 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            style={{ backgroundColor: "#F4A020", color: "#1A1A1A" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="px-4 md:px-10 py-14" style={{ backgroundColor: "#0F0F0F" }}>

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span
            className="mb-3 px-4 py-1 rounded-full text-xs tracking-widest uppercase"
            style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
          >
            🏪 Explore
          </span>
          <h2 className="font-extrabold" style={{ color: "#CCCCCC", fontSize: "clamp(26px, 4vw, 42px)" }}>
            Featured <span style={{ color: "#F4A020" }}>Restaurants</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(204,204,204,0.4)" }}>
            {restaurants.length > 0 ? `${restaurants.length} restaurants found` : "Discover top restaurants near you"}
          </p>
        </div>

        {/* Restaurant cards */}
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
            {restaurants.map((item) => (
              <div
                key={item._id}
                onClick={() => router.push('explore/' + item.name + "?id=" + item._id)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                }}
                onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(244,160,32,0.5)"}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid #2A2A2A"}
              >
                {/* Restaurant icon + name */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                    style={{ backgroundColor: "#F4A020", color: "#1A1A1A" }}
                  >
                    {item.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-base" style={{ color: "#F4A020" }}>
                      {item.name}
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(204,204,204,0.5)" }}>
                      📞 {item.contact}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3" style={{ borderTop: "1px solid #2A2A2A" }} />

                {/* Address */}
                <div className="text-xs space-y-1" style={{ color: "rgba(204,204,204,0.6)" }}>
                  <p>📍 {item.city}, {item.address}</p>
                  <p>✉️ {item.email}</p>
                </div>

                {/* CTA */}
                <div className="mt-4 flex justify-end">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: "rgba(244,160,32,0.15)", color: "#F4A020" }}
                  >
                    View Menu →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16" style={{ color: "rgba(204,204,204,0.3)" }}>
            <span className="text-5xl mb-4">🍽️</span>
            <p className="text-lg font-semibold">No restaurants found</p>
            <p className="text-sm mt-1">Try searching a different location or name</p>
          </div>
        )}
      </div>

      {/* Reviews */}
      <StatsBar /> 
      <OffersDeals />
      <ReviewCard />

      {/* Footer */}
      <Footer />

    </div>
  );
}