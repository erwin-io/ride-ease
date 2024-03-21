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
exports.PassengerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passenger_constant_1 = require("../common/constant/passenger.constant");
const utils_1 = require("../common/utils/utils");
const Passenger_1 = require("../db/entities/Passenger");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let PassengerService = class PassengerService {
    constructor(passengerRepo) {
        this.passengerRepo = passengerRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.passengerRepo.find({
                where: Object.assign({}, condition),
                relations: {
                    user: {
                        userProfilePic: true,
                    },
                },
                skip,
                take,
                order,
            }),
            this.passengerRepo.count({
                where: Object.assign({}, condition),
            }),
        ]);
        return {
            results: results.map((x) => {
                delete x.user.password;
                return x;
            }),
            total,
        };
    }
    async getByCode(passengerCode) {
        var _a;
        const res = await this.passengerRepo.findOne({
            where: {
                passengerCode: passengerCode,
            },
            relations: {
                user: {
                    userProfilePic: true,
                },
            },
        });
        if (!res) {
            throw Error(passenger_constant_1.PASSENGER_ERROR_NOT_FOUND);
        }
        (_a = res === null || res === void 0 ? void 0 : res.user) === null || _a === void 0 ? true : delete _a.password;
        return res;
    }
    async updateProfile(passengerCode, dto) {
        try {
            return await this.passengerRepo.manager.transaction(async (entityManager) => {
                var _a;
                let passenger = await entityManager.findOne(Passenger_1.Passenger, {
                    where: {
                        passengerCode,
                    },
                    relations: {
                        user: {
                            userProfilePic: true,
                        },
                    },
                });
                if (!passenger) {
                    throw Error(passenger_constant_1.PASSENGER_ERROR_NOT_FOUND);
                }
                passenger.name = dto.name;
                passenger.mobileNumber = dto.mobileNumber;
                passenger = await entityManager.save(Passenger_1.Passenger, passenger);
                let user = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userCode: (_a = passenger.user) === null || _a === void 0 ? void 0 : _a.userCode,
                    },
                });
                user.userName = dto.mobileNumber;
                user = await entityManager.save(Users_1.Users, user);
                passenger = await entityManager.findOne(Passenger_1.Passenger, {
                    where: {
                        passengerCode,
                    },
                    relations: {
                        user: true,
                    },
                });
                return passenger;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user")) {
                throw Error("Username already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_number")) {
                throw Error("Mobile number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_card")) {
                throw Error("Card number already used!");
            }
            else {
                throw ex;
            }
        }
    }
};
PassengerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Passenger_1.Passenger)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PassengerService);
exports.PassengerService = PassengerService;
//# sourceMappingURL=passenger.service.js.map