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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Vehicle_1 = require("./Vehicle");
const BookingConversation_1 = require("./BookingConversation");
const BookingPayment_1 = require("./BookingPayment");
let Booking = class Booking {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BookingId" }),
    __metadata("design:type", String)
], Booking.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BookingCode", nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "bookingCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DestinationAddress" }),
    __metadata("design:type", String)
], Booking.prototype, "destinationAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: "DestinationMap" }),
    __metadata("design:type", Object)
], Booking.prototype, "destinationMap", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PickupAddress" }),
    __metadata("design:type", String)
], Booking.prototype, "pickupAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: "PickupMap" }),
    __metadata("design:type", Object)
], Booking.prototype, "pickupMap", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateTimeBooked" }),
    __metadata("design:type", Date)
], Booking.prototype, "dateTimeBooked", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateTimePickUp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Booking.prototype, "dateTimePickUp", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateTimeArrived" }),
    __metadata("design:type", Date)
], Booking.prototype, "dateTimeArrived", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "BookingAmount", default: () => "0" }),
    __metadata("design:type", String)
], Booking.prototype, "bookingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "OtherCharges" }),
    __metadata("design:type", String)
], Booking.prototype, "otherCharges", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "TotalBookingAmount", default: () => "0" }),
    __metadata("design:type", String)
], Booking.prototype, "totalBookingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'PENDING'" }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.bookings),
    (0, typeorm_1.JoinColumn)([{ name: "PassengerUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Booking.prototype, "passengerUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vehicle_1.Vehicle, (vehicle) => vehicle.bookings),
    (0, typeorm_1.JoinColumn)([{ name: "VehicleId", referencedColumnName: "vehicleId" }]),
    __metadata("design:type", Vehicle_1.Vehicle)
], Booking.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingConversation_1.BookingConversation, (bookingConversation) => bookingConversation.booking),
    __metadata("design:type", Array)
], Booking.prototype, "bookingConversations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingPayment_1.BookingPayment, (bookingPayment) => bookingPayment.booking),
    __metadata("design:type", Array)
], Booking.prototype, "bookingPayments", void 0);
Booking = __decorate([
    (0, typeorm_1.Index)("Booking_pkey", ["bookingId"], { unique: true }),
    (0, typeorm_1.Entity)("Booking", { schema: "dbo" })
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=Booking.js.map