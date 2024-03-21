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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Vehicle_1 = require("./Vehicle");
let Driver = class Driver {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "DriverId" }),
    __metadata("design:type", String)
], Driver.prototype, "driverId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DriverCode", nullable: true }),
    __metadata("design:type", String)
], Driver.prototype, "driverCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Driver.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Driver.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address" }),
    __metadata("design:type", String)
], Driver.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CompanyId" }),
    __metadata("design:type", String)
], Driver.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LicenseNumber" }),
    __metadata("design:type", String)
], Driver.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "UserId" }),
    __metadata("design:type", String)
], Driver.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Driver.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "WalletBalance", default: () => "0" }),
    __metadata("design:type", String)
], Driver.prototype, "walletBalance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.drivers),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Driver.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Vehicle_1.Vehicle, (vehicle) => vehicle.drivers),
    (0, typeorm_1.JoinTable)({
        name: "DriverVehicle",
        joinColumns: [{ name: "DriverId", referencedColumnName: "driverId" }],
        inverseJoinColumns: [
            { name: "VehicleId", referencedColumnName: "vehicleId" },
        ],
        schema: "dbo",
    }),
    __metadata("design:type", Array)
], Driver.prototype, "vehicles", void 0);
Driver = __decorate([
    (0, typeorm_1.Index)("u_Driver", ["active", "driverId"], { unique: true }),
    (0, typeorm_1.Index)("u_Driver_UserId", ["active", "driverId", "userId"], { unique: true }),
    (0, typeorm_1.Index)("Driver_pkey", ["driverId", "userId"], { unique: true }),
    (0, typeorm_1.Index)("u_driver_user", ["driverId", "userId"], {}),
    (0, typeorm_1.Entity)("Driver", { schema: "dbo" })
], Driver);
exports.Driver = Driver;
//# sourceMappingURL=Driver.js.map