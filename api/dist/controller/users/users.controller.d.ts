import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { UpdateProfilePictureDto } from "src/core/dto/user/user-base.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Users } from "src/db/entities/Users";
import { UsersService } from "src/services/users.service";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    resetPassword(userCode: string, updateUserResetPasswordDto: UpdateUserResetPasswordDto): Promise<ApiResponseModel<Users>>;
    deleteUser(userCode: string): Promise<ApiResponseModel<Users>>;
    approveAccessRequest(userCode: string): Promise<ApiResponseModel<Users>>;
    updateProfilePicture(userCode: string, dto: UpdateProfilePictureDto): Promise<ApiResponseModel<Users>>;
}
