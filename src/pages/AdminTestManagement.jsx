import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import CreateTestForm from "./CreateTestForm";
import CreateQuestionForm from "./CreateQuestionForm";
import CreateOptionForm from "./CreateOptionForm";
import TestList from "./TestList";

const AdminTestManagementPage = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const res = await axios.get("/tests"); // 🧪 Barcha testlarni olish
            setTests(res.data);
        } catch (error) {
            console.error("Failed to fetch tests", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>🧪 Admin Test Management</h1>

            <section style={{ marginBottom: "40px" }}>
                <h2>➕ Create New Test</h2>
                <CreateTestForm onTestCreated={fetchTests} />
            </section>

            <section style={{ marginBottom: "40px" }}>
                <h2>📝 Add Question to Test</h2>
                <CreateQuestionForm tests={tests} onQuestionCreated={fetchTests} />
            </section>

            <section style={{ marginBottom: "40px" }}>
                <h2>📚 Add Option to Question</h2>
                <CreateOptionForm tests={tests} onOptionCreated={fetchTests} />
            </section>

            <section>
                <h2>🗒️ Test List (Tests, Questions, Options)</h2>
                <TestList tests={tests} />
            </section>
        </div>
    );
};

export default AdminTestManagementPage;
