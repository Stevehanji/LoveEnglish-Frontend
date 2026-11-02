export interface JWTOutputDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface ForgotPasswordOutputDTO {
    otpVerificationToken: string
    OTP: string
}

export interface VerifyEmailOutputDto {
    resetToken: string
}