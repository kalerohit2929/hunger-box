'use client'
import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"

const Page = () => {
    const [userStorage, setUserStorage] = useState(null)
    const [cartStorage, setCartStorage] = useState(null)
    const [total, setTotal] = useState(0)
    const [removeCartData, setRemoveCartData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const cart = JSON.parse(localStorage.getItem('cart'))

        if (!cart || cart.length === 0) {
            router.push('/')
            return
        }

        const cartTotal = cart.length === 1
            ? cart[0].price
            : cart.reduce((a, b) => ({ price: (a.price || a) + b.price }))?.price || 0

        setUserStorage(user)
        setCartStorage(cart)
        setTotal(cartTotal)
        setMounted(true)
    }, [])

    const tax = parseFloat((total * TAX / 100).toFixed(2))
    const grandTotal = parseFloat((total + DELIVERY_CHARGES + tax).toFixed(2))

    const orderNow = async () => {
        setLoading(true)
        setError('')
        try {
            const user_id = userStorage._id
            const city = userStorage.city
            const foodItemIds = cartStorage.map((item) => item._id).toString()

            let deliveryBoyResponse = await fetch('http://localhost:3000/api/deliverypartners/' + city)
            deliveryBoyResponse = await deliveryBoyResponse.json()
            const deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id)
            const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]

            if (!deliveryBoy_id) {
                setError("No delivery partner available in your city right now. Please try again later.")
                setLoading(false)
                return
            }

            const resto_id = cartStorage[0].resto_id
            const collection = {
                user_id, resto_id, foodItemIds, deliveryBoy_id,
                status: 'confirm',
                amount: grandTotal,
            }

            let response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                body: JSON.stringify(collection)
            })
            response = await response.json()

            if (response.success) {
                setSuccess(true)
                setRemoveCartData(true)
                setTimeout(() => router.push('myprofile'), 3000)
            } else {
                setError("Order failed. Please try again.")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        }
        setLoading(false)
    }

    // ── Not mounted yet (server side) ──
    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-10 w-10 text-[#F4A020]" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="#F4A020" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p className="text-[#CCCCCC] text-sm">Loading your order...</p>
                </div>
            </div>
        )
    }

    // ── Success Screen ──
    if (success) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-6 text-center px-4">
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                    style={{ backgroundColor: "rgba(244,160,32,0.15)", border: "2px solid #F4A020" }}
                >
                    🎉
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">Order Confirmed!</h1>
                <p className="text-[#CCCCCC] text-lg">Your food is being prepared. Hang tight! 🍔</p>
                <div
                    className="px-6 py-3 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: "rgba(244,160,32,0.1)", border: "1px solid rgba(244,160,32,0.3)", color: "#F4A020" }}
                >
                    Redirecting to your profile...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
            <CustomerHeader removeCartData={removeCartData} />

            <div className="flex-grow px-4 md:px-10 py-8">

                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Review Your Order</h1>
                    <p className="text-sm mt-1" style={{ color: "rgba(204,204,204,0.5)" }}>
                        Check your details before placing the order
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── Left Column ── */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Order Items */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}>
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                🛒 <span>Your Items</span>
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full ml-1"
                                    style={{ backgroundColor: "rgba(244,160,32,0.15)", color: "#F4A020", border: "1px solid rgba(244,160,32,0.3)" }}
                                >
                                    {cartStorage?.length} item{cartStorage?.length > 1 ? 's' : ''}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                {cartStorage?.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 pb-4" style={{ borderBottom: "1px solid #2A2A2A" }}>
                                        <img src={item.img_path} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold truncate">{item.name}</p>
                                            <p className="text-sm mt-0.5" style={{ color: "rgba(204,204,204,0.5)" }}>
                                                {item.description?.slice(0, 50)}{item.description?.length > 50 ? '...' : ''}
                                            </p>
                                        </div>
                                        <p className="text-[#F4A020] font-bold flex-shrink-0">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}>
                            <h2 className="text-lg font-bold text-white mb-4">📍 Delivery Details</h2>
                            <div className="space-y-3">
                                {[
                                    { label: "Name", value: userStorage?.name, icon: "👤" },
                                    { label: "Mobile", value: userStorage?.mobile, icon: "📞" },
                                    { label: "City", value: userStorage?.city, icon: "🏙️" },
                                    { label: "Address", value: userStorage?.address, icon: "🏠" },
                                ].map((row) => (
                                    <div key={row.label} className="flex items-center justify-between py-2 px-4 rounded-xl" style={{ backgroundColor: "#111111" }}>
                                        <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(204,204,204,0.5)" }}>
                                            {row.icon} {row.label}
                                        </span>
                                        <span className="text-white text-sm font-medium">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ── Right Column - Bill ── */}
                    <div className="flex flex-col gap-6">

                        {/* Bill Summary */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}>
                            <h2 className="text-lg font-bold text-white mb-4">🧾 Bill Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm" style={{ color: "rgba(204,204,204,0.6)" }}>
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{total}</span>
                                </div>
                                <div className="flex justify-between text-sm" style={{ color: "rgba(204,204,204,0.6)" }}>
                                    <span>Tax ({TAX}%)</span>
                                    <span className="text-white">₹{tax}</span>
                                </div>
                                <div className="flex justify-between text-sm" style={{ color: "rgba(204,204,204,0.6)" }}>
                                    <span>Delivery Charges</span>
                                    <span className="text-white">₹{DELIVERY_CHARGES}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-3 mt-1" style={{ borderTop: "1px solid #2A2A2A" }}>
                                    <span className="text-white">Grand Total</span>
                                    <span style={{ color: "#F4A020" }}>₹{grandTotal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}>
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{ backgroundColor: "rgba(244,160,32,0.1)", border: "1px solid rgba(244,160,32,0.2)" }}
                            >
                                💵
                            </div>
                            <div>
                                <p className="text-white font-semibold">Cash on Delivery</p>
                                <p className="text-sm" style={{ color: "rgba(204,204,204,0.5)" }}>Pay when your order arrives</p>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className="rounded-xl px-4 py-3 text-sm"
                                style={{ backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#FCA5A5" }}
                            >
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Place Order Button */}
                        <button
                            onClick={orderNow}
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-lg transition-all"
                            style={{
                                backgroundColor: loading ? "rgba(244,160,32,0.5)" : "#F4A020",
                                color: "#0D0D0D",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Placing Order...
                                </span>
                            ) : (
                                "🛵 Place Order Now"
                            )}
                        </button>

                        <p className="text-xs text-center" style={{ color: "rgba(204,204,204,0.3)" }}>
                            By placing your order you agree to our terms & conditions
                        </p>

                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Page