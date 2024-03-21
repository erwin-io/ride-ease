
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { JwtPayload } from "../core/interfaces/payload.interface";
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import * as path from "path";
import {
  compare,
  generateIndentityCode,
  getFullName,
  hash,
} from "src/common/utils/utils";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, In, Repository } from "typeorm";
import moment from "moment";
import { Users } from "src/db/entities/Users";
import { LOGIN_ERROR_PASSWORD_INCORRECT, LOGIN_ERROR_PENDING_ACCESS_REQUEST, LOGIN_ERROR_USER_NOT_FOUND } from "src/common/constant/auth-error.constant";
import { SignUpPassengerUserDto } from "src/core/dto/auth/sign-up.dto";
import { USER_TYPE } from "src/common/constant/user-type.constant";
import { NotificationsService } from "./notifications.service";
import { Passenger } from "src/db/entities/Passenger";
import { Driver } from "src/db/entities/Driver";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private readonly jwtService: JwtService,
    private notificationService: NotificationsService,
  ) {}

  async signUpPassenger(dto: SignUpPassengerUserDto) {
    try {
      return await this.userRepo.manager.transaction(
        async (entityManager) => {
          let user = new Users();
          user.userName = dto.mobileNumber;
          user.password = await hash(dto.password);
          user.accessGranted = true;
          user.userType = USER_TYPE.PASSENGER.toUpperCase();
          user = await entityManager.save(user);
          user.userCode = generateIndentityCode(user.userId);
          user = await entityManager.save(Users, user);
          
          let passenger = new Passenger();
          passenger.user = user;
          passenger.name = dto.name;
          passenger.mobileNumber = dto.mobileNumber;
          passenger = await entityManager.save(Passenger, passenger);
          passenger.passengerCode = generateIndentityCode(passenger.passengerCode);
          passenger = await entityManager.save(Passenger, passenger);
          passenger = await entityManager.findOne(Passenger, {
            where: {
              passengerCode: passenger.passengerCode,
            },
            relations: {
              user: {
                userProfilePic: true,
              },
            }
          })
          delete passenger?.user?.password;
          return passenger;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user_number")
      ) {
        throw Error("Number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_username")
      ) {
        throw Error("Username already used!");
      } else {
        throw ex;
      }
    }
  }

  async getByCredentials({userName, password }) {
    try {
      let user = await this.userRepo.findOne({
        where: {
          userName,
          active: true,
        },
        relations: {
          access: true,
          userProfilePic: {
            file: true,
          },
        }
      });
      if (!user) {
        throw Error(LOGIN_ERROR_USER_NOT_FOUND);
      }

      const passwordMatch = await compare(user.password, password);
      if (!passwordMatch) {
        throw Error(LOGIN_ERROR_PASSWORD_INCORRECT);
      }
      if (!user.accessGranted) {
        throw Error(LOGIN_ERROR_PENDING_ACCESS_REQUEST);
      }
      delete user.password;

      return user;
    } catch(ex) {
      throw ex;
    }
  }

  async getAdminByCredentials({userName, password }) {
    try {
      let user = await this.userRepo.findOne({
        where: {
          userName,
          active: true,
          userType: In([USER_TYPE.ADMIN.toUpperCase(), USER_TYPE.DRIVER.toUpperCase()])
        },
        relations: {
          access: true,
          userProfilePic: {
            file: true,
          },
        }
      });
      if (!user) {
        throw Error(LOGIN_ERROR_USER_NOT_FOUND);
      }

      const passwordMatch = await compare(user.password, password);
      if (!passwordMatch) {
        throw Error(LOGIN_ERROR_PASSWORD_INCORRECT);
      }
      if (!user.accessGranted) {
        throw Error(LOGIN_ERROR_PENDING_ACCESS_REQUEST);
      }
      delete user.password;
      const totalUnreadNotif = await this.notificationService.getUnreadByUser(user.userId)
      return {
        ...user,
        totalUnreadNotif 
      };
    } catch(ex) {
      throw ex;
    }
  }
  
  async getPassengerByCredentials({userName, password }) {
    try {
      let passenger = await this.userRepo.manager.findOne(Passenger, {
        where: {
          user: {
            userName,
            active: true,
            userType: USER_TYPE.PASSENGER.toUpperCase()
          },
          active: true,
        },
        relations: {
          user: {
            userProfilePic: {
              file: true,
            },
          },
        }
      });
      if (!passenger || !passenger.user) {
        throw Error(LOGIN_ERROR_USER_NOT_FOUND);
      }

      const passwordMatch = await compare(passenger.user.password, password);
      if (!passwordMatch) {
        throw Error(LOGIN_ERROR_PASSWORD_INCORRECT);
      }
      if (!passenger.user.accessGranted) {
        throw Error(LOGIN_ERROR_PENDING_ACCESS_REQUEST);
      }
      delete passenger.user.password;
      const totalUnreadNotif = await this.notificationService.getUnreadByUser(passenger.user.userId)
      return {
        ...passenger,
        totalUnreadNotif 
      };
    } catch(ex) {
      throw ex;
    }
  }
  
  async getDriverByCredentials({userName, password }) {
    try {
      let driver = await this.userRepo.manager.findOne(Driver, {
        where: {
          user: {
            userName,
            active: true,
            userType: USER_TYPE.PASSENGER.toUpperCase()
          },
          active: true,
        },
        relations: {
          user: {
            userProfilePic: {
              file: true,
            },
          },
        }
      });
      if (!driver && driver.user) {
        throw Error(LOGIN_ERROR_USER_NOT_FOUND);
      }

      const passwordMatch = await compare(driver.user.password, password);
      if (!passwordMatch) {
        throw Error(LOGIN_ERROR_PASSWORD_INCORRECT);
      }
      if (!driver.user.accessGranted) {
        throw Error(LOGIN_ERROR_PENDING_ACCESS_REQUEST);
      }
      delete driver.user.password;
      const totalUnreadNotif = await this.notificationService.getUnreadByUser(driver.user.userId)
      return {
        ...driver,
        totalUnreadNotif 
      };
    } catch(ex) {
      throw ex;
    }
  }
}
