"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const passenger_service_1 = require("./passenger.service");
describe('PassengerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [passenger_service_1.PassengerService],
        }).compile();
        service = module.get(passenger_service_1.PassengerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=passenger.service.spec.js.map