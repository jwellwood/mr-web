import type { IImage } from './image';

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    roles: string[];
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
