import axios from "axios";
import http from "../../config/axios";
import { UserOutputDTO } from "./models/output.dto";
import { ChangePasswordInputDto, UserInputDTO } from "./models/input.dto";
import { ErrorOutputDto } from "../models/output.model";


const getUser = async (): Promise<UserOutputDTO | ErrorOutputDto> => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const res = await http.get(`/profile/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        };
    }
}

// const getAchivement = async () : Promise<UserOutputDTO | ErrorOutputDto> => {

// }

const changePassword = async (
    data: ChangePasswordInputDto
): Promise<UserOutputDTO | ErrorOutputDto> => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const res = await http.put(`/profile/password`,
            data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        };
    }
}

const changeInfoUser = async (
    data: UserInputDTO
): Promise<UserOutputDTO | ErrorOutputDto> => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const res = await http.put(`/profile/user`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        };
    }
}

export const profileService = { getUser, changePassword, changeInfoUser };