'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const [myOrders, setMyOrders] = useState([])
    const [updating, setUpdating] = useState(null) // tracks which order is being updated
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (!delivery) {
            router.push('/deliverypartner')
            return
        }
        getMyOrders()
        setMounted(true)
    }, [])

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem('delivery'))
        let response = await fetch('http://localhost:3000/api/deliverypartners/orders/' + deliveryData._id)
        response = await response.json()
        if (response.success) {
            setMyOrders(response.result)
        }
    }

    const updateStatus = async (orderId, status) => {
        setUpdating(orderId)
        try {
            let response = await fetch('http://localhost:3000/api/order/' + orderId, {
                method: 'PUT',
                body: JSON.stringify({ status })
            })
            response = await response.json()
            if (response.success) {
                // update status locally without refetching
                setMyOrders(prev =>
                    prev.map(order =>
                        order._id === orderId ? { ...order, status } : order
                    )
                )
            } else {
                alert("Failed to update status")
            }
        } catch (err) {
            alert("Something went wrong")
        }
        setUpdating(null)
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirm': return { color: "#60A5FA", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)" }
            case 'on the way': return { color: "#F4A020", bg: "rgba(244,160,32,0.1)", border: "rgba(244,160,32,0.3)" }
            case 'delivered': return { color: "#4ADE80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" }
            case 'failed to delivery': return { color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" }
            default: return { color: "#CCCCCC", bg: "rgba(204,204,204,0.1)", border: "rgba(204,204,204,0.3)" }
        }
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-[#F4A020]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#F4A020" strokeWidth="4" />
                    <path className="opacity-75" fill="#F4A020" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white">
            <DeliveryHeader />

            <div className="px-4 md:px-8 py-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        My <span style={{ color: "#F4A020" }}>Orders</span>
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "rgba(204,204,204,0.5)" }}>
                        {myOrders.length} order{myOrders.length !== 1 ? 's' : ''} assigned to you
                    </p>
                </div>

                {/* Empty state */}
                {myOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                            style={{ backgroundColor: "rgba(244,160,32,0.1)", border: "1px solid rgba(244,160,32,0.2)" }}
                        >
                            🛵
                        </div>
                        <p className="text-xl font-semibold text-white">No orders yet</p>
                        <p className="text-sm" style={{ color: "rgba(204,204,204,0.5)" }}>
                            Orders assigned to you will appear here
                        </p>
                    </div>
                )}

                {/* Orders list */}
                <div className="space-y-5">
                    {myOrders.map((item, index) => {
                        const statusStyle = getStatusColor(item.status)
                        return (
                            <div
                                key={item._id || index}
                                className="rounded-2xl p-6 transition-all"
                                style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
                            >
                                {/* Top row */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div>
                                        <h4 className="text-lg font-bold text-white">
                                            {item.data.name}
                                        </h4>
                                        <p className="text-sm mt-0.5" style={{ color: "rgba(204,204,204,0.5)" }}>
                                            Order #{item._id?.slice(-6).toUpperCase()}
                                        </p>
                                    </div>
                                    {/* Status badge */}
                                    <span
                                        className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                                        style={{
                                            color: statusStyle.color,
                                            backgroundColor: statusStyle.bg,
                                            border: `1px solid ${statusStyle.border}`
                                        }}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                {/* Info pills */}
                                <div className="flex flex-wrap gap-3 mb-5">
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                                        style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}
                                    >
                                        <span style={{ color: "rgba(204,204,204,0.5)" }}>💰 Amount:</span>
                                        <span className="text-white font-semibold">₹{item.amount}</span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                                        style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}
                                    >
                                        <span style={{ color: "rgba(204,204,204,0.5)" }}>📍 Address:</span>
                                        <span className="text-white font-semibold">{item.data.address}</span>
                                    </div>
                                </div>

                                {/* Update status */}
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4"
                                    style={{ borderTop: "1px solid #2A2A2A" }}
                                >
                                    <span className="text-sm" style={{ color: "rgba(204,204,204,0.5)" }}>
                                        Update Status:
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <select
                                            defaultValue={item.status}
                                            onChange={(e) => updateStatus(item._id, e.target.value)}
                                            disabled={updating === item._id}
                                            className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-2 text-white outline-none focus:border-[#F4A020] text-sm"
                                        >
                                            <option value="confirm">Confirm</option>
                                            <option value="on the way">On the way</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="failed to delivery">Failed to delivery</option>
                                        </select>

                                        {updating === item._id && (
                                            <svg className="animate-spin h-5 w-5 text-[#F4A020]" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#F4A020" strokeWidth="4" />
                                                <path className="opacity-75" fill="#F4A020" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                        )}

                                        {updating !== item._id && item.status === 'delivered' && (
                                            <span className="text-xs font-semibold" style={{ color: "#4ADE80" }}>
                                                ✅ Delivered
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Page