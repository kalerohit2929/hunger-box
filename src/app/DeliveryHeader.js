'use client'
import Link from "next/link"

const DeliveryHeader = (props) => {
    return (
        <div className="flex items-center justify-between bg-[#1A1A1A] px-4 sm:px-6 md:px-10 py-4 border-b border-[#2A2A2A]">

            {/* Logo */}
            <div className="flex-shrink-0">
                <img
                    src="/logo1.svg"
                    className="h-[40px] sm:h-[45px] w-auto object-contain"
                    alt="HungerBox Logo"
                />
            </div>

            {/* Nav */}
            <ul className="flex items-center gap-1 sm:gap-2">
                <li>
                    <Link
                        href="/"
                        className="text-[#CCCCCC] text-sm sm:text-base hover:text-[#F4A020] transition-all px-2 sm:px-3 py-2 rounded-lg hover:bg-[#2A2A2A]"
                    >
                        Home
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default DeliveryHeader