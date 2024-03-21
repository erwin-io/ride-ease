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
exports.TypeOrmConfigService = void 0;
const Users_1 = require("../entities/Users");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const Access_1 = require("../entities/Access");
const Notifications_1 = require("../entities/Notifications");
const UserProfilePic_1 = require("../entities/UserProfilePic");
const Files_1 = require("../entities/Files");
const UserOneSignalSubscription_1 = require("../entities/UserOneSignalSubscription");
const Passenger_1 = require("../entities/Passenger");
const Booking_1 = require("../entities/Booking");
const BookingPayment_1 = require("../entities/BookingPayment");
const BookingConversation_1 = require("../entities/BookingConversation");
const Driver_1 = require("../entities/Driver");
const Vehicle_1 = require("../entities/Vehicle");
let TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        const ssl = this.config.get("SSL");
        const config = {
            type: "postgres",
            host: this.config.get("DATABASE_HOST"),
            port: Number(this.config.get("DATABASE_PORT")),
            database: this.config.get("DATABASE_NAME"),
            username: this.config.get("DATABASE_USER"),
            password: this.config.get("DATABASE_PASSWORD"),
            entities: [
                Users_1.Users,
                UserProfilePic_1.UserProfilePic,
                Files_1.Files,
                Access_1.Access,
                Notifications_1.Notifications,
                Passenger_1.Passenger,
                UserOneSignalSubscription_1.UserOneSignalSubscription,
                Booking_1.Booking,
                BookingPayment_1.BookingPayment,
                BookingConversation_1.BookingConversation,
                Driver_1.Driver,
                Vehicle_1.Vehicle,
                Passenger_1.Passenger,
            ],
            synchronize: false,
            ssl: ssl.toLocaleLowerCase().includes("true"),
            extra: {},
        };
        if (config.ssl) {
            config.extra.ssl = {
                require: true,
                rejectUnauthorized: false,
            };
        }
        return config;
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TypeOrmConfigService.prototype, "config", void 0);
TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=typeorm.service.js.map