import { useState } from "react";
import axios from "../utils/axiosInstance";

const CreateQuestionForm = ({ tests, onQuestionCreated }) => {
  const [testId, setTestId] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/questions", {
        testId,
        text,
      });
      alert("Question created successfully!");
      setTestId("");
      setText("");
      onQuestionCreated();
    } catch (error) {
      console.error("Failed to create question", error);
      alert("Failed to create question.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <select value={testId} onChange={(e) => setTestId(e.target.value)} required>
        <option value="">Select Test</option>
        {tests.map(test => (
          <option key={test.id} value={test.id}>
            {test.title}
          </option>
        ))}
      </select><br/><br/>
      <textarea
        placeholder="Question Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      /><br/><br/>
      <button type="submit">➕ Create Question</button>
    </form>
  );
};

export default CreateQuestionForm;
