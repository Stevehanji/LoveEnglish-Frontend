export interface SignUpInputDto {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface ResetPasswordInputDto {
    password: string
    confirmPassowrd: string
}