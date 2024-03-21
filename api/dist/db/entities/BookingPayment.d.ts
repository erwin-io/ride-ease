import { Booking } from "./Booking";
export declare class BookingPayment {
    bookingPaymentId: string;
    bookingPaymentCode: string | null;
    paymentMethod: string;
    amount: string;
    status: string;
    booking: Booking;
}
