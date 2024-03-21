import { Users } from "../entities/Users";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, Inject } from "@nestjs/common";
import { Access } from "../entities/Access";
import { Notifications } from "../entities/Notifications";
import { UserProfilePic } from "../entities/UserProfilePic";
import { Files } from "../entities/Files";
import { UserOneSignalSubscription } from "../entities/UserOneSignalSubscription";
import { Passenger } from "../entities/Passenger";
import { Booking } from "../entities/Booking";
import { BookingPayment } from "../entities/BookingPayment";
import { BookingConversation } from "../entities/BookingConversation";
import { Driver } from "../entities/Driver";
import { Vehicle } from "../entities/Vehicle";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const ssl = this.config.get<string>("SSL");
    const config: TypeOrmModuleOptions = {
      type: "postgres",
      host: this.config.get<string>("DATABASE_HOST"),
      port: Number(this.config.get<number>("DATABASE_PORT")),
      database: this.config.get<string>("DATABASE_NAME"),
      username: this.config.get<string>("DATABASE_USER"),
      password: this.config.get<string>("DATABASE_PASSWORD"),
      entities: [
        Users,
        UserProfilePic,
        Files,
        Access,
        Notifications,
        Passenger,
        UserOneSignalSubscription,
        Booking,
        BookingPayment,
        BookingConversation,
        Driver,
        Vehicle,
        Passenger,
      ],
      synchronize: false, // never use TRUE in production!
      ssl: ssl.toLocaleLowerCase().includes("true"),
      extra: {},
    };
    if (config.ssl) {
      config.extra.ssl = {
        require: true,
        rejectUnauthorized: false,
      };
    }
    return config;
  }
}
