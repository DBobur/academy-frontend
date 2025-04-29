import { useState } from "react";
import UserService from "../services/UserService";

const UserCreatePage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "USER", // default role
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.register(formData);
            alert("User created successfully!");
            setFormData({
                fullName: "",
                username: "",
                email: "",
                password: "",
                role: "USER",
            });
        } catch (error) {
            console.error(error);
            alert("Failed to create user.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                /><br/><br/>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                /><br/><br/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                /><br/><br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                /><br/><br/>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="USER">User</option>
                    <option value="MENTOR">Mentor</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select><br/><br/>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default UserCreatePage;
