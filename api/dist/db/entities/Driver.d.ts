import { Users } from "./Users";
import { Vehicle } from "./Vehicle";
export declare class Driver {
    driverId: string;
    driverCode: string | null;
    name: string;
    mobileNumber: string;
    address: string;
    companyId: string;
    licenseNumber: string;
    userId: string;
    active: boolean;
    walletBalance: string;
    user: Users;
    vehicles: Vehicle[];
}
