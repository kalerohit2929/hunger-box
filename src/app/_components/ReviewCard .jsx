'use client'
import { useState } from "react"

const reviews = [
    {
        id: 1,
        name: "Rahul Sharma",
        location: "Nagpur",
        rating: 5,
        review: "Amazing experience! Food arrived hot and fresh within 25 minutes. The packaging was great and everything was exactly as ordered.",
        food: "Butter Chicken + Naan",
        avatar: "RS"
    },
    {
        id: 2,
        name: "Priya Patel",
        location: "Mumbai",
        rating: 5,
        review: "HungerBox is my go-to app for late night cravings. Super fast delivery and the food quality is always top notch!",
        food: "Margherita Pizza",
        avatar: "PP"
    },
    {
        id: 3,
        name: "Aman Verma",
        location: "Delhi",
        rating: 4,
        review: "Great variety of restaurants to choose from. Ordered biryani and it was absolutely delicious. Will definitely order again!",
        food: "Chicken Biryani",
        avatar: "AV"
    },
    {
        id: 4,
        name: "Sneha Joshi",
        location: "Pune",
        rating: 5,
        review: "The delivery partner was very polite and on time. Love the real-time tracking feature. HungerBox never disappoints!",
        food: "Paneer Tikka",
        avatar: "SJ"
    },
    {
        id: 5,
        name: "Karan Mehta",
        location: "Bangalore",
        rating: 4,
        review: "Ordered for my entire office and everyone loved it. Easy bulk ordering and great discounts. Highly recommended!",
        food: "Veg Thali",
        avatar: "KM"
    },
    {
        id: 6,
        name: "Divya Singh",
        location: "Hyderabad",
        rating: 5,
        review: "Best food delivery app I have used. The app is smooth, delivery is fast and the food is always fresh and hot!",
        food: "Masala Dosa",
        avatar: "DS"
    },
]

const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className="text-lg"
                style={{ color: star <= rating ? "#F4A020" : "#3A3A3A" }}
            >
                ★
            </span>
        ))}
    </div>
)

const ReviewCard = ({ review }) => (
    <div
        className="flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 hover:border-[#F4A020]/40 hover:scale-[1.02]"
        style={{
            backgroundColor: "#222222",
            borderColor: "#2A2A2A",
        }}
    >
        {/* Top: avatar + name */}
        <div className="flex items-center gap-3">
            <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: "#F4A020", color: "#1A1A1A" }}
            >
                {review.avatar}
            </div>
            <div>
                <p className="font-semibold text-[#CCCCCC] text-sm">{review.name}</p>
                <p className="text-xs" style={{ color: "rgba(204,204,204,0.4)" }}>📍 {review.location}</p>
            </div>
            <div className="ml-auto">
                <StarRating rating={review.rating} />
            </div>
        </div>

        {/* Review text */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(204,204,204,0.7)" }}>
            "{review.review}"
        </p>

        {/* Food ordered */}
        <div className="flex items-center gap-2 mt-auto">
            <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "#2A2A2A", color: "#F4A020" }}>
                🍽️ {review.food}
            </span>
        </div>
    </div>
)

const CustomerReviews = () => {
    const [showAll, setShowAll] = useState(false)
    const displayed = showAll ? reviews : reviews.slice(0, 3)

    return (
        <div className="w-full py-16 px-4 md:px-10" style={{ backgroundColor: "#1A1A1A" }}>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
                <span
                    className="mb-3 px-4 py-1 rounded-full text-xs tracking-widest uppercase"
                    style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
                >
                    ⭐ What People Say
                </span>
                <h2 className="font-extrabold" style={{ color: "#CCCCCC", fontSize: "clamp(28px, 4vw, 48px)" }}>
                    Customer <span style={{ color: "#F4A020" }}>Reviews</span>
                </h2>
                <p className="mt-3 text-sm md:text-base max-w-xl" style={{ color: "rgba(204,204,204,0.5)" }}>
                    Thousands of happy customers trust HungerBox for their daily meals
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap justify-center gap-8 mt-8">
                    {[
                        { value: "4.8★", label: "Average Rating" },
                        { value: "10K+", label: "Happy Customers" },
                        { value: "98%", label: "Satisfaction Rate" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <span className="text-2xl font-extrabold" style={{ color: "#F4A020" }}>{stat.value}</span>
                            <span className="text-xs mt-1" style={{ color: "rgba(204,204,204,0.4)" }}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {displayed.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* Show more / less */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                        border: "1px solid rgba(244,160,32,0.4)",
                        color: "#F4A020",
                    }}
                >
                    {showAll ? "Show Less ↑" : "Read More Reviews ↓"}
                </button>
            </div>

        </div>
    )
}

export default CustomerReviews