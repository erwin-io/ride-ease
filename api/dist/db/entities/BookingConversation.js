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
exports.BookingConversation = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const Users_1 = require("./Users");
let BookingConversation = class BookingConversation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BookingConversationId" }),
    __metadata("design:type", String)
], BookingConversation.prototype, "bookingConversationId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Message" }),
    __metadata("design:type", String)
], BookingConversation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateTime" }),
    __metadata("design:type", Date)
], BookingConversation.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'ACTIVE'" }),
    __metadata("design:type", String)
], BookingConversation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], BookingConversation.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking_1.Booking, (booking) => booking.bookingConversations),
    (0, typeorm_1.JoinColumn)([{ name: "BookingId", referencedColumnName: "bookingId" }]),
    __metadata("design:type", Booking_1.Booking)
], BookingConversation.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.bookingConversations),
    (0, typeorm_1.JoinColumn)([{ name: "FromUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], BookingConversation.prototype, "fromUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.bookingConversations2),
    (0, typeorm_1.JoinColumn)([{ name: "ToUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], BookingConversation.prototype, "toUser", void 0);
BookingConversation = __decorate([
    (0, typeorm_1.Index)("BookingConversation_pkey", ["bookingConversationId"], { unique: true }),
    (0, typeorm_1.Entity)("BookingConversation", { schema: "dbo" })
], BookingConversation);
exports.BookingConversation = BookingConversation;
//# sourceMappingURL=BookingConversation.js.map