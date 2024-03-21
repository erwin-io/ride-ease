import { AuthService } from "../../services/auth.service";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { LogInDto } from "src/core/dto/auth/login.dto";
import { SignUpPassengerUserDto } from "src/core/dto/auth/sign-up.dto";
import { Users } from "src/db/entities/Users";
import { Passenger } from "src/db/entities/Passenger";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUpPassenger(createUserDto: SignUpPassengerUserDto): Promise<ApiResponseModel<Passenger>>;
    loginDriver(loginUserDto: LogInDto): Promise<ApiResponseModel<Users>>;
    loginAdmin(loginUserDto: LogInDto): Promise<ApiResponseModel<Users>>;
    loginTenant(loginUserDto: LogInDto): Promise<ApiResponseModel<Passenger>>;
}
