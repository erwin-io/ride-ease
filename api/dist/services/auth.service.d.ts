import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Users } from "src/db/entities/Users";
import { SignUpPassengerUserDto } from "src/core/dto/auth/sign-up.dto";
import { NotificationsService } from "./notifications.service";
import { Passenger } from "src/db/entities/Passenger";
import { Driver } from "src/db/entities/Driver";
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    private notificationService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService, notificationService: NotificationsService);
    signUpPassenger(dto: SignUpPassengerUserDto): Promise<Passenger>;
    getByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<Users>;
    getAdminByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<{
        totalUnreadNotif: number;
        userId: string;
        userName: string;
        password: string;
        accessGranted: boolean;
        active: boolean;
        userCode: string;
        userType: string;
        bookings: import("../db/entities/Booking").Booking[];
        bookingConversations: import("../db/entities/BookingConversation").BookingConversation[];
        bookingConversations2: import("../db/entities/BookingConversation").BookingConversation[];
        drivers: Driver[];
        notifications: import("../db/entities/Notifications").Notifications[];
        passengers: Passenger[];
        userOneSignalSubscriptions: import("../db/entities/UserOneSignalSubscription").UserOneSignalSubscription[];
        userProfilePic: import("../db/entities/UserProfilePic").UserProfilePic;
        access: import("../db/entities/Access").Access;
    }>;
    getPassengerByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<{
        totalUnreadNotif: number;
        passengerId: string;
        passengerCode: string;
        name: string;
        mobileNumber: string;
        userId: string;
        active: boolean;
        user: Users;
    }>;
    getDriverByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<{
        totalUnreadNotif: number;
        driverId: string;
        driverCode: string;
        name: string;
        mobileNumber: string;
        address: string;
        companyId: string;
        licenseNumber: string;
        userId: string;
        active: boolean;
        walletBalance: string;
        user: Users;
        vehicles: import("../db/entities/Vehicle").Vehicle[];
    }>;
}
