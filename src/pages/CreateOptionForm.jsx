import { useState } from "react";
import axios from "../utils/axiosInstance";

const CreateOptionForm = ({ tests, onOptionCreated }) => {
    const [questionId, setQuestionId] = useState("");
    const [text, setText] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/options", {
                questionId,
                text,
                isCorrect,
            });
            alert("Option created successfully!");
            setQuestionId("");
            setText("");
            setIsCorrect(false);
            onOptionCreated();
        } catch (error) {
            console.error("Failed to create option", error);
            alert("Failed to create option.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <select value={questionId} onChange={(e) => setQuestionId(e.target.value)} required>
                <option value="">Select Question</option>
                {tests.flatMap(test => test.questions).map(q => (
                    <option key={q.id} value={q.id}>
                        {q.text.length > 50 ? q.text.slice(0, 50) + "..." : q.text}
                    </option>
                ))}
            </select><br/><br/>
            <input
                type="text"
                placeholder="Option Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            /><br/><br/>
            <label>
                <input
                    type="checkbox"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                /> Correct Answer
            </label><br/><br/>
            <button type="submit">➕ Create Option</button>
        </form>
    );
};

export default CreateOptionForm;
