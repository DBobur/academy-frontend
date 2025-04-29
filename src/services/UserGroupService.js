import axios from "../utils/axiosInstance";

const UserGroupService = {
    create: (data) => axios.post("/user-group", data),
    getAll: () => axios.get("/user-group"),
    addUserToGroup: (groupId, userId) =>
        axios.post(`/user-group/${groupId}/users/${userId}`) // <-- to'g'rilandi
};

export default UserGroupService;
