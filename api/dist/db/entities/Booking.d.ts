import { Users } from "./Users";
import { Vehicle } from "./Vehicle";
import { BookingConversation } from "./BookingConversation";
import { BookingPayment } from "./BookingPayment";
export declare class Booking {
    bookingId: string;
    bookingCode: string | null;
    destinationAddress: string;
    destinationMap: object;
    pickupAddress: string;
    pickupMap: object;
    dateTimeBooked: Date;
    dateTimePickUp: Date | null;
    dateTimeArrived: Date;
    bookingAmount: string;
    otherCharges: string;
    totalBookingAmount: string;
    status: string;
    passengerUser: Users;
    vehicle: Vehicle;
    bookingConversations: BookingConversation[];
    bookingPayments: BookingPayment[];
}
