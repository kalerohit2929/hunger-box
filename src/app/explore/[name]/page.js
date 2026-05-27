'use client'
import CustomerHeader from "@/app/_components/CustomerHeader"
import { useEffect, useState } from "react"

const Page = (props) => {
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([])
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds, setCartIds] = useState(cartStorage ? () => cartStorage.map((cartItem) => cartItem._id) : [])
    const [removeCartData, setRemoveCartData] = useState()
    const [bannerImage, setBannerImage] = useState(
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80'
    )

    useEffect(() => {
        loadRestaurantDetails()
        loadBannerImage()
    }, []);

    const loadBannerImage = async () => {
        try {
            const query = encodeURIComponent(`${decodeURI(name)} restaurant food`)
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
                {
                    headers: {
                        Authorization: `Client-ID F6SiTUynTs_7GwHljBvKV8jCaplW5bGNp9U6WarwT2s` // 🔑 replace this
                    }
                }
            )
            const data = await response.json()
            if (data.results && data.results.length > 0) {
                setBannerImage(data.results[0].urls.regular)
            }
        } catch (err) {
            // fallback image stays if API fails
            console.log("Banner image load failed", err)
        }
    }

    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        let response = await fetch("http://localhost:3000/api/customer/" + id)
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.details)
            setFoodItems(response.foodItems)
        }
    }

    const addToCart = (item) => {
        let localCartIds = cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds)
        setCartData(item)
        setRemoveCartData();
    }

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        var localIds = cartIds.filter(item => item != id);
        setCartData()
        setCartIds(localIds)
    }

    const infoBadges = [
        { icon: "📞", label: "Contact", value: restaurantDetails?.contact },
        { icon: "🏙️", label: "City", value: restaurantDetails?.city },
        { icon: "📍", label: "Address", value: restaurantDetails?.address },
        { icon: "✉️", label: "Email", value: restaurantDetails?.email },
    ]

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white">

            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

            {/* ── Hero Banner ── */}
            <div
                className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-700"
                style={{
                    backgroundImage: `url('${bannerImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Dark overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 px-4">
                    <span
                        className="text-xs tracking-[0.2em] uppercase font-semibold px-4 py-1 rounded-full"
                        style={{
                            backgroundColor: "rgba(244,160,32,0.15)",
                            border: "1px solid rgba(244,160,32,0.5)",
                            color: "#F4A020"
                        }}
                    >
                        🍽️ Restaurant
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                        {decodeURI(name)}
                    </h1>
                    <div className="w-16 h-[3px] rounded-full mt-1" style={{ backgroundColor: "#F4A020" }} />
                </div>
            </div>

            {/* ── Info Badges ── */}
            <div
                className="px-4 md:px-10 py-5 flex flex-wrap gap-3 border-b border-[#2A2A2A]"
                style={{ backgroundColor: "#111111" }}
            >
                {infoBadges.map((badge) =>
                    badge.value ? (
                        <div
                            key={badge.label}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#CCCCCC" }}
                        >
                            <span>{badge.icon}</span>
                            <span style={{ color: "rgba(204,204,204,0.5)" }}>{badge.label}:</span>
                            <span className="text-white font-medium">{badge.value}</span>
                        </div>
                    ) : null
                )}
            </div>

            {/* ── Food List (unchanged) ── */}
            <div className="px-4 md:px-10 py-8 space-y-5">
                {foodItems.length > 0 ? foodItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col md:flex-row gap-5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#F4A020] transition-all"
                    >
                        <img src={item.img_path} className="w-28 h-28 object-cover rounded-lg" />
                        <div className="flex-1">
                            <div className="text-lg font-semibold text-white">{item.name}</div>
                            <div className="text-[#F4A020] font-semibold">₹{item.price}</div>
                            <div className="text-[#888888] text-sm mt-1">{item.description}</div>
                            <div className="mt-4">
                                {cartIds.includes(item._id) ? (
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="px-4 py-2 rounded-lg bg-[#F4A020] text-[#0D0D0D] font-semibold hover:bg-[#FFD166] transition-all"
                                    >
                                        Remove From Cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-4 py-2 rounded-lg bg-[#F4A020] text-[#0D0D0D] font-semibold hover:bg-[#FFD166] transition-all"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <h1 className="text-center text-[#888888] text-xl">No Food Items for this Restaurant</h1>
                )}
            </div>

        </div>
    )
}

export default Page