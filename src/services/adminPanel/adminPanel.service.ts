// import { JWTOutputDTO } from "./models/output.model";
import { ErrorOutputDto } from "../models/output.model";
// import { SignUpInputDto } from "./models/input.model"
import http from "../../config/axios";

const getUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const res = await http.get(`/adminPanel/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        }
    }
};

export const adminPanelService = { getUsers };