import { GatewayConnectedUsers } from "src/db/entities/GatewayConnectedUsers";
import { Repository } from "typeorm";
export declare class GatewayConnectedUsersService {
    private readonly gatewayConnectedUsersRepo;
    constructor(gatewayConnectedUsersRepo: Repository<GatewayConnectedUsers>);
    findByUserId(userId?: string): Promise<any>;
    findByUserIds(userIds: string[]): Promise<{
        userId: string;
        socketId: string;
        unRead: string;
    }[]>;
    add({ userId, socketId }: {
        userId?: string;
        socketId?: string;
    }): Promise<unknown[] | {
        user: unknown;
    }>;
    deleteByUserId(userId?: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
