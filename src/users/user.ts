import { CreateUserParams } from "src/utils/types";

export interface IUserService {
    createUser(userParams: CreateUserParams);
}