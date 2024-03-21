import { Booking } from "./Booking";
import { Users } from "./Users";
export declare class BookingConversation {
    bookingConversationId: string;
    message: string;
    dateTime: Date;
    status: string;
    active: boolean;
    booking: Booking;
    fromUser: Users;
    toUser: Users;
}
