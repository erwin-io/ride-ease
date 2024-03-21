import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PASSENGER_ERROR_NOT_FOUND } from "src/common/constant/passenger.constant";
import { columnDefToTypeORMCondition } from "src/common/utils/utils";
import { UpdatePassengerProfileDto } from "src/core/dto/passenger/passenger.update.dto";
import { Passenger } from "src/db/entities/Passenger";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepo: Repository<Passenger>
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.passengerRepo.find({
        where: {
          ...condition,
        },
        relations: {
          user: {
            userProfilePic: true,
          },
        },
        skip,
        take,
        order,
      }),
      this.passengerRepo.count({
        where: {
          ...condition,
        },
      }),
    ]);
    return {
      results: results.map((x) => {
        delete x.user.password;
        return x;
      }),
      total,
    };
  }

  async getByCode(passengerCode) {
    const res = await this.passengerRepo.findOne({
      where: {
        passengerCode: passengerCode,
      },
      relations: {
        user: {
          userProfilePic: true,
        },
      },
    });

    if (!res) {
      throw Error(PASSENGER_ERROR_NOT_FOUND);
    }
    delete res?.user?.password;
    return res;
  }

  async updateProfile(passengerCode, dto: UpdatePassengerProfileDto) {
    try {
      return await this.passengerRepo.manager.transaction(
        async (entityManager) => {
          let passenger = await entityManager.findOne(Passenger, {
            where: {
              passengerCode,
            },
            relations: {
              user: {
                userProfilePic: true,
              },
            },
          });

          if (!passenger) {
            throw Error(PASSENGER_ERROR_NOT_FOUND);
          }

          passenger.name = dto.name;
          passenger.mobileNumber = dto.mobileNumber;
          passenger = await entityManager.save(Passenger, passenger);
          let user = await entityManager.findOne(Users, {
            where: {
              userCode: passenger.user?.userCode,
            },
          });
          user.userName = dto.mobileNumber;
          user = await entityManager.save(Users, user);
          passenger = await entityManager.findOne(Passenger, {
            where: {
              passengerCode,
            },
            relations: {
              user: true,
            },
          });
          return passenger;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }
}
