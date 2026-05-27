'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = (props) => {

    console.log(props.params.id);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, [])

    const handleLoadFoodItem = async () => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id);
        response = await response.json();
        if (response.success) {
            console.log(response.result);
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.img_path)
            setDescription(response.result.description)
        }
    }

    const handleEditFoodItem = async () => {
        console.log(name, price, path, description);
        if (!name || !path || !price || !description) {
            setError(true);
            return false
        } else {
            setError(false)
        }

        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,{
            method:'PUT',
            body:JSON.stringify({name,price,img_path:path,description})
        });
        response = await response.json();
        if(response.success){
            router.push('../dashboard')
        }else{
            alert("data is not updated please try again")
        }


    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-md bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#F4A020] mb-6">
            Update Food Item
        </h1>

        <div className="space-y-5">

            <div>
                <input
                    type="text"
                    className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name &&
                    <span className="text-[#FF6B6B] text-xs mt-1 block">
                        Please enter valid name
                    </span>
                }
            </div>

            <div>
                <input
                    type="text"
                    className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price &&
                    <span className="text-[#FF6B6B] text-xs mt-1 block">
                        Please enter valid price
                    </span>
                }
            </div>

            <div>
                <input
                    type="text"
                    className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    placeholder="Enter image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                {error && !path &&
                    <span className="text-[#FF6B6B] text-xs mt-1 block">
                        Please enter valid path
                    </span>
                }
            </div>

            <div>
                <input
                    type="text"
                    className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && !description &&
                    <span className="text-[#FF6B6B] text-xs mt-1 block">
                        Please enter valid description
                    </span>
                }
            </div>

            <button
                className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                onClick={handleEditFoodItem}
            >
                Update Food Item
            </button>

            <button
                className="w-full h-11 bg-transparent border border-[#2A2A2A] text-[#CCCCCC] rounded-lg hover:border-[#F4A020] hover:text-[#F4A020] transition-all"
                onClick={() => router.push('../dashboard')}
            >
                Back to Food Item list
            </button>

        </div>

    </div>

</div>
    )
}

export default EditFoodItems;