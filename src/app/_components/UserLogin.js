'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"

const loginQuotes = [
    { quote: "Welcome back! Your next meal is just a click away. 🍕", sub: "Log in to continue your food journey." },
    { quote: "Hunger can't wait. Neither should you. ⚡", sub: "Sign in and get food at your doorstep." },
    { quote: "Your favourite restaurants are missing you. 🍔", sub: "Log back in and order your usual." },
    { quote: "Good food. Great vibes. Always on time. 🛵", sub: "We're glad you're back!" },
]

const UserLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % loginQuotes.length)
                setFade(true)
            }, 500)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    const loginHandle = async () => {
        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({ email, password })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push('/order')
            } else {
                router.push('/')
            }
        } else {
            alert("Failed to login. Please try again with valid email and password")
        }
    }

    /* ── Shared quote panel (used in both mobile & desktop) ── */
    const QuotePanel = ({ mobile }) => (
        <div
            className={`relative flex flex-col items-center justify-center text-center overflow-hidden
                ${mobile ? 'w-full h-[160px] md:hidden' : 'hidden md:flex w-[45%] min-h-full px-8 py-10'}`}
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85))" }} />
            <div className="relative z-10 flex flex-col items-center gap-2 px-6">
                <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.4)", color: "#F4A020" }}
                >
                    HungerBox
                </span>
                <p
                    className={`font-bold leading-snug text-white ${mobile ? 'text-sm' : 'text-xl'}`}
                    style={{
                        opacity: fade ? 1 : 0,
                        transform: fade ? "translateY(0px)" : "translateY(8px)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                >
                    "{loginQuotes[current].quote}"
                </p>
                {!mobile && (
                    <p className="text-sm" style={{ color: "rgba(204,204,204,0.6)", opacity: fade ? 1 : 0, transition: "opacity 0.5s ease" }}>
                        {loginQuotes[current].sub}
                    </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                    {loginQuotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true) }, 300) }}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === current ? "20px" : "6px",
                                height: "6px",
                                backgroundColor: i === current ? "#F4A020" : "rgba(255,255,255,0.3)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col md:flex-row min-h-[420px] w-full rounded-xl overflow-hidden">

            {/* Mobile quote banner (top) */}
            <QuotePanel mobile={true} />

            {/* Desktop quote panel (left) */}
            <QuotePanel mobile={false} />

            {/* Form */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-8" style={{ backgroundColor: "#111111" }}>
                <h2 className="text-2xl font-bold text-white mb-1">Welcome back 👋</h2>
                <p className="text-sm mb-6" style={{ color: "rgba(204,204,204,0.5)" }}>Log in to your HungerBox account</p>

                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    />
                </div>
                <button
                    onClick={loginHandle}
                    className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                >
                    Login
                </button>
            </div>

        </div>
    )
}

export default UserLogin