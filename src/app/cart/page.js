'use client'
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"



const Page = () => {

    // const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [cartStorage, setCartStorage] = useState(() => {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem('cart')) || []
})
//     const [total]=useState(()=>cartStorage.length==1?cartStorage[0].price:cartStorage.reduce((a,b)=>{
// return a.price+b.price
//     }))
// Replace with this
const [total] = useState(() => {
    if (cartStorage.length === 0) return 0
    if (cartStorage.length === 1) return cartStorage[0].price
    return cartStorage.reduce((a, b) => a + b.price, 0)
})
    const router = useRouter()
    console.log(total);

    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }else{
            router.push('/user-auth?order=true')
        }
       
    }

    const removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter((item) => item._id !== id);

    localStorage.setItem('cart', JSON.stringify(cart));

    setCartStorage(cart);
};
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">

    <CustomerHeader />

    <div className="flex-grow px-4 md:px-10 py-6">

        {/* Cart Items */}
        <div className="space-y-5">

            {
                cartStorage.length > 0 ? cartStorage.map((item) => (

                    <div
                        key={item._id}
                        className="flex flex-col md:flex-row gap-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#F4A020] transition-all"
                    >

                        <div className="w-full md:w-24 flex justify-center md:justify-start">
                            <img
                                src={item.img_path}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex-1">

                            <div className="text-lg font-semibold">
                                {item.name}
                            </div>

                            <div className="text-[#888888] text-sm mt-1">
                                {item.description}
                            </div>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="mt-3 px-4 py-2 bg-[#F4A020] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#FFD166] transition-all"
                            >
                                Remove From Cart
                            </button>

                        </div>

                        <div className="text-[#F4A020] font-semibold md:text-right">
                            Price: ₹{item.price}
                        </div>

                    </div>

                ))
                :
                <h1 className="text-center text-[#888888] text-xl">
                    No Food Items for this Restaurant
                </h1>
            }

        </div>

    </div>

    {/* Total Section */}
    <div className="bg-[#1A1A1A] border-t border-[#2A2A2A] px-4 md:px-10 py-6 flex flex-col md:flex-row gap-6">

        <div className="flex-1 space-y-3">

            <div className="flex justify-between text-[#CCCCCC]">
                <span>Food Charges :</span>
                <span>{total}</span>
            </div>

            <div className="flex justify-between text-[#CCCCCC]">
                <span>Tax :</span>
                <span>{total * TAX / 100}</span>
            </div>

            <div className="flex justify-between text-[#CCCCCC]">
                <span>Delivery Charges :</span>
                <span>{DELIVERY_CHARGES}</span>
            </div>

            <div className="flex justify-between text-white font-semibold border-t border-[#2A2A2A] pt-2">
                <span>Total Amount :</span>
                <span className="text-[#F4A020]">
                    {total + DELIVERY_CHARGES + (total * TAX / 100)}
                </span>
            </div>

        </div>

        <div className="flex items-center justify-center md:justify-end">

            <button
                onClick={orderNow}
                className="w-full md:w-auto px-8 py-3 bg-[#F4A020] text-[#0D0D0D] font-bold rounded-lg hover:bg-[#FFD166] transition-all"
            >
                Order Now
            </button>

        </div>

    </div>

    <Footer />

</div>
    )
}

export default Page