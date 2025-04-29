import axios from "../utils/axiosInstance";

const GroupUserService = {
    getUsersByGroupId: (groupId) =>
        axios.get(`/user-group/${groupId}/users`), // or `/group-users?groupId=${id}`

};

export default GroupUserService;
