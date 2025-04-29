import axios from "../utils/axiosInstance";

const UserService = {
    getMe: () => axios.get("/user/me"),
    register: (data) => axios.post("/auth/register", data),
};

export default UserService;
