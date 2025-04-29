import { useState } from "react";

const TestList = ({ tests }) => {
    const [openTestId, setOpenTestId] = useState(null);
    const [openQuestionId, setOpenQuestionId] = useState(null);

    const toggleTest = (testId) => {
        setOpenTestId(openTestId === testId ? null : testId);
        setOpenQuestionId(null); // Test ochilganda question collapseni yopib ketadi
    };

    const toggleQuestion = (questionId) => {
        setOpenQuestionId(openQuestionId === questionId ? null : questionId);
    };

    if (!tests.length) return <p>No tests found.</p>;

    return (
        <div style={{ marginTop: "20px" }}>
            {tests.map(test => (
                <div key={test.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleTest(test.id)}
                    >
                        🧪 {test.title} {openTestId === test.id ? "▲" : "▼"}
                    </h3>
                    {openTestId === test.id && (
                        <>
                            <p><strong>Description:</strong> {test.description}</p>
                            {test.questions && test.questions.length > 0 ? (
                                test.questions.map(question => (
                                    <div key={question.id} style={{ marginLeft: "20px", marginBottom: "10px" }}>
                                        <h4
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleQuestion(question.id)}
                                        >
                                            📝 {question.text} {openQuestionId === question.id ? "▲" : "▼"}
                                        </h4>
                                        {openQuestionId === question.id && (
                                            <ul style={{ marginLeft: "20px" }}>
                                                {question.options && question.options.length > 0 ? (
                                                    question.options.map(option => (
                                                        <li key={option.id}>
                                                            {option.text} {option.isCorrect ? "✅" : "❌"}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No options for this question.</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No questions added yet.</p>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TestList;
