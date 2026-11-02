import axios from "axios";
import { ForgotPasswordOutputDTO, JWTOutputDto, VerifyEmailOutputDto } from "./models/output.model";
import { ErrorOutputDto } from "../models/output.model";
import { ResetPasswordInputDto, SignUpInputDto } from "./models/input.model"
import http from "../../config/axios";

const signIn = async (email: string, password: string): Promise<JWTOutputDto | ErrorOutputDto> => {
    try {
        const res = await http.get(
            `/auth/signin?email=${email}&password=${password}`,
        );
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        }
    }
};

const signUp = async (formData: SignUpInputDto): Promise<JWTOutputDto | ErrorOutputDto> => {
    try {
        const res = await http.post(`/auth/signup`,
            formData);
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        };
    }
};

const refreshAccessToken = async (): Promise<JWTOutputDto> => {
    const refreshToken = localStorage.getItem("");
    const res = await http.post("/auth/refreshToken", {
        refreshToken: refreshToken
    });
    return res.data;
}

const forgotPassword = async (email: string): Promise<ForgotPasswordOutputDTO | ErrorOutputDto> => {
    try {
        const res = await http.post(`/auth/forgot-password?email=${email}`);
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message
        };
    }
}

const verifyEmail = async (OTP: string): Promise<VerifyEmailOutputDto | ErrorOutputDto> => {
    const otpVerificationToken = localStorage.getItem("otpVerificationToken");
    try {
        const res = await http.get(`/auth/verify-email?OTP=${OTP}`, {
            headers: {
                Authorization: `Bearer ${otpVerificationToken}`
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

const resetPassword = async (formData: ResetPasswordInputDto) => {
    const resetToken = localStorage.getItem("resetToken");
    try {
        const res = await http.post(`/auth/reset-password`, formData, {
            headers: {
                Authorization: `Bearer ${resetToken}`
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

export const userService = { signIn, signUp, refreshAccessToken, forgotPassword, verifyEmail, resetPassword };