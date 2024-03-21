"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../common/utils/utils");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Users_1 = require("../db/entities/Users");
const auth_error_constant_1 = require("../common/constant/auth-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const notifications_service_1 = require("./notifications.service");
const Passenger_1 = require("../db/entities/Passenger");
const Driver_1 = require("../db/entities/Driver");
let AuthService = class AuthService {
    constructor(userRepo, jwtService, notificationService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }
    async signUpPassenger(dto) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
                var _a;
                let user = new Users_1.Users();
                user.userName = dto.mobileNumber;
                user.password = await (0, utils_1.hash)(dto.password);
                user.accessGranted = true;
                user.userType = user_type_constant_1.USER_TYPE.PASSENGER.toUpperCase();
                user = await entityManager.save(user);
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
                user = await entityManager.save(Users_1.Users, user);
                let passenger = new Passenger_1.Passenger();
                passenger.user = user;
                passenger.name = dto.name;
                passenger.mobileNumber = dto.mobileNumber;
                passenger = await entityManager.save(Passenger_1.Passenger, passenger);
                passenger.passengerCode = (0, utils_1.generateIndentityCode)(passenger.passengerCode);
                passenger = await entityManager.save(Passenger_1.Passenger, passenger);
                passenger = await entityManager.findOne(Passenger_1.Passenger, {
                    where: {
                        passengerCode: passenger.passengerCode,
                    },
                    relations: {
                        user: {
                            userProfilePic: true,
                        },
                    }
                });
                (_a = passenger === null || passenger === void 0 ? void 0 : passenger.user) === null || _a === void 0 ? true : delete _a.password;
                return passenger;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user_number")) {
                throw Error("Number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_username")) {
                throw Error("Username already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async getByCredentials({ userName, password }) {
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
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete user.password;
            return user;
        }
        catch (ex) {
            throw ex;
        }
    }
    async getAdminByCredentials({ userName, password }) {
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userName,
                    active: true,
                    userType: (0, typeorm_2.In)([user_type_constant_1.USER_TYPE.ADMIN.toUpperCase(), user_type_constant_1.USER_TYPE.DRIVER.toUpperCase()])
                },
                relations: {
                    access: true,
                    userProfilePic: {
                        file: true,
                    },
                }
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete user.password;
            const totalUnreadNotif = await this.notificationService.getUnreadByUser(user.userId);
            return Object.assign(Object.assign({}, user), { totalUnreadNotif });
        }
        catch (ex) {
            throw ex;
        }
    }
    async getPassengerByCredentials({ userName, password }) {
        try {
            let passenger = await this.userRepo.manager.findOne(Passenger_1.Passenger, {
                where: {
                    user: {
                        userName,
                        active: true,
                        userType: user_type_constant_1.USER_TYPE.PASSENGER.toUpperCase()
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
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(passenger.user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!passenger.user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete passenger.user.password;
            const totalUnreadNotif = await this.notificationService.getUnreadByUser(passenger.user.userId);
            return Object.assign(Object.assign({}, passenger), { totalUnreadNotif });
        }
        catch (ex) {
            throw ex;
        }
    }
    async getDriverByCredentials({ userName, password }) {
        try {
            let driver = await this.userRepo.manager.findOne(Driver_1.Driver, {
                where: {
                    user: {
                        userName,
                        active: true,
                        userType: user_type_constant_1.USER_TYPE.PASSENGER.toUpperCase()
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
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(driver.user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!driver.user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete driver.user.password;
            const totalUnreadNotif = await this.notificationService.getUnreadByUser(driver.user.userId);
            return Object.assign(Object.assign({}, driver), { totalUnreadNotif });
        }
        catch (ex) {
            throw ex;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        notifications_service_1.NotificationsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map