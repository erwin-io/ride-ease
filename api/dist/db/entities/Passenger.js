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
exports.Passenger = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Passenger = class Passenger {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "PassengerId" }),
    __metadata("design:type", String)
], Passenger.prototype, "passengerId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PassengerCode", nullable: true }),
    __metadata("design:type", String)
], Passenger.prototype, "passengerCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Passenger.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Passenger.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "UserId" }),
    __metadata("design:type", String)
], Passenger.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.passengers),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Passenger.prototype, "user", void 0);
Passenger = __decorate([
    (0, typeorm_1.Index)("u_passenger_user", ["passengerId", "userId"], { unique: true }),
    (0, typeorm_1.Index)("Passenger_pkey", ["passengerId", "userId"], { unique: true }),
    (0, typeorm_1.Entity)("Passenger", { schema: "dbo" })
], Passenger);
exports.Passenger = Passenger;
//# sourceMappingURL=Passenger.js.map