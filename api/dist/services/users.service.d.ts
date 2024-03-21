import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { UpdateProfilePictureDto } from "src/core/dto/user/user-base.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";
export declare class UsersService {
    private firebaseProvoder;
    private readonly userRepo;
    constructor(firebaseProvoder: FirebaseProvider, userRepo: Repository<Users>);
    getUserById(userId: any): Promise<Users>;
    updateProfilePicture(userCode: any, dto: UpdateProfilePictureDto): Promise<Users>;
    resetPassword(userCode: any, dto: UpdateUserResetPasswordDto): Promise<Users>;
    deleteUser(userCode: any): Promise<Users>;
    approveAccessRequest(userCode: any): Promise<Users>;
}
