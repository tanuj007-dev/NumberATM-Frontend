import { useEffect, useState } from "react";
import axiosAPI from "../../api/axiosAPI";

export default function VipNumberUploader() {
    const [text, setText] = useState("");
    const [owner, setOwner] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [showNewVendorInput, setShowNewVendorInput] = useState(false);

    const axios = axiosAPI();

    const getVendors = async () => {
        try {
            const { data } = await axios.get('/vendors');
            setVendors(data);
        } catch (e) {
            console.log(e);
        }
    };

    const extractNumbers = (input) => {
        const extracted = [];
        const seen = new Set();
        const lines = input.split(/\r?\n/);
        let lastPrice = 0;

        const priceRegex = /(\d{3,7})\s*(?:rs|\u20B9)/i;
        const fullNumberRegex = /\b([6789]\d{9})\b/g;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Step 1: Update price if this line mentions one
            const priceMatch = line.match(priceRegex);
            if (priceMatch) {
                lastPrice = parseInt(priceMatch[1].replace(/,/g, ""), 10);
            }

            // Step 2: Directly extract 10-digit mobile numbers from this line
            let match;
            while ((match = fullNumberRegex.exec(line)) !== null) {
                const num = match[1];
                if (!seen.has(num)) {
                    seen.add(num);
                    extracted.push({ number: num, price: lastPrice || 0 });
                }
            }

            // Step 3: Try to reconstruct numbers from digit fragments
            const fragments = line
                .replace(/[^\d\s]/g, "")
                .split(/\s+/)
                .map((f) => f.trim())
                .filter((f) => /^\d+$/.test(f));

            for (let j = 0; j < fragments.length; j++) {
                let combined = fragments[j];
                for (let k = j + 1; k < fragments.length && combined.length < 10; k++) {
                    combined += fragments[k];
                    if (combined.length === 10 && /^[6789]/.test(combined)) {
                        if (!seen.has(combined)) {
                            seen.add(combined);
                            extracted.push({ number: combined, price: lastPrice || 0 });
                        }
                    }
                }
            }
        }

        setNumbers(extracted);
    };

    useEffect(() => {
        getVendors();
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
        extractNumbers(e.target.value);
    };

    const saveNumbers = async () => {
        if (!owner.trim()) {
            alert("Please enter an owner's name!");
            return;
        }

        if (numbers.length === 0) {
            alert("No valid numbers to save!");
            return;
        }

        try {
            await axios.post("/vip-numbers/add-text", {
                numbers: numbers.map((n) => ({ ...n, owner })),
            });
            alert("Numbers saved successfully!");
            setText("");
            setOwner("");
            setNumbers([]);
            setShowNewVendorInput(false);
        } catch (error) {
            console.error(error);
            alert("Failed to save numbers.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">VIP Number Uploader</h2>

            <div className="mb-3">
                <label className="block text-gray-700 mb-1">Select Vendor</label>
                {!showNewVendorInput ? (
                    <div className="flex items-center gap-2">
                        <select
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        >
                            <option value="">Select a Vendor</option>
                            {vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor._id}>
                                    {vendor.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="px-3 py-2 text-nowrap bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={() => setShowNewVendorInput(true)}
                        >
                            Add New Vendor
                        </button>
                    </div>
                ) : (
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Enter new vendor name"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                )}
            </div>

            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                rows="5"
                placeholder="Paste numbers here..."
                value={text}
                onChange={handleTextChange}
            />

            {numbers.length > 0 && (
                <div
                    className="mt-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full border-collapse bg-white rounded-md">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="p-3 text-left">Number</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {numbers.map((num, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-100 transition">
                                        <td className="p-3">{num.number}</td>
                                        <td className="p-3">₹{num.price.toLocaleString()}</td>
                                        <td className="p-3">{owner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={saveNumbers}
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition"
                    >
                        Save Numbers
                    </button>
                </div>
            )}
        </div>
    );
}
