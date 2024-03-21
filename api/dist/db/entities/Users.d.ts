import { Booking } from "./Booking";
import { BookingConversation } from "./BookingConversation";
import { Driver } from "./Driver";
import { Notifications } from "./Notifications";
import { Passenger } from "./Passenger";
import { UserOneSignalSubscription } from "./UserOneSignalSubscription";
import { UserProfilePic } from "./UserProfilePic";
import { Access } from "./Access";
export declare class Users {
    userId: string;
    userName: string;
    password: string;
    accessGranted: boolean;
    active: boolean;
    userCode: string | null;
    userType: string;
    bookings: Booking[];
    bookingConversations: BookingConversation[];
    bookingConversations2: BookingConversation[];
    drivers: Driver[];
    notifications: Notifications[];
    passengers: Passenger[];
    userOneSignalSubscriptions: UserOneSignalSubscription[];
    userProfilePic: UserProfilePic;
    access: Access;
}
