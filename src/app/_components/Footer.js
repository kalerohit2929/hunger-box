import Link from 'next/link'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#0F0F0F", borderTop: "1px solid #2A2A2A" }}>

            {/* Main footer */}
            <div className="px-6 md:px-16 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

                {/* Brand col */}
                <div className="flex flex-col gap-2">
                    <img src="/logo1.svg" className="h-[40px] w-auto object-contain" alt="HungerBox Logo" />
                    <p className="text-sm mt-1" style={{ color: "rgba(204,204,204,0.4)" }}>
                        Hunger solved in a box. Fast, fresh and delivered to your door.
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                        <Link
                            href="https://rohitkaleportfolio.netlify.app"
                            target="_blank"
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 text-[#CCCCCC] hover:text-[#F4A020]"
                            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        >
                            <FaGlobe size={14} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/rohit-kale-5bba80329"
                            target="_blank"
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 text-[#CCCCCC] hover:text-[#F4A020]"
                            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        >
                            <FaLinkedin size={14} />
                        </Link>
                    </div>
                </div>

                {/* Quick links - 2 columns on mobile */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-sm tracking-widest uppercase" style={{ color: "#F4A020" }}>
                        Quick Links
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
                        {[
                            { label: "Home", href: "/" },
                            { label: "Add Restaurant", href: "/restaurant" },
                            { label: "Delivery Partner", href: "/deliverypartner" },
                            { label: "My Profile", href: "/myprofile" },
                            { label: "Cart", href: "/cart" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm w-fit transition-all hover:translate-x-1 hover:text-[#F4A020]"
                                style={{ color: "rgba(204,204,204,0.5)" }}
                            >
                                → {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Developer info */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-sm tracking-widest uppercase" style={{ color: "#F4A020" }}>
                        Developer
                    </h4>
                    <p className="text-sm" style={{ color: "rgba(204,204,204,0.5)" }}>
                        Designed & built with ❤️ by
                    </p>
                    <p className="text-lg font-extrabold" style={{ color: "#CCCCCC" }}>
                        Rohit Kale
                    </p>
                    <div className="flex gap-3 mt-1">
                        <Link
                            href="https://rohitkaleportfolio.netlify.app"
                            target="_blank"
                            className="text-xs px-4 py-2 rounded-full transition-all hover:scale-105 text-[#CCCCCC] hover:text-[#F4A020] hover:border-[#F4A020]"
                            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        >
                            🌐 Portfolio
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/rohit-kale-5bba80329"
                            target="_blank"
                            className="text-xs px-4 py-2 rounded-full transition-all hover:scale-105 text-[#CCCCCC] hover:text-[#F4A020] hover:border-[#F4A020]"
                            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        >
                            💼 LinkedIn
                        </Link>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div
                className="px-6 md:px-16 py-3 flex flex-col md:flex-row justify-between items-center gap-1 text-xs"
                style={{ borderTop: "1px solid #2A2A2A", color: "rgba(204,204,204,0.3)" }}
            >
                <p>© 2026 HungerBox. All rights reserved.</p>
                <p>Made with ❤️ in India 🇮🇳</p>
            </div>

        </div>
    )
}

export default Footer