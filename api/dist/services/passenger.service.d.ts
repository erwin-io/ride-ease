import { UpdatePassengerProfileDto } from "src/core/dto/passenger/passenger.update.dto";
import { Passenger } from "src/db/entities/Passenger";
import { Repository } from "typeorm";
export declare class PassengerService {
    private readonly passengerRepo;
    constructor(passengerRepo: Repository<Passenger>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Passenger[];
        total: number;
    }>;
    getByCode(passengerCode: any): Promise<Passenger>;
    updateProfile(passengerCode: any, dto: UpdatePassengerProfileDto): Promise<Passenger>;
}
