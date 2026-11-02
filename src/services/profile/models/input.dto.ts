export interface ChangePasswordInputDto {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface UserInputDTO {
    email: string,
    username: string,
    avatar: string
}