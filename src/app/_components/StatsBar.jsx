'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
    { emoji: "🏪", value: 500, suffix: "+", label: "Restaurants" },
    { emoji: "🛒", value: 10000, suffix: "+", label: "Orders Delivered" },
    { emoji: "😊", value: 98, suffix: "%", label: "Happy Customers" },
    { emoji: "⚡", value: 30, suffix: " min", label: "Avg Delivery Time" },
]

const AnimatedNumber = ({ value, suffix }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!started) return
        let start = 0
        const duration = 2000
        const increment = value / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [started, value])

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    )
}

const StatsBar = () => {
    return (
        <div className="w-full py-14 px-4 md:px-10" style={{ backgroundColor: "#111111" }}>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
                <span
                    className="mb-3 px-4 py-1 rounded-full text-xs tracking-widest uppercase"
                    style={{ border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
                >
                    📊 By The Numbers
                </span>
                <h2 className="font-extrabold" style={{ color: "#CCCCCC", fontSize: "clamp(26px, 4vw, 42px)" }}>
                    Why <span style={{ color: "#F4A020" }}>HungerBox?</span>
                </h2>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center text-center py-8 px-4 rounded-2xl transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #2A2A2A",
                        }}
                        onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(244,160,32,0.4)"}
                        onMouseLeave={e => e.currentTarget.style.border = "1px solid #2A2A2A"}
                    >
                        {/* Emoji */}
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                            style={{ backgroundColor: "#2A2A2A" }}
                        >
                            {stat.emoji}
                        </div>

                        {/* Animated number */}
                        <span
                            className="font-extrabold"
                            style={{ color: "#F4A020", fontSize: "clamp(28px, 3vw, 42px)" }}
                        >
                            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </span>

                        {/* Label */}
                        <span
                            className="mt-2 text-sm font-medium"
                            style={{ color: "rgba(204,204,204,0.6)" }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default StatsBar