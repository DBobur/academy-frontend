import { useEffect, useState } from "react";
import UserService from "../services/UserService";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await UserService.getMe();
                setProfile(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Profile</h1>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.number}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
            <p><strong>Created:</strong> {profile.createdDate}</p>
        </div>
    );
};

export default ProfilePage;
