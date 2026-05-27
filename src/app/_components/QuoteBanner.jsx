'use client'
import { useEffect, useState } from 'react'

const quotes = [
    "Good food is the foundation of genuine happiness. 🍕",
    "Delivering smiles, one meal at a time. 🛵",
    "Your cravings, our mission. 🍔",
    "Fresh. Fast. Delicious. Right at your door. 🥗",
    "Because great food shouldn't wait. ⚡",
]

const QuoteBanner = () => {
    const [current, setCurrent] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % quotes.length)
                setFade(true)
            }, 500)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Black shadow overlay */}
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.80))" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">

                {/* Top label */}
                <span
                    className="text-xs tracking-[0.25em] uppercase font-semibold px-4 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
                >
                    HungerBox
                </span>

                {/* Animated quote */}
                <p
                    className="text-xl sm:text-2xl md:text-3xl font-bold max-w-2xl leading-snug transition-all duration-500"
                    style={{
                        color: "#FFFFFF",
                        opacity: fade ? 1 : 0,
                        transform: fade ? "translateY(0px)" : "translateY(10px)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                >
                    "{quotes[current]}"
                </p>

                {/* Dots indicator */}
                <div className="flex items-center gap-2 mt-2">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true) }, 300) }}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === current ? "24px" : "8px",
                                height: "8px",
                                backgroundColor: i === current ? "#F4A020" : "rgba(255,255,255,0.3)",
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default QuoteBanner