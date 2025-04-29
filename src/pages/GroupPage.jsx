import { useState, useEffect, useContext } from "react";
import UserGroupService from "../services/UserGroupService";
import GroupUserService from "../services/GroupUserService";
import { AuthContext } from "../store/authContext";

const GroupPage = () => {
    const { user } = useContext(AuthContext);
    const [groupName, setGroupName] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
    const [newUserId, setNewUserId] = useState("");

    const fetchGroups = async () => {
        try {
            const res = await UserGroupService.getAll();
            setGroups(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGroupUsers = async (groupId) => {
        try {
            setSelectedGroupId(groupId); // groupId ni saqlaymiz
            const res = await GroupUserService.getUsersByGroupId(groupId);
            setSelectedGroupUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await UserGroupService.create({
                groupName,
                userId: user?.id,
            });
            alert("Group created!");
            setGroupName("");
            fetchGroups();
        } catch (error) {
            console.error(error);
            alert("Failed to create group.");
        }
    };

    const handleAddUser = async () => {
        if (!newUserId || !selectedGroupId) {
            alert("Please select a group and enter user ID.");
            return;
        }
        try {
            await UserGroupService.addUserToGroup(selectedGroupId, newUserId); // ⚡
            alert("User added to group successfully!");
            setNewUserId("");
            fetchGroupUsers(selectedGroupId); // guruh usersni yangilab olamiz
        } catch (error) {
            console.error(error);
            alert("Failed to add user to group.");
        }
    };


    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Groups</h1>

            <form onSubmit={handleCreateGroup}>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <button type="submit">Create Group</button>
            </form>

            <hr />

            <h2>Group List</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        {group.groupName}
                        <button onClick={() => fetchGroupUsers(group.id)} style={{ marginLeft: "10px" }}>
                            Show Users
                        </button>
                    </li>
                ))}
            </ul>

            <hr />

            {selectedGroupId && (
                <>
                    <h2>Users in Group</h2>
                    <ul>
                        {selectedGroupUsers.map((user) => (
                            <li key={user.id}>
                                {user.fullName || user.username || "No name"}
                            </li>
                        ))}
                    </ul>

                    <h3>Add User to Group</h3>
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={newUserId}
                        onChange={(e) => setNewUserId(e.target.value)}
                    />
                    <button onClick={handleAddUser}>Add User</button>
                </>
            )}
        </div>
    );
};

export default GroupPage;
