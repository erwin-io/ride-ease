import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { Driver } from "./Driver";

@Index("Vehicle_pkey", ["vehicleId"], { unique: true })
@Entity("Vehicle", { schema: "dbo" })
export class Vehicle {
  @PrimaryGeneratedColumn({ type: "bigint", name: "VehicleId" })
  vehicleId: string;

  @Column("character varying", { name: "VehicleCode", nullable: true })
  vehicleCode: string | null;

  @Column("character varying", { name: "ModelName" })
  modelName: string;

  @Column("character varying", { name: "MakeName" })
  makeName: string;

  @Column("character varying", { name: "BodyType" })
  bodyType: string;

  @Column("character varying", { name: "Category" })
  category: string;

  @Column("character", { name: "Type", length: 1 })
  type: string;

  @Column("character varying", { name: "LicensePlate" })
  licensePlate: string;

  @Column("character varying", { name: "Color" })
  color: string;

  @Column("character varying", {
    name: "Status",
    default: () => "'UNAVAILABLE'",
  })
  status: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings: Booking[];

  @ManyToMany(() => Driver, (driver) => driver.vehicles)
  drivers: Driver[];
}
