import React, { useState } from "react";
import axios from "axios";

const Termin = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("https://barbershop-backend-rex2.onrender.com/api/tolmacclients/getAllUsers", formData);
            console.log("Termin created:", response.data);
            setSuccess("Termin successfully created!");
            setFormData({ name: "", email: "", phone: "" }); // Clear form
            setError(""); // Reset error
        } catch (error) {
            console.error("Failed to create termin:", error);
            setError("Failed to create termin. Please try again.");
            setSuccess(""); // Reset success message
        }
    };

    return (
        <div className="pt-40 ">
            <p className="text-center">Zakazivanje termina</p>
            <div className="flex justify-center">
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Client Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Client Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Zakazi termin</button>
                </form>
                </div>
                {success && <div className="text-green-500">{success}</div>}
                {error && <div className="text-red-500">{error}</div>}
        
        </div>
    );
};

export default Termin;
