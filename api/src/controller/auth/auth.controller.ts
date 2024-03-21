import { LocalAuthGuard } from "../../core/auth/local.auth.guard";
import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Headers,
  Query,
} from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { LogInDto } from "src/core/dto/auth/login.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { REGISTER_SUCCESS } from "src/common/constant/api-response.constant";
import { SignUpPassengerUserDto } from "src/core/dto/auth/sign-up.dto";
import { Users } from "src/db/entities/Users";
import { Passenger } from "src/db/entities/Passenger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signUp/passenger")
  public async signUpPassenger(@Body() createUserDto: SignUpPassengerUserDto) {
    const res: ApiResponseModel<Passenger> = {} as any;
    try {
      res.data = await this.authService.signUpPassenger(createUserDto);
      res.success = true;
      res.message = `${REGISTER_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/driver")
  public async loginDriver(@Body() loginUserDto: LogInDto) {
    const res: ApiResponseModel<Users> = {} as ApiResponseModel<Users>;
    try {
      res.data = await this.authService.getAdminByCredentials(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/admin")
  public async loginAdmin(@Body() loginUserDto: LogInDto) {
    const res: ApiResponseModel<Users> = {} as ApiResponseModel<Users>;
    try {
      res.data = await this.authService.getAdminByCredentials(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/passenger")
  public async loginTenant(@Body() loginUserDto: LogInDto) {
    const res: ApiResponseModel<Passenger> = {} as ApiResponseModel<Passenger>;
    try {
      res.data = await this.authService.getPassengerByCredentials(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
