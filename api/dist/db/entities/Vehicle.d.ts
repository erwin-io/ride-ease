import { Booking } from "./Booking";
import { Driver } from "./Driver";
export declare class Vehicle {
    vehicleId: string;
    vehicleCode: string | null;
    modelName: string;
    makeName: string;
    bodyType: string;
    category: string;
    type: string;
    licensePlate: string;
    color: string;
    status: string;
    active: boolean;
    bookings: Booking[];
    drivers: Driver[];
}
