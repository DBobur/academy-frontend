import axios from "../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/login", { username, password });

            const token = response.data; // ⚡ Faqat token qabul qilayapti backend (DTO emas!)
            localStorage.setItem("token", token); // ✅ token saqlaymiz!

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Login failed!");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
