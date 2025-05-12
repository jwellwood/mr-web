import type { IImage } from './image';
import {TAuthRoles} from "../app/constants.ts";

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    roles: TAuthRoles[];
    description?: string;
    dateOfBirth?: string;
    nationality?: string;
    image: IImage;
    isVerified: boolean;
    teamIds: string[];
    orgIds: string[];
    createdAt: string;
    updatedAt: string;
}
