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
exports.BookingPayment = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
let BookingPayment = class BookingPayment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BookingPaymentId" }),
    __metadata("design:type", String)
], BookingPayment.prototype, "bookingPaymentId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BookingPaymentCode", nullable: true }),
    __metadata("design:type", String)
], BookingPayment.prototype, "bookingPaymentCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PaymentMethod" }),
    __metadata("design:type", String)
], BookingPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Amount", default: () => "0" }),
    __metadata("design:type", String)
], BookingPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'ACTIVE'" }),
    __metadata("design:type", String)
], BookingPayment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking_1.Booking, (booking) => booking.bookingPayments),
    (0, typeorm_1.JoinColumn)([{ name: "BookingId", referencedColumnName: "bookingId" }]),
    __metadata("design:type", Booking_1.Booking)
], BookingPayment.prototype, "booking", void 0);
BookingPayment = __decorate([
    (0, typeorm_1.Index)("BookingPayment_pkey", ["bookingPaymentId"], { unique: true }),
    (0, typeorm_1.Entity)("BookingPayment", { schema: "dbo" })
], BookingPayment);
exports.BookingPayment = BookingPayment;
//# sourceMappingURL=BookingPayment.js.map