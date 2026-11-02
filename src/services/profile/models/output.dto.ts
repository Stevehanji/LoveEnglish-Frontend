enum level {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
    D1 = "D1",
    D2 = "D2"
}

enum role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface UserOutputDTO {
    id: string,
    username: string,
    level: level,
    email: string,
    avatar: string,
    role: role,
    bio: string
}