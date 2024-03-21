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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const BookingConversation_1 = require("./BookingConversation");
const Driver_1 = require("./Driver");
const Notifications_1 = require("./Notifications");
const Passenger_1 = require("./Passenger");
const UserOneSignalSubscription_1 = require("./UserOneSignalSubscription");
const UserProfilePic_1 = require("./UserProfilePic");
const Access_1 = require("./Access");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserId" }),
    __metadata("design:type", String)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserName" }),
    __metadata("design:type", String)
], Users.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Password" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "AccessGranted" }),
    __metadata("design:type", Boolean)
], Users.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Users.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserCode", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "userCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserType" }),
    __metadata("design:type", String)
], Users.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.passengerUser),
    __metadata("design:type", Array)
], Users.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingConversation_1.BookingConversation, (bookingConversation) => bookingConversation.fromUser),
    __metadata("design:type", Array)
], Users.prototype, "bookingConversations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingConversation_1.BookingConversation, (bookingConversation) => bookingConversation.toUser),
    __metadata("design:type", Array)
], Users.prototype, "bookingConversations2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Driver_1.Driver, (driver) => driver.user),
    __metadata("design:type", Array)
], Users.prototype, "drivers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notifications_1.Notifications, (notifications) => notifications.user),
    __metadata("design:type", Array)
], Users.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Passenger_1.Passenger, (passenger) => passenger.user),
    __metadata("design:type", Array)
], Users.prototype, "passengers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserOneSignalSubscription_1.UserOneSignalSubscription, (userOneSignalSubscription) => userOneSignalSubscription.user),
    __metadata("design:type", Array)
], Users.prototype, "userOneSignalSubscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserProfilePic_1.UserProfilePic, (userProfilePic) => userProfilePic.user),
    __metadata("design:type", UserProfilePic_1.UserProfilePic)
], Users.prototype, "userProfilePic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Access_1.Access, (access) => access.users),
    (0, typeorm_1.JoinColumn)([{ name: "AccessId", referencedColumnName: "accessId" }]),
    __metadata("design:type", Access_1.Access)
], Users.prototype, "access", void 0);
Users = __decorate([
    (0, typeorm_1.Index)("u_user_number", ["active", "password"], { unique: true }),
    (0, typeorm_1.Index)("u_username", ["active", "userName"], { unique: true }),
    (0, typeorm_1.Index)("pk_users_1557580587", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("Users", { schema: "dbo" })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map