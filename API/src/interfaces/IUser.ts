import UserRoles from "@/types/enums/userRoles"
import UserStatus from "@/types/enums/userStatus"

export interface IUser {
    name: string,
    username: string,
    email: string,
    password: string,
    salt: string,
    role: UserRoles,
    phone_number: string,
    first_time_login: boolean,
    status: UserStatus,
    createdAt: Date,
    updatedAt: Date
}

export interface IUserInputDTO {
    name: string,
    username: string,
    email: string,
    password: string,
    role: UserRoles
}