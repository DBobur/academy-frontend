import { useState } from "react";
import axios from "../utils/axiosInstance";

const CreateTestForm = ({ onTestCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/tests", {
                title,
                description,
            });
            alert("Test created successfully!");
            setTitle("");
            setDescription("");
            onTestCreated();
        } catch (error) {
            console.error("Failed to create test", error);
            alert("Failed to create test.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Test Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            /><br/><br/>
            <textarea
                placeholder="Test Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            /><br/><br/>
            <button type="submit">➕ Create Test</button>
        </form>
    );
};

export default CreateTestForm;
