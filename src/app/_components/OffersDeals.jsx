'use client'
import Link from 'next/link'


const offers = [
    {
        id: 1,
        tag: "Limited Time",
        emoji: "🎉",
        title: "50% OFF on First Order",
        description: "New to HungerBox? Get 50% off on your very first order. No minimum order value required!",
        code: "WELCOME50",
        color: "#F4A020",
        expiry: "Valid till 31 May 2026"
    },
    {
        id: 2,
        tag: "Weekend Special",
        emoji: "🍕",
        title: "Free Delivery All Weekend",
        description: "Order anything this weekend and enjoy free delivery on all orders above ₹199.",
        code: "FREEWEEKEND",
        color: "#E85520",
        expiry: "Sat & Sun only"
    },
    {
        id: 3,
        tag: "Combo Deal",
        emoji: "🍔",
        title: "Buy 2 Get 1 Free",
        description: "Order any 2 items from selected restaurants and get the cheapest one absolutely free!",
        code: "B2G1FREE",
        color: "#20A0F4",
        expiry: "Valid on selected restaurants"
    },
    {
        id: 4,
        tag: "Members Only",
        emoji: "👑",
        title: "Flat ₹100 Cashback",
        description: "Logged in users get flat ₹100 cashback on orders above ₹499. Credited within 24 hours.",
        code: "MEMBER100",
        color: "#A020F4",
        expiry: "For registered users only"
    },
]

const CopyButton = ({ code }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        alert(`Code "${code}" copied!`)
    }

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: "#2A2A2A", color: "#F4A020", border: "1px dashed rgba(244,160,32,0.5)" }}
        >
            🏷️ {code}
            <span className="text-xs font-normal" style={{ color: "rgba(204,204,204,0.5)" }}>TAP TO COPY</span>
        </button>
    )
}

const OffersDeals = () => {
    return (
        <div className="w-full py-16 px-4 md:px-10" style={{ backgroundColor: "#0F0F0F" }}>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
                <span
                    className="mb-3 px-4 py-1 rounded-full text-xs tracking-widest uppercase"
                    style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
                >
                    🔥 Hot Deals
                </span>
                <h2 className="font-extrabold" style={{ color: "#CCCCCC", fontSize: "clamp(28px, 4vw, 48px)" }}>
                    Offers & <span style={{ color: "#F4A020" }}>Deals</span>
                </h2>
                <p className="mt-3 text-sm md:text-base max-w-xl" style={{ color: "rgba(204,204,204,0.5)" }}>
                    Grab the best deals before they expire. Copy the code and apply at checkout!
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #2A2A2A",
                        }}
                        onMouseEnter={e => e.currentTarget.style.border = `1px solid ${offer.color}40`}
                        onMouseLeave={e => e.currentTarget.style.border = "1px solid #2A2A2A"}
                    >
                        {/* Glow blob */}
                        <div
                            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                            style={{ backgroundColor: offer.color }}
                        />

                        {/* Tag */}
                        <span
                            className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                            style={{ backgroundColor: `${offer.color}20`, color: offer.color }}
                        >
                            {offer.tag}
                        </span>

                        {/* Emoji + Title */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">{offer.emoji}</span>
                            <h3 className="font-extrabold text-lg md:text-xl" style={{ color: "#CCCCCC" }}>
                                {offer.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(204,204,204,0.55)" }}>
                            {offer.description}
                        </p>

                        {/* Divider */}
                        <div className="mb-5" style={{ borderTop: "1px dashed #2A2A2A" }} />

                        {/* Bottom row */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <CopyButton code={offer.code} />
                            <span className="text-xs" style={{ color: "rgba(204,204,204,0.35)" }}>
                                🕐 {offer.expiry}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-center mt-12">
                <Link
                    href="/"
                    className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                        backgroundColor: "#F4A020",
                        color: "#1A1A1A",
                        boxShadow: "0 8px 30px rgba(244,160,32,0.25)",
                    }}
                >
                    Order Now & Save 🚀
                </Link>
            </div>

        </div>
    )
}

export default OffersDeals