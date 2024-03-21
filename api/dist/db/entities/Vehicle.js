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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const Driver_1 = require("./Driver");
let Vehicle = class Vehicle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "VehicleId" }),
    __metadata("design:type", String)
], Vehicle.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "VehicleCode", nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "vehicleCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ModelName" }),
    __metadata("design:type", String)
], Vehicle.prototype, "modelName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MakeName" }),
    __metadata("design:type", String)
], Vehicle.prototype, "makeName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BodyType" }),
    __metadata("design:type", String)
], Vehicle.prototype, "bodyType", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Category" }),
    __metadata("design:type", String)
], Vehicle.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("character", { name: "Type", length: 1 }),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LicensePlate" }),
    __metadata("design:type", String)
], Vehicle.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Color" }),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "Status",
        default: () => "'UNAVAILABLE'",
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Driver_1.Driver, (driver) => driver.vehicles),
    __metadata("design:type", Array)
], Vehicle.prototype, "drivers", void 0);
Vehicle = __decorate([
    (0, typeorm_1.Index)("Vehicle_pkey", ["vehicleId"], { unique: true }),
    (0, typeorm_1.Entity)("Vehicle", { schema: "dbo" })
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=Vehicle.js.map